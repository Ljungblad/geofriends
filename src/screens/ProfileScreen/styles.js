import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        alignItems: "center",
        paddingTop: 25,
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 200,
    },
    buttonContainer: {
        width: Dimensions.get("window").width,
        marginTop: 50,
        paddingHorizontal: 40,
        alignItems: "flex-start",
        // backgroundColor: "beige",
    }
});
