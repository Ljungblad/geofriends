import { StyleSheet, Dimensions } from "react-native";
import colors from "./colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "nunitoSans-bold",
    fontSize: 20,
  },
  boldFont: {
    fontFamily: "nunitoSans-bold",
    fontSize: 16,
  },
  regularFont: {
    fontFamily: "nunitoSans-regular",
    fontSize: 16,
  },
  smallFont: {
    fontFamily: "nunitoSans-light",
    fontSize: 16,
  },
  modalContainer: {
    alignItems: "center",
    width: Dimensions.get("window").width - 40,
    height: "auto",
    borderRadius: 5,
    paddingBottom: 40,
  },
  inputWrapper: {
    width: "80%",
  },
  closeButtonContainer: {
    width: "100%",
    alignItems: "flex-end",
    paddingRight: 5,
    paddingTop: 5,
  },
});
