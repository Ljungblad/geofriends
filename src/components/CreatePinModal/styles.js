import { StyleSheet } from "react-native";
import colors from "../../styles/colors";

export default StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    borderRadius: 5,
  },
  btn: {
    position: "relative",
    top: 200,
  },
  inputWrapper: {},
  label: { marginBottom: 2 },
  input: {
    height: 100,
    width: 250,
    backgroundColor: colors.lightGrey,
    justifyContent: "flex-start",
    textAlignVertical: "top",
    paddingLeft: 5,
    marginBottom: 10,
  },
});
