import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import TrainerCard from '../components/TrainerCard';
import { collection, getDocs } from 'firebase/firestore';
import { database } from '../firebase/firebaseSetup';
import {
  COLLECTIONS,
  getAllBookedTimeslots,
} from '../firebase/firestoreHelper';
import { ALL_TIMESLOTS } from '../utils/constants';
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';
import { Card, Title } from 'react-native-paper';

const Appointment = ({ navigation }) => {
  const [trainers, setTrainers] = useState([]);
  const [availabilityFilter, setAvailabilityFilter] = useState(null);
  const [focusFilter, setFocusFilter] = useState(null);
  const [filteredTrainers, setFilteredTrainers] = useState([]);

  const [availabilityOpen, setAvailabilityOpen] = useState(false);
  const [focusOpen, setFocusOpen] = useState(false);

  const availabilityOptions = [
    { label: 'All', value: null },
    { label: 'Within 1 day', value: '1 day' },
    { label: 'Within 3 days', value: '3 days' },
    { label: 'Within 5 days', value: '5 days' },
  ];

  const focusOptions = [
    { label: 'All', value: null },
    { label: 'Strength', value: 'Strength' },
    { label: 'Yoga', value: 'Yoga' },
    { label: 'Pilates', value: 'Pilates' },
    { label: 'Cardio', value: 'Cardio' },
  ];

  useFocusEffect(
    useCallback(() => {
      const fetchTrainers = async () => {
        const trainerCollection = collection(database, COLLECTIONS.TRAINER);
        const trainerSnapshot = await getDocs(trainerCollection);
        const trainerList = await Promise.all(
          trainerSnapshot.docs.map(async (doc) => {
            const trainerData = doc.data();
            const bookedTimeslots = await getAllBookedTimeslots(doc.id);
            const availability = calculateAvailability(bookedTimeslots);
            return {
              id: doc.id,
              ...trainerData,
              availability,
            };
          })
        );
        setTrainers(trainerList);
        setFilteredTrainers(trainerList);
      };
      fetchTrainers();
    }, [])
  );

  const calculateAvailability = (bookedTimeslots) => {
    const today = moment();
    for (let i = 0; i < 10; i++) {
      const date = today.clone().add(i, 'days').format('YYYY-MM-DD');
      const bookedTimes = bookedTimeslots[date] || [];
      if (bookedTimes.length < ALL_TIMESLOTS.length) {
        return i;
      }
    }
    return -1;
  };

  useEffect(() => {
    const filtered = trainers.filter((trainer) => {
      const availabilityMatch =
        !availabilityFilter ||
        (trainer.availability >= 0 &&
          trainer.availability <= parseInt(availabilityFilter.charAt(0)));
      const focusMatch = !focusFilter || trainer.focus === focusFilter;
      return availabilityMatch && focusMatch;
    });
    setFilteredTrainers(filtered);
  }, [availabilityFilter, focusFilter]);

  return (
    <View style={styles.container}>
      <Card
        style={styles.card}
        onPress={() => navigation.navigate('TrainerMap')}
      >
        <Card.Content>
          <Title style={styles.cardTitle}>Locate Nearby Trainers</Title>
        </Card.Content>
      </Card>
      <View style={styles.filterContainer}>
        <DropDownPicker
          open={availabilityOpen}
          value={availabilityFilter}
          items={availabilityOptions}
          setOpen={setAvailabilityOpen}
          setValue={setAvailabilityFilter}
          placeholder="Availability"
          style={styles.dropdown}
          containerStyle={styles.dropdownContainer}
        />
        <DropDownPicker
          open={focusOpen}
          value={focusFilter}
          items={focusOptions}
          setOpen={setFocusOpen}
          setValue={setFocusFilter}
          placeholder="Focus"
          style={styles.dropdown}
          containerStyle={styles.dropdownContainer}
        />
      </View>

      <FlatList
        data={filteredTrainers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TrainerCard
            trainerId={item.id}
            name={item.name}
            focus={item.focus}
            availability={item.availability}
            imageUri={item.imageUri}
            navigation={navigation}
          />
        )}
        contentContainerStyle={styles.listContent}
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
  card: {
    marginBottom: 16,
    borderRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#007bff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dropdownContainer: {
    width: '48%',
  },
  dropdown: {
    backgroundColor: '#f0f0f0',
  },
  listContent: {
    paddingVertical: 8,
  },
});

export default Appointment;
