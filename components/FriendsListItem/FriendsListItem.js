import React from "react";
import { Text, View } from "react-native";
import styles from "./styles";

const FriendsListItem = ({ name }) => {
  return (
    <View style={styles.container}>
        <View style={styles.image} />
        <Text style={styles.text}>{name}</Text>
    </View>
  );
};

export default FriendsListItem;