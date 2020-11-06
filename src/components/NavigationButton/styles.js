import { StyleSheet } from "react-native";
import colors from "../../styles/colors";

export default StyleSheet.create({
  wrapper: {
    width: "100%",
    height: 35,
    marginVertical: 5,
  },
  label: {
    fontSize: 16,
    color: colors.black,
  },
  icon: {
    position: "absolute",
    alignSelf: "flex-end",
  },
});
