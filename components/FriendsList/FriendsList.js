import React from "react";
import { View, FlatList } from "react-native";
import FriendsListItem from "../FriendsListItem/FriendsListItem";
import styles from "./styles";

const FriendsList = ({ array }) => {
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={array}
        renderItem={({ item }) => (
          <FriendsListItem name={item.name} userId={item.id} />
        )}
      />
    </View>
  );
};

export default FriendsList;
