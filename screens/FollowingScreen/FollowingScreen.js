import React, { useState, useEffect } from "react";
import { Text, View, FlatList } from "react-native";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import FriendsList from "../../components/FriendsList/FriendsList";
import styles from "./styles";
import firebase from "../../FirebaseConfig";

const FollowingScreen = ({ navigation }) => {
  const [users, setUsers] = useState(null);

  let userList = [];
  const userId = firebase.auth().currentUser.uid;
  const currentUserRef = firebase.firestore().collection("users").doc(userId);

  const getFollowList = async () => {
    const userData = await currentUserRef.get();
    if (userData.exists) {
      const followingList = userData.data().following;
      try {
        const users = await firebase
          .firestore()
          .collection("users")
          .where("id", "in", followingList)
          .get();

        users.forEach((user) => {
          const data = user.data();
          userList.push(data);
        });
        setUsers(userList);
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    getFollowList();
  }, []);

  return (
    <View style={styles.container}>
      <SubmitButton
        label="Add Friend"
        onPress={() => navigation.navigate("Add friend")}
      />
      {users && <FriendsList array={users} />}
    </View>
  );
};

export default FollowingScreen;
