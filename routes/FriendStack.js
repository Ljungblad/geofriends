import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TopNavigator from "./TopNavigator";
import AddFriendModal from "../screens/AddFriendModal/AddFriendModal";

const FriendStack = createStackNavigator();

const FriendStackScreen = () => (
  <FriendStack.Navigator mode="modal">
    <FriendStack.Screen name="Friends" component={TopNavigator} />
    <FriendStack.Screen
      name="Add friend"
      component={AddFriendModal}
      options={{ headerShown: false }}
    />
  </FriendStack.Navigator>
);

export default FriendStackScreen;
