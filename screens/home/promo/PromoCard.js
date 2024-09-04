import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";

const { width } = Dimensions.get("window");

const PromoCard = ({ offerDetail, offerText }) => {
  return (
    <View style={styles.promoCardContainer}>
      <View style={styles.promoContent}>
        <Text style={styles.offerDetail}>{offerDetail}</Text>
        <Text style={styles.offerText}>{offerText}</Text>
      </View>
      <Image
        source={require("../../../assets/images/promo1.png")} // Replace with your local image path
        style={styles.coupleImage}
        resizeMode="contain"
      />
    </View>
  );
};

export default PromoCard;

const styles = StyleSheet.create({
  promoCardContainer: {
    width: width * 0.93,
    height: 120,
    borderRadius: 5,
    backgroundColor: "#7B51D3", // Set the background color to match the design
    overflow: "hidden",
    flexDirection: "row", // Align content horizontally
    padding: 10,
  },
  promoContent: {
    flex: 1,
    justifyContent: "center",
  },
  offerDetail: {
    color: "#FFCC00", // Matches the icon color
    fontSize: 16,
    marginBottom: 5,
    width: "50%",
    textAlign: "center",
  },
  offerText: {
    width: "50%",
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  coupleImage: {
    width: 210, // Increase the size of the image
    height: 210, // Increase the size to make it appear outside the container
    position: "absolute",
    right: -35, // Move the image slightly outside the right edge
    bottom: -80, // Move the image slightly outside the bottom edge
  },
});
