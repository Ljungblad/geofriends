import { StyleSheet } from "react-native";
import colors from "../../styles/colors";

export default StyleSheet.create({
  container: {
    alignItems: "center",
    height: 300,
    width: 300,
    borderRadius: 5,
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
  buttonContainer: {
    width: "100%",
    alignItems: "flex-end",
  },
});
