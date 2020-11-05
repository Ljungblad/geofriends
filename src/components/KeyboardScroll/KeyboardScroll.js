import React from "react";
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";

const KeyboardScroll = ({ children }) => {

    return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        { children }
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    )
}

export default KeyboardScroll;