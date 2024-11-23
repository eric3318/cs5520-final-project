import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Appointment from './screens/Appointment';
import Discovery from './screens/Discovery';
import Exercise from './screens/Exercise';
import Profile from './screens/Profile';
import NewPost from './screens/NewPost';
import Reserve from './screens/Reserve';
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
import { useAuth } from './hook/useAuth';
import { AuthProvider } from './context/authContext';
import Loading from './components/Loading';

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

function Navigation() {
  const [authenticated, currentUser] = useAuth();

  if (!currentUser) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {authenticated ? (
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
          </>
        ) : (
          <Stack.Screen name="Auth" component={Auth} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  useEffect(() => {
    initializeTrainers();
  }, []);

  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}
