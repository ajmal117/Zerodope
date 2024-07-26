import * as React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Appbar, Text } from "react-native-paper";

const NotificationsComp = () => (
  <View style={styles.emptyStateContainer}>
    <Image
      source={require("../../assets/images/n1.jpg")}
      style={styles.noNotificationsImage}
    />
    <Text style={styles.emptyStateText}>There are no notifications here</Text>
  </View>
);

const Notifications = () => (
  <View style={styles.container}>
    <View style={styles.toolHeader}>
      <Text style={styles.toolText}>Notifications</Text>
    </View>
    <NotificationsComp />
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    flex: 1,
    backgroundColor: "#ffffff",
  },
  toolHeader: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10, // Reduced the gap between the header and the tools
  },
  toolText: {
    fontSize: 18, // Increased font size
    color: "#000",
    fontWeight: "bold",
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  noNotificationsImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  emptyStateText: {
    color: "#000000",
    fontSize: 16,
  },
});

export default Notifications;
