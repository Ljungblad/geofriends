import React from "react";
import { View, Animated, Easing } from "react-native";
import styles from "./styles";
import MapButton from "../../components/MapButton/MapButton";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import colors from "../../styles/colors";

const MapButtonList = ({ refreshMap, removePin, setIsOpen, currentUser }) => {
  let rotateValue = new Animated.Value(0);
  const rotationAnimation = () => {
    rotateValue.setValue(0);
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ).start();
  };

  const RotateData = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.buttonWrapper}>
      <MapButton
        onPress={() => {
          refreshMap();
          rotationAnimation();
        }}
      >
        <Animated.View style={{ transform: [{ rotate: RotateData }] }}>
          <FontAwesome name="refresh" size={24} color={colors.darkGrey} />
        </Animated.View>
      </MapButton>
      {currentUser && currentUser.pin.isActive ? (
        <MapButton onPress={removePin}>
          <FontAwesome name="remove" size={24} color={colors.darkGrey} />
        </MapButton>
      ) : (
        <MapButton onPress={setIsOpen}>
          <FontAwesome5 name="map-pin" size={24} color={colors.darkGrey} />
        </MapButton>
      )}
    </View>
  );
};

export default MapButtonList;
