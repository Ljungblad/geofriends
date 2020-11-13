import React, { useState } from "react";
import { View, Alert } from "react-native";
import InputField from "../../components/InputField/InputField";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import KeyboardScroll from "../../components/KeyboardScroll/KeyboardScroll";
import InputError from "../../components/InputError/InputError";
import globalStyles from "../../styles/globalStyles";
import firebase from "../../../FirebaseConfig";

const ChangePasswordScreen = ({ navigation }) => {
  const [secondError, setSecondError] = useState(false);
  const [secondErrorMsg, setSecondErrorMsg] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
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
            setSecondError(true);
            setSecondErrorMsg(`${error.message}`);
          });
      })
      .catch((error) => {
        setError(true);
        setErrorMsg(`${error.message}`);
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
          <InputError error={error} errorMsg={errorMsg} />
          <InputField
            placeholder="Enter your new password"
            secureTextEntry={true}
            onChangeText={(newPassword) => setNewPassword(newPassword)}
          />
          <InputError error={secondError} errorMsg={secondErrorMsg} />
          <SubmitButton
            label="Change password"
            onPress={() => {
              handleChangePassword();
              setError(false);
              setSecondError(false);
            }}
          />
        </View>
      </View>
    </KeyboardScroll>
  );
};

export default ChangePasswordScreen;
