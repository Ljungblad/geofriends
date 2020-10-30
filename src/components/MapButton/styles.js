import { StyleSheet } from "react-native";
import colors from "../../styles/colors";

export default StyleSheet.create({
  mapButton: {
    backgroundColor: colors.white,
    width: 55,
    height: 55,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: colors.shadowBlack,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});
