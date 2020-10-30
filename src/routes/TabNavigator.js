import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MapScreen from "../screens/MapScreen/MapScreen";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import ProfileStackScreen from "./ProfileStack";
import FriendStackScreen from "./FriendStack";
import colors from "../styles/colors";

const Tabs = createBottomTabNavigator();

const TabNavigator = () => (
  <Tabs.Navigator
    tabBarOptions={{
      activeTintColor: colors.primary,
      inactiveTintColor: colors.darkGrey,
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
);

export default TabNavigator;
