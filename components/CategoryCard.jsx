import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

const CategoryCard = ({ name, image, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <ImageBackground
      source={{ uri: image }}
      style={styles.image}
      imageStyle={styles.imageStyle}
    >
      <Text style={styles.cardText}>{name}</Text>
    </ImageBackground>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    height: 170,
    width: '100%',
    marginVertical: 15,
    borderRadius: 10,
    // overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    borderRadius: 10,
  },
  cardText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },
});

export default CategoryCard;
