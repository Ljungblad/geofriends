import { StyleSheet } from "react-native";
import colors from "../../styles/colors";

export default StyleSheet.create({
  container: {
    alignItems: "center",
  },
  imageContainer: {
    position: "relative",
    marginBottom: 20,
  },
  profileImage: {
    backgroundColor: colors.grey,
    width: 200,
    height: 200,
    borderRadius: 200,
  },
  uploadButton: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary,
    width: 60,
    height: 60,
    borderRadius: 50,
    borderColor: colors.white,
    borderWidth: 2,
  },
});
