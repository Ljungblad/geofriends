import React, {useState} from "react";
import { Text, View, TextInput, Button } from "react-native";
import styles from "./styles";
import firebase from "../../FirebaseConfig";

const SignUpScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = () => {
        firebase
            .auth()
            .createUserWithEmailAndPassword()
            .then(() => console.log('navigate to main view'))
    }

    // console.log(email);
    // console.log(password);

  return (
    <View style={styles.container}>
      <Text>Sign Up Screen</Text>
      <TextInput 
        placeholder="Email" 
        autoCapitalize="none"
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput 
        placeholder="Password" 
        autoCapitalize="none"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <Button title="Sign up" onPress={() => {
          console.log(email) 
          console.log(password)
          }} />
    </View>
  );
};

export default SignUpScreen;