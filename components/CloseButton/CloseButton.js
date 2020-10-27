import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import { AntDesign } from "@expo/vector-icons";

const CloseButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.wrapper} onPress={onPress}>
      <AntDesign name="close" size={30} color="black" />
    </TouchableOpacity>
  );
};

export default CloseButton;
