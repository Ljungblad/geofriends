import React, { useState, useEffect } from "react";
import { Text, View, Button } from "react-native";
import styles from "./styles";
import firebase from "../../FirebaseConfig";

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
      <Button
        title="Logout"
        onPress={() => {
          firebase
            .auth()
            .signOut()
            .then(() => {
              console.log('it worked');
            })
            .catch((error) => {
              console.log(error);
            })
        }}
      />
    </View>
  );
};

export default ProfileScreen;
