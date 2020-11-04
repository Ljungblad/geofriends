import React, { useState, useEffect } from "react";
import { Text, View, Button, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import firebase from "../../../FirebaseConfig";
import globalStyles from "../../styles/globalStyles";
import styles from "./styles";
import SecondaryButton from "../../components/SecondaryButton/SecondayButton";

const ProfileScreen = ({ navigation }) => {
  const [userName, setUserName] = useState(null);
  const userId = firebase.auth().currentUser.uid;
  const [profileImage, setProfileImage] = useState(null);

  const getCurrentUser = async () => {
    const currentUserData = await firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .get();

    setUserName(currentUserData.data().name);
    setProfileImage(currentUserData.data().imageUrl);
  };

  const uploadImage = async (file) => {
    const response = await fetch(file.uri);
    const blob = await response.blob();
    const storageRef = firebase.storage().ref("images");
    const fileRef = storageRef.child(`${userId}.jpg`);
    const metadata = {
      contentType: "image/jpeg",
    };

    await fileRef.put(blob, metadata);
    const fileUrl = await fileRef.getDownloadURL();

    await firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .update({
        imageUrl: fileUrl,
      })
      .then(() => {
        console.log("Updated image to database");
      });
  };

  const openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const options = { quality: 0.3 };

    let pickerResult = await ImagePicker.launchImageLibraryAsync(options);

    if (pickerResult.cancelled === true) {
      return;
    }

    await uploadImage(pickerResult);
    setProfileImage(pickerResult.uri);
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <View style={styles.container}>
      
      {profileImage !== "" ? (
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
      ) : (
        <Image
        source={require("../../../assets/images/default.jpg")}
        style={styles.profileImage}
        />
      )}

      <SecondaryButton label="Upload profile picture" onPress={openImagePickerAsync} />

      {userName && <Text style={globalStyles.title}>{userName}</Text>}

      <View style={styles.buttonContainer}>
        <SecondaryButton 
          label="Change Password" 
          onPress={() => navigation.navigate("Change Password")} 
        />
        <SecondaryButton 
          label="Delete Account" 
          onPress={() => navigation.navigate("Delete Account")} 
        />
        <SecondaryButton 
          label="Logout" 
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
    </View>
  );
};

export default ProfileScreen;
