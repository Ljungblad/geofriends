import React from "react";
import { TouchableOpacity } from "react-native";
import styles from "./styles";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../styles/colors";

const CloseButton = ({ onPress, size }) => {
  return (
    <TouchableOpacity style={styles.wrapper} onPress={onPress}>
      <AntDesign name="close" size={size} color={colors.black} />
    </TouchableOpacity>
  );
};

export default CloseButton;
