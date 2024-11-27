import { Alert, Image, StyleSheet, View } from 'react-native';
import { COLLECTIONS, writeToDB } from '../firebase/firestoreHelper';
import { Button, TextInput } from 'react-native-paper';
import { useState } from 'react';
import { auth, storage } from '../firebase/firebaseSetup';
import ImageManager from '../components/ImageManager';
import { newPostImageStyle } from '../utils/constants';
import { ref, uploadBytesResumable, getMetadata } from 'firebase/storage';
import { useAuth } from '../hook/useAuth';

export default function NewPost({ navigation }) {
  const [imageUri, setImageUri] = useState('');
  const [text, setText] = useState('');
  const { currentUser, userInfo } = useAuth();

  const imageHandler = (uri) => {
    setImageUri(uri);
  };

  const postHandler = async () => {
    if (!text || !imageUri) {
      Alert.alert('Missing required fields');
      return;
    }

    let uri = await uploadImage(imageUri);

    const post = {
      text,
      imageUri: uri,
      user: {
        uid: currentUser.uid,
        imageUri: userInfo.imageUri,
        username: userInfo.username,
      },
      likedBy: [currentUser.uid],
      timestamp: new Date().toISOString(),
    };

    try {
      await writeToDB(post, COLLECTIONS.POST);
      navigation.goBack();
    } catch (err) {
      Alert.alert('Failed to create new post');
      console.log(err);
    }
  };

  const uploadImage = async (imagePath) => {
    const response = await fetch(imagePath);
    if (!response.ok) {
      throw new Error(`Error happened with status ${response.status}`);
    }
    const blob = await response.blob();
    const imageName = imagePath.substring(imageUri.lastIndexOf('/') + 1);
    const imageRef = await ref(storage, `images/${imageName}`);
    await uploadBytesResumable(imageRef, blob);
    const metaData = await getMetadata(imageRef);
    return metaData.fullPath;
  };

  return (
    <View style={styles.container}>
      {imageUri ? (
        <>
          <Image source={{ uri: imageUri }} style={newPostImageStyle} />
          <TextInput
            label="Content"
            mode="outlined"
            value={text}
            onChangeText={(text) => {
              setText(text);
            }}
          />
          <Button onPress={postHandler} mode="contained">
            Make Post
          </Button>
        </>
      ) : (
        <ImageManager handleImage={imageHandler} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    rowGap: 8,
  },
});
