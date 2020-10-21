import React from "react";
import TabNavigator from "./routes/TabNavigator";
import SignUpScreen from "./screens/SignUpScreen/SignUpScreen";

export default function App() {
  const user = null;

  if (user === null) {
    return (
      <SignUpScreen />
    );
  }

  return (
    <TabNavigator />
  );
}
