import { StyleSheet } from "react-native";
import { color } from "react-native-reanimated";
import colors from "../../styles/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  listItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: colors.almostWhite,
    borderBottomWidth: 0.5,
    paddingVertical: 18,
  },
  text: {
    fontSize: 16,
    marginLeft: 18,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: colors.grey,
    shadowColor: colors.shadowBlack, // IOS
    shadowOffset: { height: 3, width: 3 }, // IOS
    shadowOpacity: 5, // IOS
    shadowRadius: 5, //IOS
    elevation: 2,
  },
  buttonContainer: {
    position: "absolute",
    width: "100%",
    alignItems: "flex-end",
  },
});
