import { Alert, StyleSheet, View, Image } from 'react-native';
import { writeToDB } from '../firebase/firestoreHelper';
import { Button } from 'react-native-paper';
import { useState } from 'react';
import { TextInput } from 'react-native-paper';

export default function NewPost({ navigation }) {
  const [imageUri, setImageUri] = useState('../assets/icon.png');
  const [text, setText] = useState('');

  // const imageHandler = (uri) => {
  //   setImageUri(uri);
  // };

  const postHandler = async () => {
    if (!text || !imageUri) {
      Alert.alert('Missing required fields');
      return;
    }

    const post = {
      text,
      imageUri,
      user: { id: 0, username: 'test', profileImage: '' },
      likedBy: [0],
      timestamp: new Date().toISOString(),
    };

    try {
      await writeToDB(post, 'Posts');
      navigation.goBack();
    } catch (err) {
      Alert.alert('Failed to create new post');
      console.log(err);
    }
  };

  // const uploadImage = async () => {
  //   const response = await fetch(data.imageUri);
  //   if (!response.ok) {
  //     throw new Error(`Error happened with status ${response.status}`);
  //   }
  //   const blob = await response.blob();
  //   const imageName = data.imageUri.substring(
  //     data.imageUri.lastIndexOf('/') + 1
  //   );
  //   const imageRef = await ref(storage, `images/${imageName}`);
  //   const uploadResult = await uploadBytesResumable(imageRef, blob);
  // };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/icon.png')}
        style={{ width: '100%', height: 200 }}
      />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    rowGap: 8,
  },
});
