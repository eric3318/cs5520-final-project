import { FlatList, Image, View } from 'react-native';
import Post from '../components/Post';

export default function Discovery() {
  const testData = [
    {
      username: 'abc',
      profileImage: '',
      timestamp: '2023-01-01 18:00',
      text: 'loremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem',
      numLikes: 18,
    },
    {
      username: 'abc',
      profileImage: '',
      timestamp: '2023-01-01 18:00',
      text: 'loremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem',
      numLikes: 18,
    },
    {
      username: 'abc',
      profileImage: '',
      timestamp: '2023-01-01 18:00',
      text: 'loremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem',
      numLikes: 18,
    },
    {
      username: 'abc',
      profileImage: '',
      timestamp: '2023-01-01 18:00',
      text: 'loremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem',
      numLikes: 18,
    },
  ];

  return (
    <View>
      <FlatList
        data={testData}
        renderItem={({ item }) => <Post item={item} />}
      />
    </View>
  );
}
