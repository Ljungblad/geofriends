import React from "react";
import { View, Text, Button } from "react-native";
import styles from "./styles";
import Modal from "react-native-modalbox";

const CreatePinModal = ({ isOpen, onClosed }) => {
  return (
    <Modal style={styles.container} isOpen={isOpen} onClosed={onClosed}>
      <Text>This is a modal</Text>
      <Button
        style={styles.btn}
        title="Close"
        onPress={() => {
          console.log("setPin");
          onClosed();
        }}
      ></Button>
    </Modal>
  );
};

export default CreatePinModal;
