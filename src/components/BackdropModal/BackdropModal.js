import React from "react";
import { Text } from "react-native";
import styles from "./styles";
import Modal from "react-native-modalbox";
import globalStyles from "../../styles/globalStyles";

const BackdropModal = ({ isOpen, title }) => {
  return (
    <Modal
      style={styles.container}
      isOpen={isOpen}
      backdropOpacity={0}
      animationDuration={600}
      position="top"
      entry="top"
    >
      <Text style={[globalStyles.regularFont, styles.text]}>{title}</Text>
    </Modal>
  );
};

export default BackdropModal;
