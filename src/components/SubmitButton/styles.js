import { StyleSheet } from "react-native";
import colors from "../../styles/colors";

export default StyleSheet.create({
  wrapper: {
    paddingHorizontal: 35,
    height: 45,
    backgroundColor: colors.secondary,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  label: {
    fontSize: 18,
    color: colors.white,
  },
});
