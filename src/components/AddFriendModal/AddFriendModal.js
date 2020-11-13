import React, { useState } from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import globalStyles from "../../styles/globalStyles";
import Modal from "react-native-modalbox";
import InputField from "../InputField/InputField";
import SubmitButton from "../SubmitButton/SubmitButton";
import CloseButton from "../CloseButton/CloseButton";
import InputError from "../InputError/InputError";
import firebase from "../../../FirebaseConfig";

const AddFriendModal = ({ isOpen, onClosed, triggerBackdrop }) => {
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
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

  const getUserByEmail = async () => {
    const snapshot = await firebase
      .firestore()
      .collection("users")
      .where("email", "==", email)
      .get();

    if (snapshot.empty) {
      setError(true);
      setErrorMsg("Oops! Couldn't find email.");
      return;
    }

    snapshot.forEach((doc) => {
      const userId = doc.id;
      updateFollowingList(userId);
    });
    onClosed();
    triggerBackdrop();
  };

  return (
    <Modal
      style={globalStyles.modalContainer}
      isOpen={isOpen}
      onClosed={() => {
        onClosed();
        setError(false);
      }}
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
        <Text style={[globalStyles.title, styles.title]}>
          Follow a friend by adding their email
        </Text>
        <InputField
          placeholder="example@mail.com"
          onChangeText={(email) => setEmail(email)}
        />
        <InputError error={error} errorMsg={errorMsg} />
        <SubmitButton
          label="Add Friend"
          onPress={() => {
            if (email !== "") {
              getUserByEmail();
              setEmail("");
            } else {
              setError(true);
              setErrorMsg("Please enter a valid email.");
            }
          }}
        />
      </View>
    </Modal>
  );
};

export default AddFriendModal;
