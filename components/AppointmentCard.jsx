import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AppointmentCard = ({ trainerName, datetime }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.trainerName}>Trainer: {trainerName}</Text>
      <Text style={styles.datetime}>Date & Time: {datetime}</Text>
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
