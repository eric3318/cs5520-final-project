import { FlatList, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { Button } from 'react-native-paper';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { database } from '../firebase/firebaseSetup';
import Post from '../components/Post';
import { COLLECTIONS } from '../firebase/firestoreHelper';

export default function Discovery({ navigation }) {
  const [posts, setPosts] = useState([]);

  const postButtonClickHandler = () => {
    navigation.push('New Post');
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(database, COLLECTIONS.POST)),
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
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={postButtonClickHandler}>New Post</Button>
      ),
    });
  }, [navigation]);

  return (
    <FlatList data={posts} renderItem={({ item }) => <Post item={item} />} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    rowGap: 12,
  },
});
