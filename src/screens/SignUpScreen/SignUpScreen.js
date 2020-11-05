import React, { useState } from "react";
import { Text, View } from "react-native";
import InputField from "../../components/InputField/InputField";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import SecondaryButton from "../../components/SecondaryButton/SecondayButton";
import KeyboardScroll from "../../components/KeyboardScroll/KeyboardScroll";
import globalStyles from "../../styles/globalStyles";
import firebase from "../../../FirebaseConfig";

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSignUp = () => {
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
            },
          });
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <KeyboardScroll>
      <View style={globalStyles.container}>
        <InputField
          label="Name"
          placeholder="Your name"
          onChangeText={(name) => setName(name)}
          autoCapitalize="words"
        />
        <InputField
          label="Email"
          placeholder="example@mail.com"
          onChangeText={(email) => setEmail(email)}
        />
        <InputField
          label="Password"
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
        <SubmitButton label="Sign up" onPress={handleSignUp} />
        <SecondaryButton label="Login" onPress={() => navigation.navigate("Login")} />
      </View>
    </KeyboardScroll>
  );
};

export default SignUpScreen;
