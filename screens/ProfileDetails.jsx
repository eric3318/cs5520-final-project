import { FlatList, View } from 'react-native';
import { auth, database } from '../firebase/firebaseSetup';
import { useCallback, useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import AppointmentCard from '../components/AppointmentCard';
import NotificationManager from '../components/NotificationManager';
import { COLLECTIONS } from '../firebase/firestoreHelper';
import MiniPost from '../components/MiniPost';

export default function ProfileDetails({ navigation, route }) {
  const { currentUser } = auth;
  const { option } = route.params;
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [showNotifier, setShowNotifier] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: option,
    });
  }, [navigation]);

  const refreshAppointments = useCallback(() => {
    const q = query(
      collection(database, COLLECTIONS.APPOINTMENT),
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
          option === 'Appointments' ? COLLECTIONS.APPOINTMENT : COLLECTIONS.POST
        ),
        option === 'Liked Posts'
          ? where('likedBy', 'array-contains', currentUser.uid)
          : option === 'Appointments'
            ? where('user', '==', currentUser.uid)
            : where('user.uid', '==', currentUser.uid)
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
          case 'My Posts':
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

  /*  useEffect(() => {
    let unsubscribeFunction = getUnsubscribeFunction();
    return () => unsubscribeFunction();
  }, []);*/

  /*  const getUnsubscribeFunction = () => {
    switch (option) {
      case 'Appointments':
      case 'Liked Posts':
      case 'Posts':
        return unsubscribePosts;
    }
  };*/

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
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MiniPost item={item} option={option} />}
        numColumns={2}
      />
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
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MiniPost item={item} option={option} />}
        numColumns={2}
      />
    );
  };

  return (
    <View>
      {option === 'Appointments'
        ? renderMyAppointments()
        : option === 'My Posts'
          ? renderMyPosts()
          : renderLikedPosts()}
    </View>
  );
}
