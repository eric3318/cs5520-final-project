import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import TrainerCard from '../components/TrainerCard';
import { collection, getDocs } from 'firebase/firestore';
import { database } from '../firebase/firebaseSetup';

const Appointment = ({ navigation }) => {
  const [trainers, setTrainers] = useState([]);
  const [availabilityFilter, setAvailabilityFilter] = useState(null);
  const [focusFilter, setFocusFilter] = useState(null);

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

  useEffect(() => {
    const fetchTrainers = async () => {
      const trainerCollection = collection(database, 'Trainer');
      const trainerSnapshot = await getDocs(trainerCollection);
      const trainerList = trainerSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTrainers(trainerList);
    };
    fetchTrainers();
  }, []);

  const filteredTrainers = trainers.filter((trainer) => {
    const availabilityMatch =
      !availabilityFilter || trainer.availability === availabilityFilter;
    const focusMatch = !focusFilter || trainer.focus === focusFilter;
    return availabilityMatch && focusMatch;
  });

  return (
    <View style={styles.container}>
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
