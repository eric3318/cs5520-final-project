import { StyleSheet, View, Text } from 'react-native';
import { Avatar } from 'react-native-paper';

function Comment({ item }) {
  return (
    <View style={styles.container}>
      {item.user.imageURL && (
        <Avatar.Image source={{ uri: item.user.imageURL }} size={36} />
      )}
      <View style={styles.textContainer}>
        <Text style={styles.usernameText}>{item.user.username}</Text>
        <Text>{item.text}</Text>
      </View>
    </View>
  );
}

export default Comment;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 6,
    padding: 12,
  },
  textContainer: { flex: 1, rowGap: 3 },
  usernameText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});
