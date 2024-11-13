import { View, Image, Text, StyleSheet } from 'react-native';

export default function Post({ item }) {
  return (
    <View style={styles.container}>
      <View style={styles.upperSection}>
        <Image source="../assets/icon.png" />
        <Text>{item.username}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upperSection: {
    flexDirection: 'row',
  },
});
