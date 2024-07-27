import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Provider,
  Appbar,
  Snackbar,
} from "react-native-paper";

const BookNow = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headTitleSection}>
          <Text style={styles.sectionTitle}>Choose Your Plan</Text>
        </View>
        <ScrollView contentContainerStyle={styles.cardsContainer}>
          <View style={styles.bookNowcards}>
            <Card style={styles.bookCard}>
              <Card.Cover source={require("../../assets/images/gyma.jpg")} />
              <Card.Content>
                <Title>Consultation Scheduling</Title>
                <Paragraph>Free Diet Plan, Free Workout Plan</Paragraph>
              </Card.Content>
              <Card.Actions>
                <Button mode="contained" style={styles.button}>
                  Book Now
                </Button>
              </Card.Actions>
            </Card>
            <Card style={styles.bookCard}>
              <Card.Cover source={require("../../assets/images/gyma.jpg")} />
              <Card.Content>
                <Title>Free Support</Title>
                <Paragraph>Free Diet Plan, Free Workout Plan</Paragraph>
              </Card.Content>
              <Card.Actions>
                <Button mode="contained" style={styles.button}>
                  Book Now
                </Button>
              </Card.Actions>
            </Card>
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#FAB917",
  },
  appbar: {
    minHeight: 60,
    elevation: 1, // Add elevation for shadow effect
    shadowOffset: { width: 0, height: 1 }, // Shadow offset
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 1, // Shadow radius
  },
  appbarTitle: {
    fontWeight: "bold",
  },
  content: {
    padding: 12,
  },
  headTitleSection: {
    borderTopWidth: 1, // Add top border
    borderBottomWidth: 1, // Add bottom border
    borderColor: "#333", // Color of the border
    width: "100%", // Ensure it takes the full width
    // marginVertical: 9,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    paddingVertical: 2, // Optional: Add some padding for better spacing
    paddingHorizontal: 4, // Optional: Add horizontal padding
  },
  cardsContainer: {
    flexDirection: "row",
    // paddingHorizontal: 4,
    marginVertical: 4,
  },
  cards: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 4,
    paddingBottom: 12,
  },
  bookNowcards: {
    flexDirection: "column",
    paddingVertical: 6,
  },
  card: {
    width: 250,
    marginRight: 8,
  },
  bookCard: {
    width: 340,
    margin: 6,
  },
});

export default BookNow;
