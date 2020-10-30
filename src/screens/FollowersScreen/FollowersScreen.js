import React from "react";
import { View } from "react-native";
import FriendsList from "../../components/FriendsList/FriendsList";
import styles from "./styles";
import globalStyles from "../../styles/globalStyles";

const FollowersScreen = () => {
  const arr = [
    { key: "Devin" },
    { key: "Dan" },
    { key: "Dominic" },
    { key: "Jackson" },
    { key: "James" },
  ];

  return (
    <View style={styles.container}>
      <FriendsList data={arr} />
    </View>
  );
};

export default FollowersScreen;
