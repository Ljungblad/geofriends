import { StyleSheet } from "react-native";
import colors from "../../styles/colors";

export default StyleSheet.create({
  wrapper: {
    marginBottom: 20,
  },
  input: {
    width: 288,
    height: 40,
    paddingLeft: 5,
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1,
    fontFamily: "nunitoSans-regular",
    fontSize: 16,
  },
  inputFocused: {
    width: 288,
    height: 40,
    paddingLeft: 5,
    borderBottomColor: colors.darkGrey,
    borderBottomWidth: 1,
    fontFamily: "nunitoSans-regular",
    fontSize: 16,
  },
});
