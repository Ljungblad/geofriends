import React, { useState } from "react";
import { View, Text, TextInput, Alert } from "react-native";
import styles from "./styles";
import globalStyles from "../../styles/globalStyles";
import Modal from "react-native-modalbox";
import SubmitButton from "../SubmitButton/SubmitButton";
import CloseButton from "../CloseButton/CloseButton";
import InputError from "../InputError/InputError";
import firebase from "../../../FirebaseConfig";

const CreatePinModal = ({ isOpen, onClosed }) => {
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [description, setDescription] = useState("");
  const currentUserId = firebase.auth().currentUser.uid;
  const currentUserRef = firebase
    .firestore()
    .collection("users")
    .doc(currentUserId);

  const updatePin = async () => {
    const date = new Date();

    await currentUserRef.update({
      "pin.description": description,
      "pin.isActive": true,
      "pin.createdAt": date,
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
            setError(false);
          }}
        />
      </View>

      <View style={globalStyles.inputWrapper}>
        <Text style={globalStyles.title}>Place a pin on the map</Text>
        <TextInput
          style={styles.input}
          placeholder="What are you up to? Write a description."
          onChangeText={(description) => setDescription(description)}
          numberOfLines={10}
          multiline={true}
          maxLength={144}
        />
        <InputError error={error} errorMsg={errorMsg} />
        <SubmitButton
          label="Add pin"
          onPress={() => {
            if (description !== "") {
              updatePin();
              onClosed();
              setDescription("");
            } else {
              setError(true);
              setErrorMsg("Please enter a description.");
              return;
            }
          }}
        />
      </View>
    </Modal>
  );
};

export default CreatePinModal;
