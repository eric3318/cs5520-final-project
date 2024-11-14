import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Appointment from './screens/Appointment';
import Discovery from './screens/Discovery';
import Exercise from './screens/Exercise';
import Profile from './screens/Profile';
import NewPost from './screens/NewPost';
import Reserve from './screens/Reserve';
import React, { useEffect } from 'react';
import { database } from './firebase/firebaseSetup';
import { doc, getDoc, setDoc, collection } from 'firebase/firestore';
import uuid from 'react-native-uuid';

const trainers = [
  {
    name: 'Trainer 1',
    focus: 'Strength',
    imageUri:
      'https://img.freepik.com/free-photo/adult-pretty-woman-happy-expression-gym-fitness-teacher-concept-ai-generated_1194-588907.jpg?semt=ais_hybrid',
  },
  {
    name: 'Trainer 2',
    focus: 'Yoga',
    imageUri:
      'https://img.freepik.com/free-photo/portrait-fitness-influencer_23-2151564785.jpg?semt=ais_hybrid',
  },
  {
    name: 'Trainer 3',
    focus: 'Pilates',
    imageUri:
      'https://img.freepik.com/free-photo/portrait-fitness-influencer_23-2151564820.jpg?semt=ais_hybrid',
  },
  {
    name: 'Trainer 4',
    focus: 'Cardio',
    imageUri:
      'https://img.freepik.com/free-photo/close-up-people-doing-yoga-indoors_23-2150848089.jpg?semt=ais_hybrid',
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
          // tabBarIcon: () => (
          //   <MaterialCommunityIcons
          //     name="food-drumstick"
          //     size={24}
          //     color="black"
          //   />
          // ),
        }}
      />
      <Tab.Screen
        name="Appointment"
        component={Appointment}
        options={{
          title: 'Train with Us Today',
          // tabBarIcon: () => (
          //   <FontAwesome5 name="running" size={24} color="black" />
          // ),
        }}
      />
      <Tab.Screen
        name="Exercise"
        component={Exercise}
        options={{
          title: 'Exercise',
          // tabBarIcon: () => (
          //   <FontAwesome5 name="running" size={24} color="black" />
          // ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Profile',
          // tabBarIcon: () => (
          //   <FontAwesome5 name="running" size={24} color="black" />
          // ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  useEffect(() => {
    initializeTrainers();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
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
        <Stack.Screen
          name="Reserve"
          component={Reserve}
          options={{
            title: 'Select a Date & Time',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
