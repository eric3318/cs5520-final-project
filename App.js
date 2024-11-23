import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Appointment from './screens/Appointment';
import Discovery from './screens/Discovery';
import Exercise from './screens/Exercise';
import Profile from './screens/Profile';
import NewPost from './screens/NewPost';
import Reserve from './screens/Reserve';
import TrainerMap from './screens/TrainerMap';
import { View } from 'react-native';
import Auth from './screens/Auth';
import ProfileDetails from './screens/ProfileDetails';
import React, { useEffect, useState } from 'react';
import { auth, database } from './firebase/firebaseSetup';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import uuid from 'react-native-uuid';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { Button } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const trainers = [
  {
    name: 'Trainer 1',
    focus: 'Strength',
    imageUri:
      'https://img.freepik.com/free-photo/adult-pretty-woman-happy-expression-gym-fitness-teacher-concept-ai-generated_1194-588907.jpg?semt=ais_hybrid',
    latitude: 49.22728,
    longitude: -123.000137,
  },
  {
    name: 'Trainer 2',
    focus: 'Yoga',
    imageUri:
      'https://img.freepik.com/free-photo/portrait-fitness-influencer_23-2151564785.jpg?semt=ais_hybrid',
    latitude: 49.26633,
    longitude: -123.00163,
  },
  {
    name: 'Trainer 3',
    focus: 'Pilates',
    imageUri:
      'https://img.freepik.com/free-photo/portrait-fitness-influencer_23-2151564820.jpg?semt=ais_hybrid',
    latitude: 49.285616,
    longitude: -123.120157,
  },
  {
    name: 'Trainer 4',
    focus: 'Cardio',
    imageUri:
      'https://img.freepik.com/free-photo/close-up-people-doing-yoga-indoors_23-2150848089.jpg?semt=ais_hybrid',
    latitude: 49.284832194,
    longitude: -123.106999572,
  },
];

async function initializeTrainers() {
  const setupDocRef = doc(database, 'AppSetup', 'setupComplete');
  const setupDocSnap = await getDoc(setupDocRef);

  if (setupDocSnap.exists()) {
    return;
  }

  const trainerCollection = collection(database, 'Trainer');

  for (const trainer of trainers) {
    const trainerId = uuid.v4();
    await setDoc(doc(trainerCollection, trainerId), {
      ...trainer,
      trainerId,
      bookedTimeslots: {},
    });
  }

  await setDoc(setupDocRef, { initialized: true });
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Discovery"
        component={Discovery}
        options={{
          title: 'Discovery',
          tabBarIcon: () => (
            <FontAwesome6 name="user-group" size={16} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Appointment"
        component={Appointment}
        options={{
          title: 'Train with Us Today',
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="weight-lifter"
              size={24}
              color="black"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Exercise"
        component={Exercise}
        options={{
          title: 'Exercise',
          tabBarIcon: () => (
            <FontAwesome5 name="running" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Profile',
          tabBarIcon: () => <FontAwesome name="user" size={24} color="black" />,
          headerRight: () => (
            <Button onPress={() => signOut(auth)}>
              <MaterialIcons name="logout" size={24} color="black" />
            </Button>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    initializeTrainers();
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user ? setLoggedIn(true) : setLoggedIn(false);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {loggedIn ? (
          <>
            <Stack.Screen
              name="Tabs"
              component={Tabs}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="New Post"
              component={NewPost}
              options={{
                title: 'Make New Post',
              }}
            />
            <Stack.Screen name="Profile Details" component={ProfileDetails} />
            <Stack.Screen
              name="Reserve"
              component={Reserve}
              options={{
                title: 'Select a Date & Time',
              }}
            />
            <Stack.Screen
              name="TrainerMap"
              component={TrainerMap}
              options={{ title: 'Find Trainers' }}
            />
          </>
        ) : (
          <Stack.Screen name="Auth" component={Auth} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
