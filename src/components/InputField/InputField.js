import React, { useState } from "react";
import { View, TextInput } from "react-native";
import styles from "./styles";
import colors from "../../styles/colors";

const InputField = ({
  onChangeText,
  placeholder,
  secureTextEntry,
  autoCapitalize,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.wrapper}>
      <TextInput
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={isFocused ? styles.inputFocused : styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.grey}
        autoCapitalize={autoCapitalize || "none"}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry || false}
      />
    </View>
  );
};

export default InputField;
