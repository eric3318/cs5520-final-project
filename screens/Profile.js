import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import UserAvatar from '../components/UserAvatar';
import ProfileOption from '../components/ProfileOption';

const LeftAvatar = () => <UserAvatar />;

const Profile = () => {
  return (
    <View style={styles.container}>
      <Card style={styles.profileCard}>
        <Card.Title
          title="TestUser"
          subtitle="Member since 2024-11-12"
          left={LeftAvatar}
          titleStyle={styles.title}
          subtitleStyle={styles.subtitle}
          leftStyle={styles.leftAvatar}
        />
      </Card>

      <View style={styles.optionsContainer}>
        <ProfileOption
          icon="calendar"
          label="View Appointments"
          onPress={() => {}}
        />
        <ProfileOption icon="post" label="My Posts" onPress={() => {}} />
        <ProfileOption
          icon="star"
          label="Favourited Posts"
          onPress={() => {}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //a  marginTop: 128,
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    width: '100%',
  },
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
    marginRight: 48,
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

export default Profile;
