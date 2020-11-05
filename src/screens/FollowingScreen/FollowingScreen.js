import React, { useState, useEffect } from "react";
import { View } from "react-native";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import FriendsList from "../../components/FriendsList/FriendsList";
import styles from "./styles";
import firebase from "../../../FirebaseConfig";
import AddFriendModal from "../../components/AddFriendModal/AddFriendModal";
import BackdropModal from "../../components/BackdropModal/BackdropModal";
import { set } from "react-native-reanimated";

const FollowingScreen = ({ navigation }) => {
  const [users, setUsers] = useState(null);
  const [followingList, setFollowingList] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  //CLOSES THE CONFIRMATION MODAL
  const fadeOut = () => {
    const timer = setTimeout(() => {
      setOpenConfirm(false);
    }, 3000);
    return () => clearTimeout(timer);
  };

  const getFollowingList = () => {
    const userId = firebase.auth().currentUser.uid;
    const currentUserRef = firebase.firestore().collection("users").doc(userId);

    return currentUserRef.onSnapshot((snapshot) => {
      const userFollowList = snapshot.data().following;
      setFollowingList(userFollowList);
      setUpdated(true);
    });
  };

  const getUsers = async () => {
    let userList = [];

    if (followingList.length == 0) {
      setUsers(null);
      setUpdated(false);
      return;
    }
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
        onPress={() => {
          setIsOpen(true);
        }}
      />
      {users && <FriendsList data={users} />}
      <AddFriendModal
        isOpen={isOpen}
        onClosed={() => {
          setIsOpen(false);
          if (updated) {
            setOpenConfirm(true);
          }
        }}
      />
      <BackdropModal
        isOpen={openConfirm}
        onOpened={fadeOut()}
        title="Your friend was added!"
      />
    </View>
  );
};

export default FollowingScreen;
