import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";

const Recordings = () => {
  useEffect(() => {}, []);

  return <View style={styles.wrapper}></View>;
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Recordings;
