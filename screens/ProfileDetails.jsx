import { View, Text, Alert, FlatList } from 'react-native';
import { database, auth } from '../firebase/firebaseSetup';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import Post from '../components/Post';

export default function ProfileDetails({ route }) {
  const { currentUser } = auth;
  const { option } = route.params;
  const [posts, setPosts] = useState([]);
  const [favouritedPosts, setFavouritedPosts] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    onSnapshot(
      query(
        collection(
          database,
          option === 'Appointments' ? 'Appointments' : 'Posts'
        ),
        option !== 'Favourited Posts'
          ? where('user', '==', currentUser.uid)
          : where('likedBy', 'array-contains', currentUser.uid)
      ),
      (querySnapshot) => {
        let newArray = [];
        querySnapshot.forEach((docSnapshot) => {
          newArray.push({ ...docSnapshot.data(), id: docSnapshot.id });
        });
        switch (option) {
          case 'Appointments':
            setAppointments(newArray);
            break;
          case 'Posts':
            setPosts(newArray);
            break;
          case 'Favourited Posts':
            setFavouritedPosts(newArray);
            break;
        }
      },
      (error) => {
        console.log('on snapshot ', error);
      }
    );
  }, []);

  const renderMyPosts = () => {
    return (
      <FlatList data={posts} renderItem={({ item }) => <Post item={item} />} />
    );
  };

  const renderMyAppointments = () => {
    return (
      <FlatList
        data={appointments}
        renderItem={({ item }) => <Post item={item} />}
      />
    );
  };

  const renderFavouritedPosts = () => {
    return (
      <FlatList
        data={favouritedPosts}
        renderItem={({ item }) => <Post item={item} />}
      />
    );
  };

  return (
    <View>
      {option === 'Appointments'
        ? renderMyAppointments()
        : option === 'Posts'
          ? renderMyPosts()
          : renderFavouritedPosts()}
    </View>
  );
}
