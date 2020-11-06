import React from "react";
import { Text, TouchableOpacity } from "react-native";
import globalStyles from "../../styles/globalStyles";
import styles from "./styles";

const SecondaryButton = ({ label, onPress }) => {
  return (
    <TouchableOpacity style={styles.wrapper} onPress={onPress}>
      <Text style={[styles.label, globalStyles.boldFont]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default SecondaryButton;
