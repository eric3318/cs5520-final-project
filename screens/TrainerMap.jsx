import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Marker } from 'react-native-maps';
import ClusteredMapView from 'react-native-map-clustering';
import * as Location from 'expo-location';
import { collection, getDocs } from 'firebase/firestore';
import { database } from '../firebase/firebaseSetup';
import { COLLECTIONS } from '../firebase/firestoreHelper';

const TrainerMap = ({ navigation }) => {
  const [trainers, setTrainers] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [permissionResponse, requestPermission] =
    Location.useForegroundPermissions();
  const [loading, setLoading] = useState(true);
  const mapRef = useRef(null);
  const [markerSize, setMarkerSize] = useState(60);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const trainerCollection = collection(database, COLLECTIONS.TRAINER);
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

  const handleRegionChangeComplete = (region) => {
    const baseSize = 60;
    const zoomFactor = 0.05 / region.latitudeDelta;
    const newSize = Math.min(baseSize * zoomFactor, 100);
    setMarkerSize(Math.max(newSize, 30));
  };

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
        onRegionChangeComplete={handleRegionChangeComplete}
        clusterColor="#007bff"
      >
        {userLocation && (
          <Marker coordinate={userLocation} title="You" cluster={false}>
            <Image
              source={{
                uri: 'https://cdn.iconscout.com/icon/premium/png-512-thumb/user-location-18-615324.png?f=webp&w=512',
              }}
              style={{
                width: markerSize * 0.75,
                height: markerSize * 0.75,
              }}
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
                uri: trainer.imageUri,
              }}
              style={{
                width: markerSize,
                height: markerSize,
              }}
            />
          </Marker>
        ))}
      </ClusteredMapView>

      {selectedTrainer && (
        <Modal
          visible={true}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setSelectedTrainer(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <Image
                source={{ uri: selectedTrainer.imageUri }}
                style={styles.trainerImage}
              />
              <Text style={styles.modalTitle}>{selectedTrainer.name}</Text>
              <Text style={styles.modalFocus}>
                Focus: {selectedTrainer.focus}
              </Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.button, styles.reserveButton]}
                  onPress={() => {
                    navigation.navigate('Reserve', {
                      trainerId: selectedTrainer.id,
                      trainerName: selectedTrainer.name,
                      returnTo: 'Appointment',
                    });
                    setSelectedTrainer(null);
                  }}
                >
                  <Text style={styles.buttonText}>Reserve</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={() => setSelectedTrainer(null)}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
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
    width: 45,
    height: 45,
  },
  trainerMarker: {
    width: 60,
    height: 60,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  trainerImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalFocus: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  reserveButton: {
    backgroundColor: '#007bff',
  },
  cancelButton: {
    backgroundColor: 'gray',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TrainerMap;
