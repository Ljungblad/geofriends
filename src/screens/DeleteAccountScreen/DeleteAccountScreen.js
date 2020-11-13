import React, { useState } from "react";
import { View, Alert } from "react-native";
import InputField from "../../components/InputField/InputField";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import KeyboardScroll from "../../components/KeyboardScroll/KeyboardScroll";
import InputError from "../../components/InputError/InputError";
import globalStyles from "../../styles/globalStyles";
import firebase from "../../../FirebaseConfig";

const DeleteAccountScreen = () => {
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [password, setPassword] = useState("");
  const user = firebase.auth().currentUser;

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
                setError(true);
                setErrorMsg(`${error.message}`);
              });
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
            label="Password"
            placeholder="Enter your password"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
          <InputError error={error} errorMsg={errorMsg} />
          <SubmitButton
            label="Delete account"
            onPress={() => {
              handleDeleteAccount();
              setError(false);
            }}
          />
        </View>
      </View>
    </KeyboardScroll>
  );
};

export default DeleteAccountScreen;
