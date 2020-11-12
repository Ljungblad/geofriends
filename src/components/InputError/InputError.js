import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";

const InputError = ({ error, errorMsg }) => {

  return (
      <View>
            {error && (
        <View style={styles.wrapper}>
            <Text style={styles.errorMsg}>{errorMsg}</Text>
        </View>
            )}
      </View>
  );
};

export default InputError;