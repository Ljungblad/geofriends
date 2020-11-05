import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import styles from "./styles";
import Modal from "react-native-modalbox";
import InputField from "../InputField/InputField";
import SubmitButton from "../SubmitButton/SubmitButton";
import CloseButton from "../CloseButton/CloseButton";
import firebase from "../../../FirebaseConfig";

const AddFriendModal = ({ isOpen, onClosed }) => {
  const [email, setEmail] = useState("");
  const currentUserId = firebase.auth().currentUser.uid;
  const currentUserRef = firebase
    .firestore()
    .collection("users")
    .doc(currentUserId);

  const updateFollowingList = async (userId) => {
    await currentUserRef.update({
      following: firebase.firestore.FieldValue.arrayUnion(userId),
    });
    Alert.alert("Success!", "Friend was added!");
  };

  const getUserByEmail = async () => {
    await firebase
      .firestore()
      .collection("users")
      .where("email", "==", email)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const userId = doc.id;
          updateFollowingList(userId);
        });
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
  };

  return (
    <Modal
      style={styles.container}
      isOpen={isOpen}
      onClosed={onClosed}
      coverScreen={true}
    >
      <View style={styles.buttonContainer}>
        <CloseButton
          size={30}
          onPress={() => {
            onClosed();
          }}
        />
      </View>
      <Text>Follow a friend by adding their email.</Text>
      <InputField
        label="Email"
        placeholder="example@mail.com"
        onChangeText={(email) => setEmail(email)}
      />
      <SubmitButton
        label="Add Friend"
        onPress={() => {
          if (email !== "") {
            getUserByEmail();
            onClosed();
          } else {
            Alert.alert("Field empty", "Please enter a valid email address.");
          }
        }}
      />
    </Modal>
  );
};

export default AddFriendModal;
