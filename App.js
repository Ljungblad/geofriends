import React from "react";
import { Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import MapScreen from "./screens/MapScreen/MapScreen";
import FriendScreen from "./screens/FriendScreen/FriendScreen";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import NavigationScreen from "./screens/NavigationScreen/NavigationScreen";

const Tabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const MapStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Map" component={MapScreen} />
  </HomeStack.Navigator>
);

const NavStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Nav" component={NavigationScreen} />
    <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    <ProfileStack.Screen name="Friends" component={FriendScreen} />
  </ProfileStack.Navigator>
);

const TabScreens = ({ navigation }) => (
  <Tabs.Navigator>
    <Tabs.Screen name="Home" component={MapStackScreen} />
    <Tabs.Screen name="Friends" component={NavigationScreen} />
    <Tabs.Screen
      name="Navigation"
      component={NavStackScreen}
      listeners={{
        tabPress: (e) => {
          e.preventDefault();
          navigation.toggleDrawer();
        },
      }}
    />
  </Tabs.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerPosition="right">
        <Drawer.Screen name="Home" component={TabScreens} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="Friends" component={FriendScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
