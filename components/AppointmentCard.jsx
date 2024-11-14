import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { cancelAppointment } from '../firebase/firestoreHelper';

const AppointmentCard = ({
  appointmentId,
  trainerId,
  trainerName,
  datetime,
  onCancel,
}) => {
  const handleCancel = async () => {
    try {
      const [date, ...timeParts] = datetime.split(' ');
      const time = timeParts.join(' ');
      await cancelAppointment(appointmentId, trainerId, date, time);
      Alert.alert('Appointment cancelled successfully.');
      onCancel();
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      Alert.alert('Could not cancel the appointment. Please try again.');
    }
  };
  return (
    <View style={styles.card}>
      <Text style={styles.trainerName}>Trainer: {trainerName}</Text>
      <Text style={styles.datetime}>Date & Time: {datetime}</Text>
      <Button title="Cancel" onPress={handleCancel} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  trainerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  datetime: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
});

export default AppointmentCard;
