import React from "react";
import { Text, View, Image } from "react-native";
import CloseButton from "../CloseButton/CloseButton";
import styles from "./styles";
import firebase from "../../../FirebaseConfig";

const FriendsListItem = ({ name, userId, imageUrl, deleteButton }) => {
  const currentUserId = firebase.auth().currentUser.uid;
  const currentUserRef = firebase
    .firestore()
    .collection("users")
    .doc(currentUserId);

  const removeFromFollowingList = async () => {
    await currentUserRef.update({
      following: firebase.firestore.FieldValue.arrayRemove(userId),
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.listItem}>
        <View style={styles.imageWrapper}>
          {imageUrl !== "" ? (
            <Image source={{ uri: imageUrl }} style={styles.image} />
          ) : (
            <Image
              source={require("../../../assets/images/default.jpg")}
              style={styles.image}
            />
          )}
        </View>
        <Text style={styles.text}>{name}</Text>
        {deleteButton == true &&
          <View style={styles.buttonContainer}>
            <CloseButton size={25} onPress={removeFromFollowingList} />
          </View>
        }
      </View>
    </View>
  );
};

export default FriendsListItem;
