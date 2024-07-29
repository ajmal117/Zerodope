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
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as SecureStore from "expo-secure-store";
import BookNow from "../booknow/BookNow";

const Stack = createStackNavigator();

const Homepage = ({ navigation }) => {
  const [paid, setPaid] = useState(true);
  const [visible2, setVisible2] = useState(false);
  const [username, setUsername] = useState("");

  const onToggleSnackBar2 = () => setVisible2(!visible2);
  const onDismissSnackBar2 = () => setVisible2(false);

  useEffect(() => {
    const getName = async () => {
      try {
        const name = await SecureStore.getItemAsync("username");
        setUsername(name);
      } catch (error) {
        console.error("Error retrieving name:", error);
      }
    };
    getName();
  }, []);

  const renderButton = (targetScreen) => (
    <Button
      style={styles.button}
      mode="contained"
      onPress={() => navigation.navigate(paid ? targetScreen : "BookNow")}
    >
      {paid ? "Open Now" : "Book Now"}
    </Button>
  );

  const renderFreeSupportButton = () => (
    <Button
      style={styles.button}
      mode="contained"
      onPress={() => navigation.navigate("FreeSupport")}
    >
      Open Now
    </Button>
  );

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar} mode="small">
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Avatar.Image
            size={40}
            source={require("../../assets/images/c1.jpg")}
            style={{ marginRight: 6 }}
          />
        </TouchableOpacity>
        <Appbar.Content
          titleStyle={styles.appbarTitle}
          title={`Hi,${username}`}
        />
        <Appbar.Action icon="magnify" onPress={onToggleSnackBar2} />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headTitleSection}>
          <Text style={styles.sectionTitle}>News On Zerodope</Text>
        </View>
        <ScrollView horizontal contentContainerStyle={styles.cardsContainer}>
          <View style={styles.cards}>
            <Card style={styles.card}>
              <Card.Cover source={require("../../assets/images/gymi.jpg")} />
              <Card.Content>
                <Title>Consultation Scheduling</Title>
                <Paragraph>Free Diet Plan, Free Workout Plan</Paragraph>
              </Card.Content>
              <Card.Actions>{renderButton("ConsultSchedule")}</Card.Actions>
            </Card>
            <Card style={styles.card}>
              <Card.Cover source={require("../../assets/images/gyma.jpg")} />
              <Card.Content>
                <Title>Free Support</Title>
                <Paragraph>Free Diet Plan, Free Workout Plan</Paragraph>
              </Card.Content>
              <Card.Actions>{renderFreeSupportButton()}</Card.Actions>
            </Card>
          </View>
        </ScrollView>
        <View style={styles.headTitleSection}>
          <Text style={styles.sectionTitle}>Customise Plan</Text>
        </View>
        <ScrollView horizontal contentContainerStyle={styles.cardsContainer}>
          <View style={styles.cards}>
            <Card style={styles.card}>
              <Card.Cover source={require("../../assets/images/gymi.jpg")} />
              <Card.Content>
                <Title>WorkOut Plan</Title>
                <Paragraph>Audio, Video & Text</Paragraph>
              </Card.Content>
              <Card.Actions>{renderButton("WorkOutPlan")}</Card.Actions>
            </Card>
            <Card style={styles.card}>
              <Card.Cover source={require("../../assets/images/gymi.jpg")} />
              <Card.Content>
                <Title>Diet Plan</Title>
                <Paragraph>Audio, Video & Text</Paragraph>
              </Card.Content>
              <Card.Actions>{renderButton("DietPlan")}</Card.Actions>
            </Card>
            <Card style={styles.card}>
              <Card.Cover source={require("../../assets/images/gymi.jpg")} />
              <Card.Content>
                <Title>Body Building</Title>
                <Paragraph>Audio, Video & Text</Paragraph>
              </Card.Content>
              <Card.Actions>{renderButton("BodyBuild")}</Card.Actions>
            </Card>
          </View>
        </ScrollView>
      </ScrollView>
      <Snackbar
        visible={visible2}
        onDismiss={onDismissSnackBar2}
        duration={Snackbar.DURATION_SHORT}
      >
        Search
      </Snackbar>
    </View>
  );
};

const App = () => (
  <Stack.Navigator initialRouteName="Homepage">
    <Stack.Screen
      name="Homepage"
      component={Homepage}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="BookNow"
      component={BookNow}
      // options={{ headerShown: false }}
    />
    {/* Add other screens here as needed */}
  </Stack.Navigator>
);

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

export default App;
