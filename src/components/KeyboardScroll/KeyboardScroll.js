import React from "react";
import styles from "./styles";
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";

const KeyboardScroll = ({ children }) => {

    return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        { children }
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    )
}

export default KeyboardScroll;