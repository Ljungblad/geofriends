import { StyleSheet } from "react-native";
import colors from "../../styles/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 40,
  },
  buttonWrapper: {
    paddingBottom: 40,
    borderBottomColor: colors.almostWhite,
    borderBottomWidth: 0.5,
    marginHorizontal: 20,
  }
});
