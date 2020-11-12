import React, { useState } from "react";
import { View, Alert } from "react-native";
import InputField from "../../components/InputField/InputField";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import KeyboardScroll from "../../components/KeyboardScroll/KeyboardScroll";
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
            Alert.alert("Success", "Your password was updated!");
            navigation.navigate("Profile");
          })
          .catch((error) => {
            Alert.alert("Error!", `${error}`);
          });
      })
      .catch((error) => {
        Alert.alert("Error!", `${error}`);
      });
  };

  return (
    <KeyboardScroll>
      <View style={globalStyles.container}>
        <View style={globalStyles.inputWrapper}>
          <InputField
            placeholder="Enter your current password"
            secureTextEntry={true}
            onChangeText={(currentPassword) =>
              setCurrentPassword(currentPassword)
            }
          />
          <InputField
            placeholder="Enter your new password"
            secureTextEntry={true}
            onChangeText={(newPassword) => setNewPassword(newPassword)}
          />
          <SubmitButton
            label="Change password"
            onPress={handleChangePassword}
          />
        </View>
      </View>
    </KeyboardScroll>
  );
};

export default ChangePasswordScreen;
