import { StyleSheet, Dimensions } from "react-native";
import colors from "../../styles/colors";

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
    backgroundColor: colors.grey,
    borderColor: colors.white,
    borderWidth: 2,
  },
  callout: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
    width: 100,
  },
});
