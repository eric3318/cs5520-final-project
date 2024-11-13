import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Card, Avatar } from 'react-native-paper';

const TrainerCard = ({ name, focus, availability, imageUri, onPress }) => {
  return (
    <Card style={styles.card}>
      <View style={styles.cardContent}>
        <Avatar.Image
          size={60}
          source={{
            uri:
              imageUri ||
              'https://img.freepik.com/free-photo/close-up-people-doing-yoga-indoors_23-2150848099.jpg?semt=ais_hybrid',
          }}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.trainerName}>{name}</Text>
          <Text style={styles.trainerFocus}>Focus: {focus}</Text>
          <Text style={styles.availability}>
            Available within {availability}
          </Text>
        </View>
        <Button
          mode="contained"
          style={styles.appointmentButton}
          onPress={onPress}
        >
          New Appointment
        </Button>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 16,
  },
  trainerName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  trainerFocus: {
    fontSize: 14,
    color: '#555',
    marginVertical: 4,
  },
  availability: {
    fontSize: 14,
    color: '#888',
  },
  appointmentButton: {
    backgroundColor: '#007bff',
  },
});

export default TrainerCard;
