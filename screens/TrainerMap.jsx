import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Modal,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import ClusteredMapView from 'react-native-map-clustering';
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
  const mapRef = useRef(null);

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
          accuracy: Location.Accuracy.Balanced,
        });
        const userLoc = {
          latitude: locationResponse.coords.latitude,
          longitude: locationResponse.coords.longitude,
        };
        setUserLocation(userLoc);
        if (mapRef.current) {
          mapRef.current.animateToRegion({
            ...userLoc,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          });
        }
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
      <ClusteredMapView
        ref={mapRef}
        style={styles.map}
        region={{
          latitude: userLocation ? userLocation.latitude : 37.78825,
          longitude: userLocation ? userLocation.longitude : -122.4324,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        clusterColor="#007bff"
      >
        {userLocation && (
          <Marker coordinate={userLocation} title="You" cluster={false}>
            {/* Custom user marker */}
            <Image
              source={{
                uri: 'https://cdn.iconscout.com/icon/premium/png-512-thumb/user-location-18-615324.png?f=webp&w=512',
              }}
              style={styles.userMarker}
            />
          </Marker>
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
          >
            <Image
              source={{
                uri: 'https://cdn.iconscout.com/icon/premium/png-512-thumb/therapist-5460647-4628563.png?f=webp&w=512',
              }}
              style={styles.trainerMarker}
            />
          </Marker>
        ))}
      </ClusteredMapView>

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
                      returnTo: 'Appointment',
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
  userMarker: {
    width: 60,
    height: 60,
  },
  trainerMarker: {
    width: 30,
    height: 30,
  },
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
