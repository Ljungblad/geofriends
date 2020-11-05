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
    borderRadius: 45,
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 2, // Android
  },
  label: {
    fontSize: 18,
    color: colors.white,
  },
});
