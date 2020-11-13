import React from "react";
import { View, Image } from "react-native";
import styles from "./styles";

const Logotype = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../../assets/logotype.png")}
          style={styles.logotype}
        />
      </View>
    </View>
  );
};

export default Logotype;
