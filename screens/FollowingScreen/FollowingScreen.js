import React from "react";
import { Text, View, FlatList } from "react-native";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import FriendsList from "../../components/FriendsList/FriendsList";
import styles from './styles';

const FollowingScreen = () => {
  const arr = [
    {key: 'Devin'},
    {key: 'Dan'},
    {key: 'Dominic'},
    {key: 'Jackson'},
    {key: 'James'},
    {key: 'Joel'},
    {key: 'John'},
    {key: 'Jillian'},
    {key: 'Jimmy'},
    {key: 'Julie'},
]

  return (
    <View style={styles.container}>
      <SubmitButton label="Add Friend" onPress={() => console.log('Add friend')} />
      <FriendsList array={arr} />
    </View>
  );
};

export default FollowingScreen;
