import { StyleSheet } from "react-native";
import colors from "../../styles/colors";

export default StyleSheet.create({
  container: {
    height: null,
    width: 300,
    borderRadius: 5,
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  contentContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: -10,
  },
  text: {
    marginBottom: 2,
  },
  descriptionContainer: {
    marginTop: 2,
    backgroundColor: colors.primary,
    borderRadius: 5,
    padding: 8,
  },
  descriptionText: {
    color: colors.white,
  },
  timeStamp: {
    fontSize: 11,
    marginLeft: 6,
  }
});
