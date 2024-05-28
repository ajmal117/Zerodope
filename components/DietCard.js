import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import partialreactlogo from "@/assets/images/partial-react-logo.png";
import { Avatar, Button, Card } from "react-native-paper";

const LeftContent = (source) => <Avatar.Icon {...source} icon="heart" style={{backgroundColor:"pink"}} />;

const DietCard = ({ title, description, onPress }) => (
  <TouchableOpacity style={cardStyles.card} onPress={onPress}>
     {/* <Image source={partialreactlogo} style={cardStyles.image} /> */}
    <Card>
      <Card.Title
        source={partialreactlogo}
        title={title}
        subtitle="Card Subtitle"
        left={LeftContent}
      />
      <Card.Content>
        <Text variant="titleLarge">Card title</Text>
        <Text variant="bodyMedium">{description}</Text>
      </Card.Content>
      <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
    </Card>
  </TouchableOpacity>
);

const cardStyles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 4,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
    // width: "80%", // Adjust width as needed
  },

});

export default DietCard;
