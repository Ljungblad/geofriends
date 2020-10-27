import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FollowingScreen from '../screens/FollowingScreen/FollowingScreen';
import FollowersScreen from '../screens/FollowersScreen/FollowersScreen';

const Tab = createMaterialTopTabNavigator();

const TopNavigator = () => {
  return (
    <Tab.Navigator
    initialRouteName="Following"
    tabBarOptions={{
      //activeTintColor: '#e91e63',
      labelStyle: { fontSize: 14 },
      indicatorStyle: { backgroundColor: "#e91e63" },
      style: { },
    }}>
      <Tab.Screen name="Following" component={FollowingScreen} />
      <Tab.Screen name="Followers" component={FollowersScreen} />
    </Tab.Navigator>
  );
}

export default TopNavigator;