import React, { useState, useEffect } from "react";
import { Text, View, Button } from "react-native";
import styles from "./styles";

const NavigationScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Nav menu</Text>
      <Button title="Profile" onPress={() => navigation.navigate("Profile")} />
      <Button title="Friends" onPress={() => navigation.navigate("Friends")} />
      <Button
        title="Open Side menu"
        onPress={() => navigation.toggleDrawer()}
      />
    </View>
  );
};

export default NavigationScreen;
