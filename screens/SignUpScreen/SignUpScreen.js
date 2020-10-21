import React, {useState} from "react";
import { Text, View, TextInput, Button } from "react-native";
import styles from "./styles";
import firebase from "../../FirebaseConfig";

const SignUpScreen = ({ navigation }) => {
    const [email, setEmail] = useState("email");
    const [password, setPassword] = useState("password");

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
                // handleSignUp, login, navigate to homescreen.
            }} 
        />
        <Text>Already have an account?</Text>
        <Button title="Login" onPress={() => console.log('navigate to login screen')} />
    </View>
  );
};

export default SignUpScreen;