import React from "react";
import TabNavigator from "./routes/TabNavigator";
import AuthNavigator from "./routes/AuthNavigator";
import { NavigationContainer } from "@react-navigation/native";
//import SignUpScreen from "./screens/SignUpScreen/SignUpScreen";


export default function App() {
  const user = null;

  return (
    <NavigationContainer>
      {user ? <TabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  )
}
