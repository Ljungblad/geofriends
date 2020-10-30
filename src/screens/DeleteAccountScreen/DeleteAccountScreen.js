import React, { useState } from "react";
import { View } from "react-native";
import InputField from "../../components/InputField/InputField";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
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
            alert("account deleted");
            firebase
              .auth()
              .currentUser.delete()
              .then(() => {
                alert("Account was deleted!");
              })
              .catch((error) => {
                console.log(error);
              });
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
        label="Password"
        placeholder="Enter your password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <SubmitButton label="Delete account" onPress={handleDeleteAccount} />
    </View>
  );
};

export default DeleteAccountScreen;
