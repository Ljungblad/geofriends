import React, { useState, useEffect } from "react";
import { Text, View, FlatList } from "react-native";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import FriendsList from "../../components/FriendsList/FriendsList";
import styles from "./styles";
import firebase from "../../FirebaseConfig";

const FollowingScreen = ({ navigation }) => {
  // CLEAN UP CODE
  const [users, setUsers] = useState(null);
  const [followingList, setFollowingList] = useState([]);
  const userId = firebase.auth().currentUser.uid;
  const currentUserRef = firebase.firestore().collection("users").doc(userId);
  const userData = currentUserRef.get();
  let userList = [];
  const [updated, setUpdated] = useState(false);

  const getFollowingList = () => {
    return currentUserRef.onSnapshot((snapshot) => {
      const userFollowList = snapshot.data().following;
      setFollowingList(userFollowList);
      setUpdated(true);
    });
  };

  const getUsers = async () => {
    if (followingList.length <= 0) return;
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
      setUpdated(false);
    } catch (e) {
      console.error(e);
    }
  };

  if (updated) {
    getUsers();
  }

  useEffect(() => {
    getFollowingList();
  }, []);

  return (
    <View style={styles.container}>
      <SubmitButton
        label="Add Friend"
        onPress={() => navigation.navigate("Add friend")}
      />
      {users && <FriendsList array={users}>{navigation}</FriendsList>}
    </View>
  );
};

export default FollowingScreen;
