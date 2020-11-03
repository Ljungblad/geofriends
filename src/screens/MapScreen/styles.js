import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
  mapContainer: {
    position: "relative",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  buttonWrapper: {
    position: "absolute",
    right: 20,
    top: 80,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: "#aaa",
  },
});
