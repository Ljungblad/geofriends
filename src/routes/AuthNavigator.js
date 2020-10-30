import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen/SignUpScreen";

const Stack = createStackNavigator();

const AuthNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name="Sign up" component={SignUpScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        
    </Stack.Navigator>
);

export default AuthNavigator;