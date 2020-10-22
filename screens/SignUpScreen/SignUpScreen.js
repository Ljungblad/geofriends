import React, {useState} from "react";
import { Text, View, TextInput, Button } from "react-native";
import styles from "./styles";
import firebase from "../../FirebaseConfig";
//import * as firebase from 'firebase';

const SignUpScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleSignUp = () => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((res) => {
                firebase.database().ref('users/' + res.user.uid).set({
                    id: res.user.uid,
                    name: name,
                    email: email,
                    location: {
                        latitude: 57.709469370988344,
                        longitude: 12.00431258830776,
                    },
                    imageUrl: ""
                })

                console.log('User created');
            })
            .catch(error => {
                console.error(error);
            })
    }

  return (
    <View style={styles.container}>
        <Text>Sign Up Screen</Text>
        <TextInput 
            placeholder="Name" 
            autoCapitalize="none"
            onChangeText={(name) => setName(name)}
        />
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
        <Button title="Sign up" onPress={handleSignUp} />
        <Text>Already have an account?</Text>
        <Button title="Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

export default SignUpScreen;