import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SearchBar from '../components/SearchBar';
import CategoryCard from '../components/CategoryCard';

const categories = [
  {
    id: '1',
    name: 'Shoulder',
    image:
      'https://images.pexels.com/photos/4506106/pexels-photo-4506106.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '2',
    name: 'Waist',
    image:
      'https://images.pexels.com/photos/8436581/pexels-photo-8436581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '3',
    name: 'Knee',
    image:
      'https://images.pexels.com/photos/7339492/pexels-photo-7339492.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '4',
    name: 'Ankle',
    image:
      'https://images.pexels.com/photos/7991959/pexels-photo-7991959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

const Exercise = () => {
  const navigation = useNavigation();
  const handleCategoryPress = (categoryName) => {
    // Todo: new screen displaying videos
    navigation.navigate('Videos', { categoryName });
  };
  const handleSearch = (query) => {
    navigation.navigate('Videos', { categoryName: query });
  };

  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} />

      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <CategoryCard
            name={item.name}
            image={item.image}
            onPress={() => handleCategoryPress(item.name)}
          />
        )}
        keyExtractor={(item) => item.id}
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
    marginBottom: 16,
    textAlign: 'center',
  },
  listContent: {
    paddingVertical: 16,
  },
});

export default Exercise;
