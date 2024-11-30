import { Alert, Image, StyleSheet, View } from 'react-native';
import {
  COLLECTIONS,
  readFromStorage,
  updateDB,
  writeToDB,
} from '../firebase/firestoreHelper';
import { Button, TextInput } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { storage } from '../firebase/firebaseSetup';
import ImageManager from '../components/ImageManager';
import { newPostImageStyle } from '../utils/constants';
import { ref, uploadBytesResumable, getMetadata } from 'firebase/storage';
import { useAuth } from '../hook/useAuth';

export default function NewPost({ navigation, route }) {
  const post = route.params?.post ?? null;
  const [imageUri, setImageUri] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [text, setText] = useState(post?.text ?? '');
  const { currentUser, userInfo } = useAuth();

  const imageHandler = (uri) => {
    setImageUri(uri);
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: post ? 'Edit Post' : 'Make New Post',
    });
  }, []);

  useEffect(() => {
    if (post) {
      (async () => {
        let url = await readFromStorage(post.imageUri);
        setImageURL(url);
      })();
    }
  }, []);

  const postHandler = async () => {
    if (!text || !imageUri) {
      Alert.alert('Missing required fields');
      return;
    }

    let uri = await uploadImage(imageUri);

    let newPost = {
      text,
      imageUri: uri,
      user: {
        uid: currentUser.uid,
        imageUri: userInfo.imageUri,
        username: userInfo.username,
      },
      likedBy: [],
      timestamp: new Date().toISOString(),
    };

    try {
      await writeToDB(newPost, COLLECTIONS.POST);
      navigation.goBack();
    } catch (err) {
      Alert.alert('Failed to create new post');
      console.log(err);
    }
  };

  const editHandler = async () => {
    if (!text) {
      Alert.alert('Missing required fields');
      return;
    }
    let newPost = {
      ...post,
      text,
    };
    try {
      await updateDB(newPost, COLLECTIONS.POST, post.id);
      navigation.goBack();
    } catch (err) {
      Alert.alert('Failed to edit post');
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
      {imageUri || imageURL ? (
        <>
          <Image
            source={{ uri: imageUri || imageURL }}
            style={newPostImageStyle}
          />
          <TextInput
            label="Content"
            mode="outlined"
            value={text}
            onChangeText={(text) => {
              setText(text);
            }}
          />
          <Button onPress={post ? editHandler : postHandler} mode="contained">
            {post ? 'Confirm Edit' : 'Make Post'}
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
