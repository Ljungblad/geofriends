import React, { useState, useEffect } from "react";
import { Text, View, Modal } from "react-native";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import InputField from "../../components/InputField/InputField";
import CloseButton from "../../components/CloseButton/CloseButton";
import styles from "./styles";
import firebase from "../../FirebaseConfig";

const AddFriendModal = ({ navigation }) => {
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
    await alert("Firend was added!");
    await navigation.goBack();
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
          console.log(userId);
          updateFollowingList(userId);
        });
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
  };

  return (
    <View style={styles.container}>
      <CloseButton
        style={styles.closeButton}
        onPress={() => navigation.goBack()}
        size={30}
      />
      <Text>Follow a friend by adding their email</Text>
      <InputField
        label="Enter email"
        placeholder="example@mail.com"
        onChangeText={(email) => setEmail(email)}
      />
      <SubmitButton label="Add Friend" onPress={getUserByEmail} />
    </View>
  );
};

export default AddFriendModal;
