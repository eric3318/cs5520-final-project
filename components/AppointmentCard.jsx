import { View, Text, StyleSheet, Alert } from 'react-native';
import { cancelAppointment } from '../firebase/firestoreHelper';
import { Button } from 'react-native-paper';

const AppointmentCard = ({
  appointmentId,
  trainerId,
  trainerName,
  datetime,
  onNotify,
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

  const notifyButtonClickHandler = () => {
    onNotify(appointmentId);
  };

  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.trainerName}>With: {trainerName}</Text>
        <Text style={styles.datetime}>Time: {datetime}</Text>
      </View>
      <View>
        <Button onPress={notifyButtonClickHandler}>Notify</Button>
        <Button onPress={handleCancel} textColor="red">
          Cancel
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
