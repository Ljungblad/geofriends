import React, { useState, useEffect } from "react";
import { Text, View, Button, Image, TouchableOpacity } from "react-native";
import globalStyles from "../../styles/globalStyles";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../styles/colors";

const UploadPicture = ({ profileImage, openImagePickerAsync }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {profileImage !== "" ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <Image
            source={require("../../../assets/images/default.jpg")}
            style={styles.profileImage}
          />
        )}
        <TouchableOpacity
          style={styles.uploadButton}
          title="+"
          onPress={openImagePickerAsync}
        >
          <Ionicons name="ios-add" size={30} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UploadPicture;
