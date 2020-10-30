import React, { useState } from "react";
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import TabNavigator from "./src/routes/TabNavigator";
import AuthNavigator from "./src/routes/AuthNavigator";
import { NavigationContainer } from "@react-navigation/native";
import firebase from "./FirebaseConfig";

const getFonts = () => Font.loadAsync({
  'nunitoSans-regular': require('./assets/fonts/NunitoSans-Regular.ttf'),
  'nunitoSans-light': require('./assets/fonts/NunitoSans-Light.ttf'),
  'nunitoSans-semiBold': require('./assets/fonts/NunitoSans-SemiBold.ttf'),
  'nunitoSans-bold': require('./assets/fonts/NunitoSans-Bold.ttf'),
})

export default function App() {
  const [user, setUser] = useState();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });

  if (fontsLoaded) {
    console.log('font loaded');
    return (
      <NavigationContainer>
        {user ? <TabNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    );
  } else {
    console.log('font NOT loaded');
    return (
      <AppLoading 
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)}
      />
    );
  }

}
