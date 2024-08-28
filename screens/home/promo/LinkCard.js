import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";

const LinkCard = ({ route }) => {
  const { zoomMeetingLink } = route.params;

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => Linking.openURL(zoomMeetingLink)}>
        <Text style={styles.linkText}>Click here to join the appointment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 10,
    alignItems: "center",
  },
  linkText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e90ff",
    textDecorationLine: "underline",
  },
});

export default LinkCard;
