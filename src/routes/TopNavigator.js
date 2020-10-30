import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FollowingScreen from "../screens/FollowingScreen/FollowingScreen";
import FollowersScreen from "../screens/FollowersScreen/FollowersScreen";
import colors from "../styles/colors";

const Tab = createMaterialTopTabNavigator();

const TopNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Following"
      tabBarOptions={{
        labelStyle: { fontSize: 14 },
        indicatorStyle: { backgroundColor: colors.primary },
      }}
    >
      <Tab.Screen name="Following" component={FollowingScreen} />
      <Tab.Screen name="Followers" component={FollowersScreen} />
    </Tab.Navigator>
  );
};

export default TopNavigator;
