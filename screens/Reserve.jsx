import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';

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
  const today = moment().format('YYYY-MM-DD');
  const currentTime = moment().format('hh:mm A');

  const hasAvailableTimesToday = times.some((time) =>
    moment(time, 'hh:mm A').isAfter(moment(currentTime, 'hh:mm A'))
  );
  const minDate = hasAvailableTimesToday
    ? today
    : moment().add(1, 'day').format('YYYY-MM-DD');

  const [selectedDate, setSelectedDate] = useState(minDate);
  const [selectedTime, setSelectedTime] = useState(null);

  const filteredTimes =
    selectedDate === today
      ? times.filter((time) =>
          moment(time, 'hh:mm A').isAfter(moment(currentTime, 'hh:mm A'))
        )
      : times;

  const onDayPress = (day) => {
    if (moment(day.dateString).isSameOrAfter(minDate)) {
      setSelectedDate(day.dateString);
      setSelectedTime(null);
    }
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={onDayPress}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: 'black' },
        }}
        minDate={minDate}
      />
      <Text style={styles.selectedDateText}>Selected Date: {selectedDate}</Text>
      <FlatList
        data={filteredTimes}
        numColumns={2}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.timeSlot,
              item === selectedTime && styles.selectedTimeSlot,
            ]}
            onPress={() => setSelectedTime(item)}
            disabled={
              selectedDate === today &&
              moment(item, 'hh:mm A').isBefore(moment())
            }
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
