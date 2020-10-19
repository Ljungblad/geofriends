import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MapScreen from "../screens/MapScreen/MapScreen";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import ProfileStackScreen from "./ProfileStack";
import FriendStackScreen from "./FriendStack";

const Tabs = createBottomTabNavigator();

const TabNavigator = () => (
  <NavigationContainer>
    <Tabs.Navigator
      tabBarOptions={{
        activeTintColor: "#e91e63",
        inactiveTintColor: "#000",
        showLabel: false,
      }}
    >
      <Tabs.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="map" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="Friends"
        component={FriendStackScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="users" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-cog" color={color} size={24} />
          ),
        }}
      />
    </Tabs.Navigator>
  </NavigationContainer>
);

export default TabNavigator;
