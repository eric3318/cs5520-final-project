import { Image, StyleSheet, View, Text, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import {
  COLLECTIONS,
  deleteFromDB,
  readFromStorage,
  updateDB,
} from '../firebase/firestoreHelper';
import { format } from 'date-fns';
import { Avatar, IconButton } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useAuth } from '../hook/useAuth';
import { useNavigation } from '@react-navigation/native';

function MiniPost({ item, option }) {
  const { currentUser } = useAuth();
  const [postImageURL, setPostImageURL] = useState('');
  const [userImageURL, setUserImageURL] = useState('');
  const [liked, setLiked] = useState(item.likedBy.includes(currentUser.uid));
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      let tasks = [];
      tasks.push(readFromStorage(item.user.imageUri));
      tasks.push(readFromStorage(item.imageUri));
      let [url1, url2] = await Promise.all(tasks);
      setUserImageURL(url1);
      setPostImageURL(url2);
    })();
  }, []);

  const likeButtonClickHandler = async () => {
    if (item.likedBy.includes(currentUser.uid)) {
      let newLikedArr = item.likedBy.filter((uid) => uid !== currentUser.uid);
      await updateDB({ likedBy: newLikedArr }, COLLECTIONS.POST, item.id);
      setLiked(false);
      return;
    }
    await updateDB(
      { likedBy: [...item.likedBy, currentUser.uid] },
      COLLECTIONS.POST,
      item.id
    );
    setLiked(true);
  };

  const editButtonClickHandler = () => {
    navigation.navigate('New Post', { post: item });
  };

  const deleteButtonClickHandler = () => {
    Alert.alert('Delete Post', 'Would you like to delete the post?', [
      {
        text: 'Cancel',
      },
      {
        text: 'Confirm',
        onPress: async () => {
          await deleteFromDB(COLLECTIONS.POST, item.id);
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text>{format(new Date(item.timestamp), 'MM/d')}</Text>
      {postImageURL && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: postImageURL }} style={styles.image} />
        </View>
      )}

      {option === 'My Posts' && (
        <View style={styles.iconContainer}>
          <IconButton
            icon={() => (
              <MaterialCommunityIcons
                name="pencil-outline"
                size={18}
                color="black"
              />
            )}
            onPress={editButtonClickHandler}
            size={10}
          />
          <IconButton
            icon={() => (
              <MaterialCommunityIcons
                name="delete-outline"
                size={18}
                color="black"
              />
            )}
            onPress={deleteButtonClickHandler}
            size={10}
          />
        </View>
      )}

      {option === 'Liked Posts' && (
        <View style={styles.infoContainer}>
          <View style={styles.userSection}>
            {userImageURL && (
              <Avatar.Image source={{ uri: userImageURL }} size={15} />
            )}
            <Text>{item.user.username}</Text>
          </View>
          <IconButton
            icon={() =>
              liked ? (
                <MaterialCommunityIcons
                  name="cards-heart"
                  size={18}
                  color="red"
                />
              ) : (
                <MaterialCommunityIcons
                  name="cards-heart-outline"
                  size={18}
                  color="black"
                />
              )
            }
            onPress={likeButtonClickHandler}
            size={10}
          />
        </View>
      )}
    </View>
  );
}

export default MiniPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: '50%',
    rowGap: 3,
    padding: 3,
  },
  imageContainer: {
    height: 150,
  },
  image: {
    flex: 1,
    objectFit: 'cover',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 3,
  },
  text: { fontWeight: 'bold' },
});
