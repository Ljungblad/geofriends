import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import globalStyles from "../../styles/globalStyles";

const SecondaryButton = ({ label, onPress }) => {
  return (
    <TouchableOpacity style={styles.wrapper} onPress={onPress}>
      <Text style={[styles.label, globalStyles.regularFont]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default SecondaryButton;
