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
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#aaa",
    borderColor: "#FFF",
    borderWidth: 2,
  },
  callout: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    padding: 5,
    width: 100,
  },
});
