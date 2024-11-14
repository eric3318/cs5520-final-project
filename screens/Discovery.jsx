import { Alert, FlatList, StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';
import { Button } from 'react-native-paper';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { database } from '../firebase/firebaseSetup';
import Post from '../components/Post';

export default function Discovery({ navigation }) {
  const [posts, setPosts] = useState([]);

  const postButtonClickHandler = () => {
    navigation.push('New Post');
  };

  useEffect(() => {
    onSnapshot(
      query(
        collection(database, 'Posts')
        // where("owner", "==", currentUser.uid),
      ),
      (querySnapshot) => {
        let newArray = [];
        querySnapshot.forEach((docSnapshot) => {
          newArray.push({ ...docSnapshot.data(), id: docSnapshot.id });
        });
        setPosts(newArray);
      },
      (error) => {
        console.log('on snapshot ', error);
      }
    );
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={postButtonClickHandler}
          mode="outlined"
          style={styles.newPostButton}
        >
          New Post
        </Button>
      ),
    });
  }, [navigation]);

  return (
    <View>
      <Button
        onPress={() => {
          navigation.push('Auth');
        }}
      >
        Test Auth Screen
      </Button>
      <FlatList data={posts} renderItem={({ item }) => <Post item={item} />} />
    </View>
  );
}

const styles = StyleSheet.create({
  newPostButton: {
    borderRadius: 12,
  },
});
