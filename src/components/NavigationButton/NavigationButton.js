import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import colors from "../../styles/colors";
import globalStyles from "../../styles/globalStyles";
import { AntDesign } from "@expo/vector-icons";

const NavigationButton = ({ label, onPress }) => {
  return (
    <TouchableOpacity style={styles.wrapper} onPress={onPress}>
      <Text style={[styles.label, globalStyles.regularFont]}>{label}</Text>
      <AntDesign
        style={styles.icon}
        name="right"
        size={20}
        color={colors.grey}
      />
    </TouchableOpacity>
  );
};

export default NavigationButton;
