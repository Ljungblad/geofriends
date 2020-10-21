import React from "react";
import { Text, View, TextInput, Button } from "react-native";
import styles from "./styles";

const LoginScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Sign Up Screen</Text>
            <TextInput 
            placeholder="Email" 
            autoCapitalize="none"
            />
            <TextInput 
            placeholder="Password" 
            autoCapitalize="none"
            />
            <Button title="Login" onPress={() => console.log('login...')}/>
        </View>
    );
};

export default LoginScreen;