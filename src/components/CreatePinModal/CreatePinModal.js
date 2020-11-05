import React, { useState } from "react";
import { View, Text, TextInput, Alert } from "react-native";
import styles from "./styles";
import Modal from "react-native-modalbox";
import SubmitButton from "../SubmitButton/SubmitButton";
import CloseButton from "../CloseButton/CloseButton";
import firebase from "../../../FirebaseConfig";

const CreatePinModal = ({ isOpen, onClosed }) => {
  const [description, setDescription] = useState("");
  const currentUserId = firebase.auth().currentUser.uid;
  const currentUserRef = firebase
    .firestore()
    .collection("users")
    .doc(currentUserId);

  const updatePin = async () => {
    await currentUserRef.update({
      "pin.description": description,
      "pin.isActive": true,
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
            console.log("close");
            onClosed();
          }}
        />
      </View>

      <View style={styles.inputWrapepr}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          placeholder="What do you wanna share?"
          onChangeText={(description) => setDescription(description)}
          numberOfLines={10}
          multiline={true}
        />
        <SubmitButton
          label="Add pin"
          onPress={() => {
            if (description !== "") {
              updatePin();
              onClosed();
              setDescription("");
            } else {
              Alert.alert("Description is empty", "Please enter a description");
            }
          }}
        />
      </View>
    </Modal>
  );
};

export default CreatePinModal;
