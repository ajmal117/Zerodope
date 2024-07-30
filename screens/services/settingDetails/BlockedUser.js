import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import block from "../../../assets/images/block.jpg";

const BlockedUser = () => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image
          source={block} // Replace with the actual image URL
          style={styles.image}
        />
        <Text style={styles.messageText}>No Blocked Users Available</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },

  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 24,
  },
  messageText: {
    fontSize: 18,
    color: "#000",
  },
});

export default BlockedUser;
