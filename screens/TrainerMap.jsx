import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { collection, getDocs } from 'firebase/firestore';
import { database } from '../firebase/firebaseSetup';

const TrainerMap = ({ navigation }) => {
  const [trainers, setTrainers] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [permissionResponse, requestPermission] =
    Location.useForegroundPermissions();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const trainerCollection = collection(database, 'Trainer');
        const trainerSnapshot = await getDocs(trainerCollection);
        const trainerList = trainerSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTrainers(trainerList);
      } catch (error) {
        console.error('Error fetching trainers:', error);
      }
    };

    const getLocationPermission = async () => {
      try {
        if (!permissionResponse || permissionResponse.status !== 'granted') {
          const response = await requestPermission();
          if (response.status !== 'granted') {
            Alert.alert(
              'Permission Denied',
              'Location permission is required to use this feature.'
            );
            setLoading(false);
            return;
          }
        }

        const locationResponse = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        setUserLocation({
          latitude: locationResponse.coords.latitude,
          longitude: locationResponse.coords.longitude,
        });
      } catch (err) {
        console.error('Error getting location permission:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainers();
    getLocationPermission();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: userLocation ? userLocation.latitude : 37.78825,
          longitude: userLocation ? userLocation.longitude : -122.4324,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {userLocation && (
          <Marker coordinate={userLocation} title="You" pinColor="blue" />
        )}
        {trainers.map((trainer) => (
          <Marker
            key={trainer.id}
            coordinate={{
              latitude: trainer.latitude,
              longitude: trainer.longitude,
            }}
            title={trainer.name}
            onPress={() => setSelectedTrainer(trainer)}
          />
        ))}
      </MapView>

      {selectedTrainer && (
        <Modal
          visible={true}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setSelectedTrainer(null)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.popUp}>
              <Text style={styles.modalTitle}>{selectedTrainer.name}</Text>
              <Text>Focus: {selectedTrainer.focus}</Text>
              <View style={styles.buttonContainer}>
                <Button
                  title="Reserve"
                  onPress={() => {
                    navigation.navigate('Reserve', {
                      trainerId: selectedTrainer.id,
                      trainerName: selectedTrainer.name,
                    });
                    setSelectedTrainer(null);
                  }}
                />
                <Button
                  title="Cancel"
                  onPress={() => setSelectedTrainer(null)}
                  color="gray"
                />
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  popUp: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TrainerMap;
