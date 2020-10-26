import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "./styles";

const Tab = ({ onPress, title }) => {
  return (
    <TouchableOpacity style={styles.tab} onPress={onPress}>
        <Text>{title}</Text>
    </TouchableOpacity>
  );
};

export default Tab;