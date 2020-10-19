import React, { useState, useEffect } from "react";
import { Text, View, Button } from "react-native";
import styles from "./styles";

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
      <Button
        title="Change Password"
        onPress={() => navigation.navigate("Change Password")}
      />
      <Button
        title="Delete Account"
        onPress={() => navigation.navigate("Delete Account")}
      />
    </View>
  );
};

export default ProfileScreen;
