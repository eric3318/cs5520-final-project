import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Calendar } from 'react-native-calendars';

const times = [
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
];

const Reserve = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: 'black' },
        }}
      />
      <Text style={styles.selectedDateText}>Selected Date: {selectedDate}</Text>
      <FlatList
        data={times}
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
            <Text style={styles.timeText}>{item}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.timeSlotsContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  selectedDateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 16,
    textAlign: 'center',
  },
  timeSlotsContainer: {
    paddingVertical: 16,
  },
  timeSlot: {
    flex: 1,
    margin: 8,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  selectedTimeSlot: {
    backgroundColor: '#007bff',
  },
  timeText: {
    color: '#333',
    fontSize: 16,
  },
});

export default Reserve;
