import React, { useState, useEffect } from "react";
import { Text, View, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import firebase from "../../../FirebaseConfig";
import globalStyles from "../../styles/globalStyles";
import styles from "./styles";
import SecondaryButton from "../../components/SecondaryButton/SecondayButton";
import UploadPicture from "../../components/UploadPicture/UploadPicture";
import NavigationButton from "../../components/NavigationButton/NavigationButton";

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

    setUserName(await currentUserData.data().name);
    setProfileImage(await currentUserData.data().imageUrl);
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
  };

  const openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission to access camera roll was denied",
        "Please accept permission to to upload a picture"
      );
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

  const logout = () => {
    firebase
      .auth()
      .signOut()
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topSectionContainer}>
        <UploadPicture
          profileImage={profileImage}
          openImagePickerAsync={openImagePickerAsync}
        />
        {userName && (
          <Text style={[globalStyles.title, styles.nameTag]}>{userName}</Text>
        )}
      </View>

      <View style={styles.topButtonContainer}>
        <NavigationButton
          label="Change Password"
          onPress={() => navigation.navigate("Change Password")}
        />
        <NavigationButton
          label="Delete Account"
          onPress={() => navigation.navigate("Delete Account")}
        />
      </View>
      <View style={styles.bottomButtonContainer}>
        <SecondaryButton label="Logout" onPress={() => logout()} />
      </View>
    </View>
  );
};

export default ProfileScreen;
