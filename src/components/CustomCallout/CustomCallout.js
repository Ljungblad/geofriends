import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import globalStyles from "../../styles/globalStyles";
import Modal from "react-native-modalbox";
import CloseButton from "../CloseButton/CloseButton";

const CustomCallout = ({ name, description, isActive, isOpen, onClosed }) => {
  return (
    <Modal
      style={styles.container}
      isOpen={isOpen}
      onClosed={onClosed}
      position="center"
      entry="top"
      coverScreen={true}
    >
      <View style={globalStyles.closeButtonContainer}>
        <CloseButton
          size={30}
          onPress={() => {
            console.log("close");
            onClosed();
          }}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={[globalStyles.boldFont, styles.text]}>{name}</Text>
        <View style={styles.descriptionContainer}>
          <Text style={[globalStyles.regularFont, styles.descriptionText]}>
            {description}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default CustomCallout;
