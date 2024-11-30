import { Alert } from 'react-native';
import {
  getPermissionsAsync,
  requestPermissionsAsync,
  scheduleNotificationAsync,
} from 'expo-notifications';
import DatePicker from './DatePicker';
import { useState } from 'react';
import { Button } from 'react-native-paper';

export default function NotificationManager() {
  const [date, setDate] = useState(new Date());

  const verifyPermission = async () => {
    try {
      const permissionResponse = await getPermissionsAsync();
      if (permissionResponse.granted) {
        return true;
      }
      const requestPermissionResponse = await requestPermissionsAsync();
      return requestPermissionResponse.granted;
    } catch (err) {
      console.log(err);
    }
  };

  const scheduleNotification = async () => {
    try {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        Alert.alert('Permission not given by user');
        return;
      }

      await scheduleNotificationAsync({
        content: {
          title: 'Upcoming Training Session',
          body: `Your session with trainer will happen on ${date.toDateString()}, make sure to arrive on time!`,
        },
        trigger: {
          seconds: Math.floor((date - new Date()) / 1000),
          type: 'timeInterval',
        },
      });
      Alert.alert('Notification successfully scheduled');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Button onPress={scheduleNotification}>Schedule Notification</Button>
      <DatePicker date={date} onDateChange={setDate} />
    </>
  );
}
