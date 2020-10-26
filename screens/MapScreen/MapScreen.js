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
import { firestore } from "firebase";
import { set } from "react-native-reanimated";

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [users, setUsers] = useState(null);
  // const [following, setFollowing] = useState(null);
  let arr = [];

  const getFollowList = async () => {
    const userId = firebase.auth().currentUser.uid;
    const usersRef = firebase.firestore().collection("users").doc(userId);
    const userData = await usersRef.get();
    if (userData.exists) {
      const followingList = userData.data().following;

      try {
        const users = await firebase
          .firestore()
          .collection("users")
          .where("id", "in", followingList)
          .get();

        users.forEach((user) => {
          const data = user.data();
          arr.push(data);
        });
        setUsers(arr);
      } catch (e) {
        console.error(e);
      }
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
      getFollowList();
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
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
