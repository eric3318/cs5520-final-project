import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Button, Card } from 'react-native-paper';

const TrainerCard = ({
  trainerId,
  name,
  focus,
  availability,
  imageUri,
  navigation,
}) => {
  const handlePress = () => {
    navigation.navigate('Reserve', { trainerId: trainerId });
  };
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
        </View>
        <View style={styles.availabilityContainer}>
          <Text style={styles.availability}>
            Available within {availability}
          </Text>
          <Button
            mode="contained"
            style={styles.appointmentButton}
            onPress={handlePress}
          >
            Reserve
          </Button>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 10,
    // overflow: 'hidden',
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
  availabilityContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  availability: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  appointmentButton: {
    backgroundColor: '#007bff',
    width: 130,
  },
});

export default TrainerCard;
