import React, { useState } from "react";
import { View } from "react-native";
import InputField from "../../components/InputField/InputField";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import globalStyles from "../../styles/globalStyles";
import firebase from "../../../FirebaseConfig";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("email");
  const [password, setPassword] = useState("password");

  const handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log("Logged in");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={globalStyles.container}>
      <InputField
        label="Email"
        placeholder="Email"
        onChangeText={(email) => setEmail(email)}
      />
      <InputField
        label="Password"
        placeholder="Password"
        onChangeText={(password) => setPassword(password)}
        secureTextEntry={true}
      />
      <SubmitButton label="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;