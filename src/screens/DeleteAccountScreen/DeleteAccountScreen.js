import React, { useState } from "react";
import { View, Alert } from "react-native";
import InputField from "../../components/InputField/InputField";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import KeyboardScroll from "../../components/KeyboardScroll/KeyboardScroll";
import globalStyles from "../../styles/globalStyles";
import firebase from "../../../FirebaseConfig";

const DeleteAccountScreen = () => {
  const user = firebase.auth().currentUser;
  const [password, setPassword] = useState("");

  const reauthenticate = (password) => {
    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      password
    );
    return user.reauthenticateWithCredential(credential);
  };

  const handleDeleteAccount = () => {
    reauthenticate(password)
      .then(() => {
        firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .delete()
          .then(() => {
            firebase
              .auth()
              .currentUser.delete()
              .then(() => {
                Alert.alert("Success", "Account was deleted");
              })
              .catch((error) => {
                Alert.alert("Error!", `${error}`);
              });
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
            label="Password"
            placeholder="Enter your password"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
          <SubmitButton label="Delete account" onPress={handleDeleteAccount} />
        </View>
      </View>
    </KeyboardScroll>
  );
};

export default DeleteAccountScreen;
