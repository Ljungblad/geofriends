import React, { useState, useEffect } from "react";
import { View } from "react-native";
import FriendsList from "../../components/FriendsList/FriendsList";
import styles from "./styles";
import firebase from "../../../FirebaseConfig";


const FollowersScreen = () => {
  const [followersList, setFollowersList] = useState([]);

  const getFollowersList = async () => {
    let userList = [];
    const currentUserId = firebase.auth().currentUser.uid;
    const usersRef = firebase.firestore().collection('users');
      
      const followers = await usersRef
        .where('following', 'array-contains', currentUserId)
        .get();

      followers.forEach(follower => {
        const data = follower.data();
        userList.push(data);
      })
      
      setFollowersList(userList);
  };

  useEffect(() => {
    getFollowersList();
  }, []);

  return (
    <View style={styles.container}>
      {followersList && <FriendsList data={followersList} deleteButton={false} />}
    </View>
  );
};

export default FollowersScreen;
