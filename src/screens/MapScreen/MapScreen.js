import React, { useState, useEffect } from "react";
import { Text, View, ActivityIndicator, Image } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import styles from "./styles";
import globalStyles from "../../styles/globalStyles";
import firebase from "../../../FirebaseConfig";
import colors from "../../styles/colors";

// COMPONENTS
import MapButton from "../../components/MapButton/MapButton";

//ICONS
import { Feather, FontAwesome5, FontAwesome } from "@expo/vector-icons";

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [users, setUsers] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [followingList, setFollowingList] = useState([]);
  const userId = firebase.auth().currentUser.uid;
  const currentUserRef = firebase.firestore().collection("users").doc(userId);

  const updateLocation = async (location) => {
    await currentUserRef.update({
      "location.latitude": location.coords.latitude,
      "location.longitude": location.coords.longitude,
    });
    console.log("update location");
  };

  const getFollowingList = () => {
    return currentUserRef.onSnapshot((snapshot) => {
      const userFollowList = snapshot.data().following;
      const currentUserData = snapshot.data();
      setFollowingList(userFollowList);
      setUpdated(true);
      setCurrentUser(currentUserData);
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
        alert("Permission to access location was denied");
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      getFollowingList();
      updateLocation(location);
    })();
  }, []);

  if (updated) {
    getUsers();
  }

  const refreshMap = async () => {
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    getUsers();
    updateLocation(location);
    console.log("refreshed");
  };

  return (
    <View style={globalStyles.container}>
      {location !== null ? (
        <View style={styles.mapContainer}>
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
                  {user.imageUrl !== "" ? (
                    <Image
                      source={{ uri: user.imageUrl }}
                      style={styles.image}
                    />
                  ) : (
                    <Image
                      source={require("../../../assets/images/default.jpg")}
                      style={styles.image}
                    />
                  )}

                  <Callout
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      position: "absolute",
                      padding: 5,
                      width: 100,
                      height: "auto",
                      backgroundColor: colors.secondary,
                    }}
                  >
                    <Text>{user.name}</Text>
                    {user.pin.isActive && (
                      <Text style={{ color: colors.white }}>
                        {user.pin.description}
                      </Text>
                    )}
                  </Callout>
                </Marker>
              ))}
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
            >
              <FontAwesome5 name="map-pin" size={50} color={colors.black} />
              {/* <Feather name="map-pin" size={50} color={colors.black} /> */}
              {currentUser && currentUser.imageUrl !== "" ? (
                <Image
                  source={{ uri: currentUser.imageUrl }}
                  style={styles.image}
                />
              ) : (
                <Image
                  source={require("../../../assets/images/default.jpg")}
                  style={styles.image}
                />
              )}
              <Callout
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                  padding: 5,
                  width: 100,
                  height: "auto",
                }}
              >
                <Text>{currentUser && currentUser.name}</Text>
                <Text>Kom hit och drick öl!</Text>
              </Callout>
            </Marker>
          </MapView>
          <View style={styles.buttonWrapper}>
            <MapButton onPress={refreshMap}>
              <FontAwesome name="refresh" size={24} color={colors.darkGrey} />
            </MapButton>
            <MapButton onPress={() => console.log("add pin")}>
              <FontAwesome5 name="map-pin" size={24} color={colors.darkGrey} />
            </MapButton>
          </View>
        </View>
      ) : (
        <View style={[globalStyles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color={colors.black} />
        </View>
      )}
    </View>
  );
};

export default MapScreen;
