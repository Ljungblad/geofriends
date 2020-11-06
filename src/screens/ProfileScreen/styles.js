import { StyleSheet, Dimensions } from "react-native";
import colors from "../../styles/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    paddingTop: 50,
  },
  topSectionContainer: {
    width: "100%",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: colors.lightGrey,
  },
  nameTag: {
    marginBottom: 20,
  },
  topButtonContainer: {
    width: Dimensions.get("window").width,
    marginTop: 25,
    paddingHorizontal: 20,
    alignItems: "flex-start",
  },
  bottomButtonContainer: {
    width: Dimensions.get("window").width,
    marginTop: "15%",
    paddingHorizontal: 20,
    alignItems: "flex-start",
  },
});
