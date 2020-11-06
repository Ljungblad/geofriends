import React, { useState } from "react";
import { View } from "react-native";
import InputField from "../../components/InputField/InputField";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import KeyboardScroll from "../../components/KeyboardScroll/KeyboardScroll";
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
    <KeyboardScroll>
      <View style={globalStyles.container}>
        <InputField
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
        />
        <InputField
          placeholder="Password"
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={true}
        />
        <SubmitButton label="Login" onPress={handleLogin} />
      </View>
    </KeyboardScroll>
  );
};

export default LoginScreen;
