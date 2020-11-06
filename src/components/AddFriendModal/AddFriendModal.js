import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import styles from "./styles";
import globalStyles from "../../styles/globalStyles";
import Modal from "react-native-modalbox";
import InputField from "../InputField/InputField";
import SubmitButton from "../SubmitButton/SubmitButton";
import CloseButton from "../CloseButton/CloseButton";
import firebase from "../../../FirebaseConfig";

const AddFriendModal = ({ isOpen, onClosed, triggerBackdrop }) => {
  const [error, setError] = useState(false);
  const errorMsg = "Oops! Couldn't find email. Please try again.";
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
  };

  // !!!! CHECK IF EMAIL EXISTS IN DATABASE !!!!
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
        console.log(err);
        Alert.alert(
          "Invalid email!",
          "We could not find the user you were looking for."
        );
      });
  };

  return (
    <Modal
      style={globalStyles.modalContainer}
      isOpen={isOpen}
      onClosed={onClosed}
      coverScreen={true}
    >
      <View style={globalStyles.closeButtonContainer}>
        <CloseButton
          size={30}
          onPress={() => {
            onClosed();
          }}
        />
      </View>
      <View style={globalStyles.inputWrapper}>
        <Text style={[globalStyles.title, styles.title]}>Follow a friend by adding their email.</Text>
        <InputField
          label="Email"
          placeholder="example@mail.com"
          onChangeText={(email) => setEmail(email)}
        />
        <View style={styles.test}>
          {error && (<Text style={styles.errorMsg}>{errorMsg}</Text>)}
        </View>
        <SubmitButton
          label="Add Friend"
          onPress={() => {
            if (email !== "") {
              getUserByEmail();
              onClosed();
              setEmail("");
              triggerBackdrop();
            } else {
              Alert.alert("Field empty", "Please enter a valid email address.");
            }
          }}
        />
      </View>
    </Modal>
  );
};

export default AddFriendModal;
