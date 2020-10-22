import React, {useState} from "react";
import TabNavigator from "./routes/TabNavigator";
import AuthNavigator from "./routes/AuthNavigator";
import { NavigationContainer } from "@react-navigation/native";
import firebase from "./FirebaseConfig";

export default function App() {
  const [user, setUser] = useState();
  console.log(user);

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
  )
}