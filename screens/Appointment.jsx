import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import TrainerCard from '../components/TrainerCard';

const trainers = [
  {
    id: '1',
    name: 'Trainer 1',
    focus: 'Strength',
    availability: '3 days',
    imageUri:
      'https://img.freepik.com/free-photo/adult-pretty-woman-happy-expression-gym-fitness-teacher-concept-ai-generated_1194-588907.jpg?semt=ais_hybrid',
  },
  {
    id: '2',
    name: 'Trainer 2',
    focus: 'Yoga',
    availability: '5 days',
    imageUri:
      'https://img.freepik.com/free-photo/portrait-fitness-influencer_23-2151564785.jpg?semt=ais_hybrid',
  },
  {
    id: '3',
    name: 'Trainer 3',
    focus: 'Pilates',
    availability: '2 days',
    imageUri:
      'https://img.freepik.com/free-photo/portrait-fitness-influencer_23-2151564820.jpg?semt=ais_hybrid',
  },
  {
    id: '4',
    name: 'Trainer 4',
    focus: 'Cardio',
    availability: '1 day',
    imageUri:
      'https://img.freepik.com/free-photo/portrait-fitness-influencer_23-2151564820.jpg?semt=ais_hybrid',
  },
];

const Appointment = () => {
  const [availabilityFilter, setAvailabilityFilter] = useState(null);
  const [focusFilter, setFocusFilter] = useState(null);

  const [availabilityOpen, setAvailabilityOpen] = useState(false);
  const [focusOpen, setFocusOpen] = useState(false);

  const availabilityOptions = [
    { label: 'Within 1 day', value: '1 day' },
    { label: 'Within 3 days', value: '3 days' },
    { label: 'Within 5 days', value: '5 days' },
  ];

  const focusOptions = [
    { label: 'Strength', value: 'Strength' },
    { label: 'Yoga', value: 'Yoga' },
    { label: 'Pilates', value: 'Pilates' },
    { label: 'Cardio', value: 'Cardio' },
  ];

  const filteredTrainers = trainers.filter((trainer) => {
    const availabilityMatch =
      !availabilityFilter || trainer.availability === availabilityFilter;
    const focusMatch = !focusFilter || trainer.focus === focusFilter;
    return availabilityMatch && focusMatch;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Train With Us Today</Text>
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
            name={item.name}
            focus={item.focus}
            availability={item.availability}
            imageUri={item.imageUri} // Pass imageUri prop
            onPress={() => console.log(`New appointment with ${item.name}`)}
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
