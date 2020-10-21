import React, {useState} from "react";
import { Text, View, TextInput, Button } from "react-native";
import styles from "./styles";
import firebase from "../../FirebaseConfig";
//import * as firebase from 'firebase';

const SignUpScreen = ({ navigation }) => {
    const [email, setEmail] = useState("email");
    const [password, setPassword] = useState("password");

    const handleSignUp = () => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                console.log('User created');
            })
            .catch(error => {
                console.error(error);
            })
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
        <Button title="Sign up" onPress={handleSignUp} 
        />
        <Text>Already have an account?</Text>
        <Button title="Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

export default SignUpScreen;