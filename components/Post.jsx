import { Image, StyleSheet, Text, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Button, Card } from 'react-native-paper';
import { auth } from '../firebase/firebaseSetup';
import {
  COLLECTIONS,
  readFromStorage,
  writeToDB,
} from '../firebase/firestoreHelper';
import { useEffect, useState } from 'react';
import { Avatar } from 'react-native-paper';

export default function Post({ item }) {
  const { currentUser } = auth;
  const [postImageURL, setPostImageURL] = useState('');
  const [userImageURL, setUserImageURL] = useState('');
  const [liked, setLiked] = useState(item.likedBy.includes(currentUser.uid));

  const likeClickHandler = async () => {
    if (item.likedBy.includes(currentUser.uid)) {
      let newLikedArr = item.likedBy.filter((uid) => uid !== currentUser.uid);
      await writeToDB(
        { ...item, likedBy: newLikedArr },
        COLLECTIONS.POST,
        item.id
      );
      setLiked(false);
      return;
    }
    await writeToDB(
      { ...item, likedBy: [...item.likedBy, currentUser.uid] },
      COLLECTIONS.POST,
      item.id
    );
    setLiked(true);
  };

  useEffect(() => {
    (async () => {
      if (item.imageUri) {
        let url = await readFromStorage(item.imageUri);
        setPostImageURL(url);
      }
      if (item.user.imageUri) {
        let url = await readFromStorage(item.user.imageUri);
        setUserImageURL(url);
      }
    })();
  }, []);

  return (
    <Card>
      <Card.Content style={styles.cardContent}>
        <View style={styles.upperSection}>
          <View style={styles.userInfo}>
            {userImageURL && (
              <Avatar.Image size={36} source={{ uri: userImageURL }} />
            )}
            <View>
              <Text style={styles.timeText}>{item.timestamp}</Text>
              <Text style={styles.usernameText}>{item.user.username}</Text>
            </View>
          </View>
          <View style={styles.like}>
            <Button onPress={likeClickHandler}>
              {liked ? (
                <FontAwesome name="heart" size={18} color="red" />
              ) : (
                <FontAwesome name="heart-o" size={18} color="black" />
              )}
            </Button>
            <Text>{item.likedBy.length}</Text>
          </View>
        </View>
        {postImageURL && (
          <View style={styles.contentSection}>
            {postImageURL && (
              <Image
                source={{ uri: postImageURL }}
                style={{ width: '100%', height: 200 }}
              />
            )}

            <Text>{item.text}</Text>
          </View>
        )}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  cardContent: {
    rowGap: 10,
  },
  upperSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 6,
  },
  usernameText: { fontWeight: 'bold' },
  timeText: { fontSize: 12 },
  like: {
    alignItems: 'center',
  },
  contentSection: {
    rowGap: 6,
  },
});
