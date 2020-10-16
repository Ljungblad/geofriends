import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import styles from "./styles";

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
      <Text>Change Name</Text>
      <Text>Change Password</Text>
    </View>
  );
};

export default ProfileScreen;
