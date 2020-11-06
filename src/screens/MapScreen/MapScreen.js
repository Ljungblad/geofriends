import React, { useState, useEffect } from "react";
import { Text, View, ActivityIndicator, Image } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import styles from "./styles";
import globalStyles from "../../styles/globalStyles";
import firebase from "../../../FirebaseConfig";
import colors from "../../styles/colors";

// COMPONENTS
import CreatePinModal from "../../components/CreatePinModal/CreatePinModal";
import MapButtonList from "../../components/MapButtonList/MapButtonList";

//ICONS
import { Entypo } from "@expo/vector-icons";
// console.disableYellowBox = true;

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [users, setUsers] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [followingList, setFollowingList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const userId = firebase.auth().currentUser.uid;
  const currentUserRef = firebase.firestore().collection("users").doc(userId);

  // UPDATES THE CURRENT USERS LOCATION TO DATABASE
  const updateLocation = async (location) => {
    await currentUserRef.update({
      "location.latitude": location.coords.latitude,
      "location.longitude": location.coords.longitude,
    });
    console.log("update location");
  };

  // COLLECTS THE CURRENT USERS FOLLOWING LIST AND USER DATA
  const getFollowingList = () => {
    return currentUserRef.onSnapshot((snapshot) => {
      const userFollowList = snapshot.data().following;
      const currentUserData = snapshot.data();
      setFollowingList(userFollowList);
      setUpdated(true);
      setCurrentUser(currentUserData);
    });
  };

  // COLLECTS USER DATA FROM THE CURRENT USERS FOLLOWING LIST
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

  // COLLECTS AND UPDATE THE CURRENT USERS LOCATION + DATA
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
      }
      let location = await Location.getLastKnownPositionAsync();
      setLocation(location);
      getFollowingList();
      updateLocation(location);
    })();
  }, []);

  if (updated) {
    getUsers();
  }

  // COLLECTS THE USERS DATA AND LOCATION
  const refreshMap = async () => {
    let location = await Location.getCurrentPositionAsync();
    setLocation(location);
    getUsers();
    updateLocation(location);
    console.log("refreshed");
  };

  // REMOVES THE PIN FROM THE CURRENT USERS DATABASE
  const removePin = async () => {
    await currentUserRef.update({
      "pin.isActive": false,
      "pin.description": "",
    });
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
                  {user.pin.isActive && (
                    // <Feather name="map-pin" size={50} color={colors.black} />
                    <Entypo name="location-pin" size={50} color="red" />
                  )}
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

                  <Callout style={styles.callout}>
                    <Text>{user.name}</Text>
                    {user.pin.isActive && (
                      <Text style={{ color: colors.black }}>
                        {user.pin.description}
                      </Text>
                    )}
                  </Callout>
                </Marker>
              ))}
            {currentUser && (
              <Marker
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
              >
                {currentUser.pin.isActive && (
                  // <Feather name="map-pin" size={50} color={colors.black} />
                  <Entypo name="location-pin" size={50} color="red" />
                )}
                {currentUser.imageUrl !== "" ? (
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
                {
                  <Callout style={styles.callout}>
                    <Text>{currentUser.name}</Text>
                    <Text>{currentUser.pin.description}</Text>
                  </Callout>
                }
              </Marker>
            )}
          </MapView>

          <MapButtonList
            refreshMap={refreshMap}
            removePin={removePin}
            setIsOpen={() => setIsOpen(true)}
            currentUser={currentUser}
          />

          <CreatePinModal
            isOpen={isOpen}
            onClosed={() => {
              setIsOpen(false);
              console.log("closed");
            }}
          />
        </View>
      ) : (
        // MAKE A NEW COMPONENT CALLED LOADER
        <View style={[globalStyles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color={colors.black} />
        </View>
      )}
    </View>
  );
};

export default MapScreen;
