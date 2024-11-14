import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Appointment from './screens/Appointment';
import Discovery from './screens/Discovery';
import Exercise from './screens/Exercise';
import Profile from './screens/Profile';
import NewPost from './screens/NewPost';
import Reserve from './screens/Reserve';
import { View } from 'react-native';
import Auth from './screens/Auth';
import ProfileDetails from './screens/ProfileDetails';

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
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="Profile Details" component={ProfileDetails} />
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
