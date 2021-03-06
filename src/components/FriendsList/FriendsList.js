import React from "react";
import { View, FlatList } from "react-native";
import FriendsListItem from "../FriendsListItem/FriendsListItem";
import styles from "./styles";

const FriendsList = ({ data, deleteButton }) => {
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={data}
        renderItem={({ item }) => (
          <FriendsListItem name={item.name} userId={item.id} imageUrl={item.imageUrl} deleteButton={deleteButton} />
        )}
      />
    </View>
  );
};

export default FriendsList;
