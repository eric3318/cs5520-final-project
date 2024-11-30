import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { launchCameraAsync, useCameraPermissions } from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  getAssetInfoAsync,
  getAssetsAsync,
  usePermissions,
} from 'expo-media-library';
import { Button } from 'react-native-paper';
import { newPostImageStyle } from '../utils/constants';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function ImageManager({ handleImage }) {
  const [cameraPermissionResponse, requestCameraPermission] =
    useCameraPermissions();
  const [libraryPermissionResponse, requestLibraryPermission] =
    usePermissions();
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState('');
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        await getLibraryImages();
      } catch (err) {
        console.log(err);
        navigation.goBack();
      }
    })();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => {
            handleImage(imageUri);
          }}
        >
          Next
        </Button>
      ),
    });
  }, [imageUri]);

  const verifyCameraPermission = async () => {
    if (cameraPermissionResponse?.granted) {
      return true;
    }
    let response = await requestCameraPermission();
    return response.granted;
  };

  const takePhoto = async () => {
    try {
      const granted = await verifyCameraPermission();
      if (!granted) {
        throw new Error('User denied permission to use camera');
      }
      const result = await launchCameraAsync();
      if (!result.canceled) {
        const uri = result.assets[0].uri;
        setImageUri(uri);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const verifyLibraryPermission = async () => {
    if (libraryPermissionResponse?.status === 'granted') {
      return true;
    }
    const response = await requestLibraryPermission();
    return response.status === 'granted';
  };

  const getLibraryImages = async () => {
    const granted = await verifyLibraryPermission();
    if (!granted) {
      throw new Error('User denied permission to access library');
    }
    const data = await getAssetsAsync();
    const assetArr = [];
    for (const asset of data.assets) {
      const assetInfo = await getAssetInfoAsync(asset);
      assetArr.push(assetInfo);
    }
    setAssets(assetArr);
    setImageUri(assetArr[0].localUri);
  };

  return (
    <View style={styles.container}>
      {imageUri && (
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: imageUri,
            }}
            style={styles.mainImage}
          />
        </View>
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ fontWeight: 'bold' }}>Recent photos</Text>
        <Button
          icon={() => <AntDesign name="camera" size={24} color="black" />}
          onPress={() => takePhoto()}
        >
          Take photo
        </Button>
      </View>
      {/*todo: fix camera roll styles */}
      <FlatList
        data={assets}
        renderItem={({ item }) => (
          <Button onPress={() => setImageUri(item.localUri)}>
            <Image source={{ uri: item.localUri }} width={100} height={100} />
          </Button>
        )}
        contentContainerStyle={{
          flexDirection: 'row',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    rowGap: 6,
  },
  imageContainer: newPostImageStyle,
  mainImage: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
  },
});
