import React from "react";
import { TouchableOpacity } from "react-native";
import styles from "./styles";

const MapButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity style={styles.mapButton} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

export default MapButton;
