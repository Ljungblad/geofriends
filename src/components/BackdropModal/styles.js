import { StyleSheet } from "react-native";
import colors from "../../styles/colors";

export default StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    width: 300,
    borderRadius: 5,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  text: {
    color: colors.white,
  },
});
