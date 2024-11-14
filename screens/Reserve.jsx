import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import { auth } from '../firebase/firebaseSetup';
import {
  getBookedTimeslots,
  addBookedTimeslot,
  addAppointment,
} from '../firebase/firestoreHelper';
import { ALL_TIMESLOTS } from '../utils/constants';

const Reserve = ({ route, navigation }) => {
  const { trainerId, trainerName } = route.params;
  const today = moment().format('YYYY-MM-DD');

  const [bookedTimes, setBookedTimes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTime, setSelectedTime] = useState(null);

  useEffect(() => {
    const fetchBookedTimes = async () => {
      const times = await getBookedTimeslots(trainerId, selectedDate);
      setBookedTimes(times);
    };
    fetchBookedTimes();
  }, [trainerId, selectedDate]);

  const availableTimes = ALL_TIMESLOTS.filter(
    (time) => !bookedTimes.includes(time)
  );

  const handleSubmit = async () => {
    if (!selectedTime) {
      Alert.alert('Please select a time slot');
      return;
    }
    const user = auth.currentUser?.uid;
    if (!user) {
      Alert.alert('User not authenticated');
      return;
    }

    try {
      await addBookedTimeslot(trainerId, selectedDate, selectedTime);
      const datetime = `${selectedDate} ${selectedTime}`;
      await addAppointment(user, trainerId, trainerName, datetime);
      Alert.alert('Appointment confirmed!');
      navigation.goBack();
    } catch (error) {
      console.error('Error booking timeslot:', error);
      Alert.alert('Could not complete appointment. Please try again.');
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const onDayPress = (day) => {
    const selectedDay = day.dateString;
    setSelectedDate(selectedDay);
    setSelectedTime(null); // Reset selected time when date changes
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={onDayPress}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: 'black' },
        }}
        minDate={today}
      />
      <Text style={styles.selectedDateText}>Selected Date: {selectedDate}</Text>

      <FlatList
        data={availableTimes}
        numColumns={2}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.timeSlot,
              item === selectedTime && styles.selectedTimeSlot,
            ]}
            onPress={() => setSelectedTime(item)}
          >
            <Text
              style={[
                styles.timeText,
                selectedTime === item && { color: '#fff' },
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.timeSlotsContainer}
      />

      <View style={styles.buttonContainer}>
        <Button title="Submit" onPress={handleSubmit} />
        <Button title="Cancel" onPress={handleCancel} color="gray" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  selectedDateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 16,
    textAlign: 'center',
  },
  timeSlotsContainer: { paddingVertical: 16 },
  timeSlot: {
    flex: 1,
    margin: 8,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  selectedTimeSlot: { backgroundColor: '#007bff' },
  timeText: { color: '#333', fontSize: 16 },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
});

export default Reserve;
