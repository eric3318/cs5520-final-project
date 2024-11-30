import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-paper';
import {
  COLLECTIONS,
  deleteFromDB,
  readFromStorage,
  updateDB,
  writeToDB,
} from '../firebase/firestoreHelper';
import { useEffect, useRef, useState } from 'react';
import { Avatar } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import { useAuth } from '../hook/useAuth';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { database } from '../firebase/firebaseSetup';

export default function Post({ item }) {
  const { currentUser, userInfo } = useAuth();
  const [postImageURL, setPostImageURL] = useState('');
  const [postUserImageURL, setPostUserImageURL] = useState('');
  const [currentUserImageURL, setCurrentUserImageURL] = useState('');
  const [liked, setLiked] = useState(item.likedBy.includes(currentUser.uid));
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const navigation = useNavigation();
  const inputRef = useRef(null);

  useEffect(() => {
    (async () => {
      let tasks = [];
      if (userInfo.imageUri) {
        tasks.push(readFromStorage(userInfo.imageUri));
      }
      if (item.imageUri) {
        tasks.push(readFromStorage(item.imageUri));
      }
      if (item.user.imageUri) {
        tasks.push(readFromStorage(item.user.imageUri));
      }
      let [url1, url2, url3] = await Promise.all(tasks);
      if (url1) setCurrentUserImageURL(url1);
      if (url2) setPostImageURL(url2);
      if (url3) setPostUserImageURL(url3);
    })();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(
          database,
          `${COLLECTIONS.POST}/${item.id}/${COLLECTIONS.COMMENT}`
        )
      ),
      (querySnapshot) => {
        let newComments = [];
        querySnapshot.forEach((docSnapshot) => {
          newComments.push({ ...docSnapshot.data(), id: docSnapshot.id });
        });
        setComments(newComments);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => unsubscribe();
  }, []);

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

  const newCommentHandler = async () => {
    if (commentText?.length < 8) {
      Alert.alert('Too few words');
      return;
    }
    let comment = {
      text: commentText,
      user: {
        uid: currentUser.uid,
        imageUri: userInfo.imageUri,
        username: userInfo.username,
      },
    };
    await writeToDB(comment, COLLECTIONS.POST, COLLECTIONS.COMMENT, item.id);
    setCommentText('');
    inputRef.current.blur();
  };

  const commentButtonClickHandler = () => {
    navigation.navigate('Post Details', { commentsData: comments });
  };

  return (
    <Card>
      <Card.Content style={styles.cardContent}>
        <View style={styles.upperSection}>
          <View style={styles.userSection}>
            {postUserImageURL && (
              <Avatar.Image size={36} source={{ uri: postUserImageURL }} />
            )}
            <View>
              <Text style={styles.usernameText}>{item.user.username}</Text>
              <Text style={styles.timeText}>{item.timestamp}</Text>
            </View>
          </View>

          {currentUser.uid === item.user.uid && (
            <View style={styles.iconContainer}>
              <IconButton
                icon={() => (
                  <MaterialCommunityIcons
                    name="pencil-outline"
                    size={24}
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
                    size={24}
                    color="black"
                  />
                )}
                onPress={deleteButtonClickHandler}
                size={10}
              />
            </View>
          )}
        </View>

        {postImageURL && (
          <Image
            source={{ uri: postImageURL }}
            style={{ width: '100%', height: 200 }}
          />
        )}

        <View style={styles.iconContainer}>
          <View style={styles.iconButton}>
            <IconButton
              icon={() =>
                liked ? (
                  <MaterialCommunityIcons
                    name="cards-heart"
                    size={24}
                    color="red"
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="cards-heart-outline"
                    size={24}
                    color="black"
                  />
                )
              }
              onPress={likeButtonClickHandler}
              size={10}
            />
            <Text>{item.likedBy.length}</Text>
          </View>
          <View style={styles.iconButton}>
            <IconButton
              icon={() => (
                <MaterialCommunityIcons
                  name="comment-processing-outline"
                  size={24}
                  color="black"
                />
              )}
              onPress={commentButtonClickHandler}
              size={10}
              disabled={comments.length === 0}
            />
            <Text>{comments.length}</Text>
          </View>
        </View>

        <Text>{item.text}</Text>

        <View style={styles.commentSection}>
          {currentUserImageURL && (
            <Avatar.Image size={28} source={{ uri: currentUserImageURL }} />
          )}
          <TextInput
            ref={inputRef}
            style={styles.commentTextInput}
            value={commentText}
            onChangeText={setCommentText}
            placeholder="share your thoughts"
          />
          <IconButton
            icon={() => (
              <MaterialCommunityIcons
                name="send-outline"
                size={20}
                color="black"
              />
            )}
            onPress={newCommentHandler}
            size={10}
          />
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  cardContent: {
    rowGap: 12,
  },
  upperSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 6,
  },
  usernameText: { fontWeight: 'bold' },
  timeText: { fontSize: 12 },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentSection: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 6,
  },
  commentTextInput: {
    flexGrow: 1,
    fontSize: 14,
  },
  commentButton: {
    flex: 1,
    position: 'absolute',
    inset: 0,
    zIndex: 10,
  },
});
