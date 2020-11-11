import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import globalStyles from "../../styles/globalStyles";

const CustomCallout = ({ name, description, isActive }) => {
  return (
    <View style={[globalStyles.container, styles.container]}>
        <View>
            <Text style={[globalStyles.boldFont, styles.text]}>{name}</Text>
        </View>
    {isActive && (
        <View style={styles.descriptionContainer}>
            <Text style={[globalStyles.regularFont, styles.text]}>{description}</Text>
        </View>
    )}
    </View>
  );
};

export default CustomCallout;