import React, { useState } from "react";
import { Text, View, Alert } from "react-native";
import InputField from "../../components/InputField/InputField";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import SecondaryButton from "../../components/SecondaryButton/SecondayButton";
import KeyboardScroll from "../../components/KeyboardScroll/KeyboardScroll";
import InputError from "../../components/InputError/InputError";
import globalStyles from "../../styles/globalStyles";
import firebase from "../../../FirebaseConfig";
import styles from "./styles";
import colors from "../../styles/colors";
import { set } from "react-native-reanimated";

const SignUpScreen = ({ navigation }) => {
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSignUp = () => {
    if (name == "") {
      setError(true);
      setErrorMsg("Please enter a name.");
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            id: res.user.uid,
            name: name,
            email: email,
            location: {
              latitude: 57.909469370988344,
              longitude: 12.10431258830776,
            },
            imageUrl: "",
            following: [],
            pin: {
              isActive: false,
              description: "",
              createdAt: null,
            },
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
            placeholder="Name"
            onChangeText={(name) => setName(name)}
            autoCapitalize="words"
          />
          <InputField
            placeholder="Email"
            onChangeText={(email) => setEmail(email)}
          />
          <InputField
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
          <InputError error={error} errorMsg={errorMsg} />
          <SubmitButton label="Sign up" onPress={handleSignUp} />
        </View>

        <View style={styles.loginLink}>
          <Text style={[styles.loginText, globalStyles.boldFont]}>
            Already have an account?
          </Text>
          <SecondaryButton
            color={colors.primary}
            underLine="none"
            label="Login"
            onPress={() => {
              setError(false);
              navigation.navigate("Login");
            }}
          />
        </View>
      </View>
    </KeyboardScroll>
  );
};

export default SignUpScreen;
