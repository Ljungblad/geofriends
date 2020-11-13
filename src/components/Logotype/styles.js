import { StyleSheet } from "react-native";
import colors from "../../styles/colors";

export default StyleSheet.create({
  container: {
    alignItems: "center",
  },
  imageContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    height: 100,
    width: 100,
    borderRadius: 200,
    backgroundColor: colors.secondary,
  },
  logotype: {
    width: 50,
    height: 50,
  },
});
