import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import styles from "./styles";
import firebase from "../../FirebaseConfig";

//ICONS
import { Feather } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [users, setUsers] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [followingList, setFollowingList] = useState([]);

  const userId = firebase.auth().currentUser.uid;
  const currentUserRef = firebase.firestore().collection("users").doc(userId);

  const updateLocation = async () => {
    await currentUserRef.update({
      "location.latitude": location.coords.latitude,
      "location.longitude": location.coords.longitude,
    });
  };

  const getFollowingList = () => {
    return currentUserRef.onSnapshot((snapshot) => {
      const userFollowList = snapshot.data().following;
      setFollowingList(userFollowList);
      setUpdated(true);
    });
  };

  const getUsers = async () => {
    let userList = [];

    if (followingList.length == 0) {
      setUsers(null);
      setUpdated(false);
      return;
    }
    try {
      const users = await firebase
        .firestore()
        .collection("users")
        .where("id", "in", followingList)
        .get();

      users.forEach((user) => {
        const data = user.data();
        userList.push(data);
      });
      setUsers(userList);
      setUpdated(false);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      getFollowingList();
    })();
  }, []);

  if (location) {
    updateLocation();
  }

  if (updated) {
    getUsers();
  }

  return (
    <View style={styles.container}>
      {location !== null ? (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.mapStyle}
          // showsUserLocation={true}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          loadingEnabled={true}
          strokeWidth={1}
        >
          {users &&
            users.map((user, i) => (
              <Marker
                coordinate={{
                  latitude: user.location.latitude,
                  longitude: user.location.longitude,
                }}
                key={i}
              >
                <Octicons name="person" size={24} color="black" />
                <Callout>
                  <Text>{user.name}</Text>
                </Callout>
              </Marker>
            ))}
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          >
            <Fontisto name="user-secret" size={24} color="black" />
            <Callout>
              <Text>Victor</Text>
            </Callout>
          </Marker>
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          >
            <Feather name="map-pin" size={50} color="black" />
            <Callout>
              <Text>ÖL</Text>
            </Callout>
          </Marker>
        </MapView>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default MapScreen;
