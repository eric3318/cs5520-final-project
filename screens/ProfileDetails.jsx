import { View, FlatList } from 'react-native';
import { database, auth } from '../firebase/firebaseSetup';
import { useEffect, useState, useCallback } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import Post from '../components/Post';
import AppointmentCard from '../components/AppointmentCard';
import NotificationManager from '../components/NotificationManager';

export default function ProfileDetails({ route }) {
  const { currentUser } = auth;
  const { option } = route.params;
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [showNotifier, setShowNotifier] = useState(null);

  const refreshAppointments = useCallback(() => {
    const q = query(
      collection(database, 'Appointments'),
      where('user', '==', currentUser.uid)
    );
    onSnapshot(q, (querySnapshot) => {
      const newAppointments = [];
      querySnapshot.forEach((docSnapshot) => {
        newAppointments.push({ ...docSnapshot.data(), id: docSnapshot.id });
      });
      setAppointments(newAppointments);
    });
  }, [currentUser]);

  useEffect(() => {
    onSnapshot(
      query(
        collection(
          database,
          option === 'Appointments' ? 'Appointments' : 'Posts'
        ),
        option !== 'Liked Posts'
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
          case 'Liked Posts':
            setLikedPosts(newArray);
            break;
        }
      },
      (error) => {
        console.log('on snapshot ', error);
      }
    );
  }, []);

  useEffect(() => {
    console.log(showNotifier);
  }, [showNotifier]);

  const toggleNotifier = (appointmentId) => {
    setShowNotifier((prev) =>
      prev === null
        ? appointmentId
        : prev === appointmentId
          ? null
          : appointmentId
    );
  };

  const renderMyPosts = () => {
    return (
      <FlatList data={posts} renderItem={({ item }) => <Post item={item} />} />
    );
  };

  const renderMyAppointments = () => {
    return (
      <FlatList
        data={appointments}
        renderItem={({ item }) => (
          <>
            <AppointmentCard
              appointmentId={item.id}
              trainerId={item.trainerId}
              trainerName={item.trainerName}
              datetime={item.datetime}
              onNotify={toggleNotifier}
              onCancel={refreshAppointments}
            />
            {showNotifier === item.id && <NotificationManager />}
          </>
        )}
        keyExtractor={(item) => item.id}
      />
    );
  };

  const renderLikedPosts = () => {
    return (
      <FlatList
        data={likedPosts}
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
          : renderLikedPosts()}
    </View>
  );
}
