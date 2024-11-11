import React from "react";
import { View, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { UserAvatar } from "../components/UserAvatar";

const Profile = () => {
  return (
    <View>
      <Card>
        <Card.Title
          title="Username"
          subtitle="Member since xxx"
          left={UserAvatar}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Profile;
