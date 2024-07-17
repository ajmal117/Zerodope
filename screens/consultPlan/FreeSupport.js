import React, { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

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

const FreeSuppor = ({ navigation }) => {
  const getToken = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      // const token = await AsyncStorage.getItem("token");
      return token;
    } catch (error) {
      console.error("Error retrieving token:", error);
    }
  };
//   useEffect(() => {
//     const getData = async () => {
//       const token = await getToken();
//       console.log("Token:", token);
//       try {
//         const response = await axios.get(
//           "https://beta.zerodope.in/api/body-building-plans?filters[users_permissions_users].[id].[$eq]=1&populate=*",
//           {
//             headers: {
//               accept: "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         const responseData = response.data;
//         console.log(
//           "Complete Response Data:",
//           JSON.stringify(responseData, null, 2)
//         );

//         // Access the nested data
//         if (responseData.data && responseData.data.length > 0) {
//           const fetchedData = responseData.data.map((item) => {
//             const { id, attributes } = item;
//             return { id, attributes };
//           });
//           console.log("Fetched Data:", JSON.stringify(fetchedData, null, 2));
//         } else {
//           console.log("No data found");
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     getData();
//   }, []);

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Body Building" titleStyle={styles.appbarTitle} />
      </Appbar.Header>
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
    padding: 16,
  },
  headTitleSection: {
    // alignItems: "center",
    borderTopWidth: 1, // Add top border
    borderBottomWidth: 1, // Add bottom border
    borderColor: "#333", // Color of the border
    width: "100%", // Ensure it takes the full width
    marginVertical: 9,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    paddingVertical: 4, // Optional: Add some padding for better spacing
    paddingHorizontal: 4, // Optional: Add horizontal padding
  },
  cardsContainer: {
    flexDirection: "row",
    paddingHorizontal: 4,
    marginVertical: 6,
  },
  cards: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  bookNowcards: {
    flexDirection: "column",
    // justifyContent: "space-between",
    paddingVertical: 8,
  },
  card: {
    width: 250,
    marginHorizontal: 6,
  },
  bookCard: {
    width: 340,
    margin: 6,
  },
});

export default FreeSuppor;
