import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import globalStyles from "../../styles/globalStyles";

const SubmitButton = ({ label, onPress }) => {
  return (
    <TouchableOpacity style={styles.wrapper} onPress={onPress}>
      <Text style={[globalStyles.boldFont, styles.label]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default SubmitButton;
