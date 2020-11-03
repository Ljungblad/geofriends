import React from "react";
import { Text, View, Image } from "react-native";
import CloseButton from "../CloseButton/CloseButton";
import styles from "./styles";
import firebase from "../../../FirebaseConfig";

const FriendsListItem = ({ name, userId, imageUrl }) => {
  const currentUserId = firebase.auth().currentUser.uid;
  const currentUserRef = firebase
    .firestore()
    .collection("users")
    .doc(currentUserId);

  const removeFromFollowingList = async () => {
    await currentUserRef.update({
      following: firebase.firestore.FieldValue.arrayRemove(userId),
    });
    await alert("Friend was removed!");
  };

  return (
    <View style={styles.container}>
      {imageUrl !== "" ? (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      ) : (
        <Image source={require("../../../assets/images/default.jpg")} style={styles.image} />
      )}
      <Text style={styles.text}>{name}</Text>
      <CloseButton size={25} onPress={removeFromFollowingList} />
    </View>
  );
};

export default FriendsListItem;
