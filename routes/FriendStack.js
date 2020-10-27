import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TopNavigator from './TopNavigator';

const FriendStack = createStackNavigator();

const FriendStackScreen = () => (
  <FriendStack.Navigator>
    <FriendStack.Screen name="Friends" component={TopNavigator} />
  </FriendStack.Navigator>
);

export default FriendStackScreen;
