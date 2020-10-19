import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FriendScreen from "../screens/FriendScreen/FriendScreen";

const FriendStack = createStackNavigator();

const FriendStackScreen = () => (
  <FriendStack.Navigator>
    <FriendStack.Screen name="Friends" component={FriendScreen} />
  </FriendStack.Navigator>
);

export default FriendStackScreen;
