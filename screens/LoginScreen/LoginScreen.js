import React, {useState} from "react";
import { Text, View, TextInput, Button } from "react-native";
import styles from "./styles";
import firebase from "../../FirebaseConfig";


const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("email");
    const [password, setPassword] = useState("password");

    const handleLogin = () => {
        firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
            console.log('Logged in');
        })
        .catch(error => {
            console.error(error);
        })
    }

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
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
};

export default LoginScreen;