import React from "react";
import { Text, View, TextInput } from "react-native";
import styles from "./styles";

const InputField = ({ label, onChangeText, placeholder, secureTextEntry }) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        autoCapitalize="none"
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry || false}
      />
    </View>
  );
};

export default InputField;
