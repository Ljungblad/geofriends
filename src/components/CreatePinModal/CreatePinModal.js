import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import styles from "./styles";
import Modal from "react-native-modalbox";
import SubmitButton from "../SubmitButton/SubmitButton";
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
      <Text>This is a modal</Text>
      <Button
        style={styles.btn}
        title="Close"
        onPress={() => {
          console.log("setPin");
          onClosed();
        }}
      ></Button>
      <View style={styles.inputWrapepr}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          placeholder="What do you wanna share?"
          autoCapitalize="none"
          onChangeText={(description) => setDescription(description)}
          numberOfLines={10}
          multiline={true}
        />
        <SubmitButton
          label="Add pin"
          onPress={() => {
            updatePin();
            onClosed();
          }}
        />
      </View>
    </Modal>
  );
};

export default CreatePinModal;
