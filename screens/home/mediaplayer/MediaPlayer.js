import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MediaPlayer = ({ route }) => {
  const { title, uri, color } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Playing all videos related to {title}</Text>
      {/* Add your video player logic here */}
    </View>
  );
};

export default MediaPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
