import React, { useState } from "react";
import { View, Alert } from "react-native";
import InputField from "../../components/InputField/InputField";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import KeyboardScroll from "../../components/KeyboardScroll/KeyboardScroll";
import InputError from "../../components/InputError/InputError";
import globalStyles from "../../styles/globalStyles";
import firebase from "../../../FirebaseConfig";

const LoginScreen = () => {
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [email, setEmail] = useState("email");
  const [password, setPassword] = useState("password");

  const handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
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
            placeholder="Email"
            onChangeText={(email) => setEmail(email)}
          />
          <InputField
            placeholder="Password"
            onChangeText={(password) => setPassword(password)}
            secureTextEntry={true}
          />
          <InputError error={error} errorMsg={errorMsg} />
          <SubmitButton
            label="Login"
            onPress={() => {
              setError(false);
              handleLogin();
            }}
          />
        </View>
      </View>
    </KeyboardScroll>
  );
};

export default LoginScreen;
