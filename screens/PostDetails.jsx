import { FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { readFromStorage } from '../firebase/firestoreHelper';
import Comment from '../components/Comment';
import Loading from '../components/Loading';
import { Divider } from 'react-native-paper';

export default function PostDetails({ route }) {
  const { commentsData } = route.params;
  const [comments, setComments] = useState(commentsData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const commentsWithImages = await Promise.all(
        commentsData.map(async (comment) => {
          const imageURL = await readFromStorage(comment.user.imageUri);
          return { ...comment, user: { ...comment.user, imageURL } };
        })
      );
      setComments(commentsWithImages);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <FlatList
      data={comments}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Comment item={item} />}
      ItemSeparatorComponent={() => <Divider />}
    />
  );
}
