import React, { useState } from "react";
import TabNavigator from "./src/routes/TabNavigator";
import AuthNavigator from "./src/routes/AuthNavigator";
import { NavigationContainer } from "@react-navigation/native";
import firebase from "./FirebaseConfig";

export default function App() {
  const [user, setUser] = useState();

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });

  return (
    <NavigationContainer>
      {user ? <TabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
