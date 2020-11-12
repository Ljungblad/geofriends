import React, { useState } from "react";
import { View, Alert } from "react-native";
import InputField from "../../components/InputField/InputField";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import KeyboardScroll from "../../components/KeyboardScroll/KeyboardScroll";
import globalStyles from "../../styles/globalStyles";
import firebase from "../../../FirebaseConfig";
import styles from "./styles";

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
        Alert.alert("Error!", `${error}`);
      });
  };

  return (
    <KeyboardScroll>
      <View style={globalStyles.container}>
        <View style={globalStyles.inputWrapper}>
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
      </View>
    </KeyboardScroll>
  );
};

export default LoginScreen;
