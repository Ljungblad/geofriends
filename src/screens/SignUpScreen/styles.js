import { StyleSheet } from "react-native";
import colors from "../../styles/colors";

export default StyleSheet.create({
  scrollView: {
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
  },
  logotypeWrapper: {
    margin: 50,
  },
  loginLink: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  loginText: {
    marginVertical: 5,
    marginRight: 10,
  },
});
