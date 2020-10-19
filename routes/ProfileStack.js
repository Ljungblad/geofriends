import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen/ChangePasswordScreen";
import DeleteAccountScreen from "../screens/DeleteAccountScreen/DeleteAccountScreen";

const ProfileStack = createStackNavigator();

const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    <ProfileStack.Screen
      name="Change Password"
      component={ChangePasswordScreen}
    />
    <ProfileStack.Screen
      name="Delete Account"
      component={DeleteAccountScreen}
    />
  </ProfileStack.Navigator>
);

export default ProfileStackScreen;
