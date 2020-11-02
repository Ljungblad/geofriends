import React, { useState, useEffect } from "react";
import { Text, View, Button, Image } from "react-native";
import globalStyles from "../../styles/globalStyles";
import firebase from "../../../FirebaseConfig";
import * as ImagePicker from "expo-image-picker";

const ProfileScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const userId = firebase.auth().currentUser.uid;

  const uploadImage = async (file) => {
    const storageRef = firebase.storage().ref("images");

    const fileRef = storageRef.child(`${userId}`);
    await fileRef.putString(file.uri);
    const fileUrl = await fileRef.getDownloadURL();

    await firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .update({
        imageUrl: fileUrl,
      })
      .then(() => {
        console.log("Updated to database");
      });
  };

  const openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    // const options = { quality: 0.5, base64: true };

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }

    setImage(pickerResult.uri);
    await uploadImage(pickerResult);
  };

  return (
    <View style={globalStyles.container}>
      <Text>Profile Screen</Text>
      <Button title="Upload profile picture" onPress={openImagePickerAsync} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
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
              console.log("it worked");
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      />
    </View>
  );
};

export default ProfileScreen;
