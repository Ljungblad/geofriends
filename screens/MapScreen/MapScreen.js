import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
// import data from "../../users.json";
import styles from "./styles";
import firebase from "../../FirebaseConfig";

//ICONS
import { Feather } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [users, setUsers] = useState(null);

  const getUsers = () => {
    firebase
      .database()
      .ref("users/")
      .on("value", (snapshot) => {
        const users = snapshot.val();
        setUsers(users);
      });
  };


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      getUsers();
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
