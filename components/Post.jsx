import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  Button,
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Card } from 'react-native-paper';

export default function Post({ item }) {
  return (
    <Card>
      <Card.Content style={styles.cardContent}>
        <View style={styles.upperSection}>
          <View style={styles.userInfo}>
            <Image
              source={require('../assets/icon.png')}
              style={{ width: 50, height: 50 }}
            />
            <View>
              <Text>{item.timestamp}</Text>
              <Text>{item.user.username}</Text>
            </View>
          </View>
          <View style={styles.like}>
            <FontAwesome name="heart-o" size={18} color="black" />
            <Text>{item.likedBy.length}</Text>
          </View>
        </View>
        <View style={styles.contentSection}>
          <Image
            source={require('../assets/icon.png')}
            style={{ width: '100%', height: 200 }}
          />
          <Text>{item.text}</Text>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  cardContent: {
    rowGap: 10,
  },
  upperSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 6,
  },
  like: {
    alignItems: 'center',
  },
  contentSection: {
    rowGap: 6,
  },
});
