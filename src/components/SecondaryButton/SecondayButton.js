import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "./styles";

const SecondaryButton = ({ label, onPress }) => {
  return (
    <TouchableOpacity style={styles.wrapper} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default SecondaryButton;