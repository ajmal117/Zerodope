import React from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, Button, Text, Title } from "react-native-paper";

const MyOrders = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Replace with your custom order list component */}
        <Text style={styles.message}>You haven't raised any orders yet</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#121212", // Assuming a dark background color
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  message: {
    // color: "#fff", // Assuming white text color
    textAlign: "center",
  },
});

export default MyOrders;
