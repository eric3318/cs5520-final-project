import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";

const ProfileOption = ({ icon, label, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.optionCard}>
    <View style={styles.optionContent}>
      <IconButton icon={icon} size={24} color="#2196F3" />
      <Text style={styles.optionText}>{label}</Text>
      <IconButton icon="chevron-right" size={24} color="#c0c0c0" />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  optionCard: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
});

export default ProfileOption;
