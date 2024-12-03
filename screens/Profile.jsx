import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Avatar, Card } from 'react-native-paper';
import ProfileOption from '../components/ProfileOption';
import { useAuth } from '../hook/useAuth';
import { readFromStorage } from '../firebase/firestoreHelper';
import { format } from 'date-fns';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function Profile({ navigation }) {
  const { currentUser, userInfo } = useAuth();
  const [imageURL, setImageURL] = useState('');

  const clickHandler = (option) => {
    navigation.push('Profile Details', { option });
  };

  useEffect(() => {
    (async () => {
      if (userInfo.imageUri) {
        let url = await readFromStorage(userInfo.imageUri);
        setImageURL(url);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      {userInfo !== null && (
        <Card style={styles.profileCard}>
          <Card.Title
            title={userInfo.username}
            subtitle={`Since ${format(new Date(userInfo.createdAt), 'MMM yyyy')}`}
            left={() =>
              imageURL && <Avatar.Image source={{ uri: imageURL }} size={60} />
            }
            titleStyle={styles.title}
            subtitleStyle={styles.subtitle}
            leftStyle={styles.leftAvatar}
          />
          <Card.Content>
            <View style={{ marginLeft: 52 }}>
              <View style={styles.userInfoItem}>
                <MaterialCommunityIcons
                  name="email-outline"
                  size={18}
                  color="black"
                />
                <Text style={styles.userInfoText}>{currentUser.email}</Text>
              </View>
              <View style={styles.userInfoItem}>
                <MaterialCommunityIcons
                  name="identifier"
                  size={18}
                  color="black"
                />
                <Text style={styles.userInfoText}>{currentUser.uid}</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      )}

      <View style={styles.optionsContainer}>
        <ProfileOption
          icon="calendar"
          label="View Appointments"
          onPress={() => clickHandler('Appointments')}
        />
        <ProfileOption
          icon="post"
          label="My Posts"
          onPress={() => clickHandler('My Posts')}
        />
        <ProfileOption
          icon="star"
          label="Liked Posts"
          onPress={() => clickHandler('Liked Posts')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    width: '100%',
  },
  userInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 3,
  },
  userInfoText: { fontSize: 12 },
  profileCard: {
    width: '100%',
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
  },
  buttonContainer: {
    width: '100%',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    marginHorizontal: 4,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  leftAvatar: {
    marginRight: 30,
    marginLeft: -16,
  },
  optionsContainer: {
    width: '100%',
  },
  optionCard: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
});
