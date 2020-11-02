import React, { useState } from "react";
import { View } from "react-native";
import InputField from "../../components/InputField/InputField";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import globalStyles from "../../styles/globalStyles";
import firebase from "../../../FirebaseConfig";

const ChangePasswordScreen = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const reauthenticate = (currentPassword) => {
    const user = firebase.auth().currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    return user.reauthenticateWithCredential(credential);
  };

  const handleChangePassword = () => {
    reauthenticate(currentPassword)
      .then(() => {
        const user = firebase.auth().currentUser;
        user
          .updatePassword(newPassword)
          .then(() => {
            alert("Password was updated!");
            navigation.navigate("Profile");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={globalStyles.container}>
      <InputField
        label="Current password"
        placeholder="Enter your current password"
        secureTextEntry={true}
        onChangeText={(currentPassword) => setCurrentPassword(currentPassword)}
      />
      <InputField
        label="New password"
        placeholder="Enter your new password"
        secureTextEntry={true}
        onChangeText={(newPassword) => setNewPassword(newPassword)}
      />
      <SubmitButton label="Change password" onPress={handleChangePassword} />
    </View>
  );
};

export default ChangePasswordScreen;