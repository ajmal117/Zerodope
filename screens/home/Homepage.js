import React, { useState } from "react";
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

const Stack = createStackNavigator();

const Homepage = () => {
  return (
    <Provider>
      <Stack.Navigator>
        <Stack.Screen
          name="Homepage"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BookNow"
          component={BookNowScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </Provider>
  );
};

const HomeScreen = ({ navigation }) => {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const onToggleSnackBar1 = () => setVisible1(!visible1);
  const onDismissSnackBar1 = () => setVisible1(false);

  const onToggleSnackBar2 = () => setVisible2(!visible2);
  const onDismissSnackBar2 = () => setVisible2(false);

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar} mode="small">
        <Avatar.Image
          size={40}
          source={require("../../assets/images/gyma.jpg")}
          style={{ marginRight: 6 }}
        />
        <Appbar.Content titleStyle={styles.appbarTitle} title="Hi, Rahul" />
        <Appbar.Action icon="bell" onPress={onToggleSnackBar1} />
        {/* <Appbar.Action icon="account-circle" onPress={onToggleSnackBar2} /> */}
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
              <Card.Actions>
                <Button
                  style={styles.button}
                  mode="contained"
                  onPress={() => navigation.navigate("BookNow")}
                >
                  Book Now
                </Button>
              </Card.Actions>
            </Card>
            <Card style={styles.card}>
              <Card.Cover source={require("../../assets/images/gyma.jpg")} />
              <Card.Content>
                <Title>Free Support</Title>
                <Paragraph>Free Diet Plan, Free Workout Plan</Paragraph>
              </Card.Content>
              <Card.Actions>
                <Button
                  style={styles.button}
                  mode="contained"
                  onPress={() => navigation.navigate("BookNow")}
                >
                  Book Now
                </Button>
              </Card.Actions>
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
              <Card.Actions>
                <Button
                  style={styles.button}
                  mode="contained"
                  onPress={() => navigation.navigate("WorkOutPlan")}
                >
                  Book Now
                </Button>
              </Card.Actions>
            </Card>
            <Card style={styles.card}>
              <Card.Cover source={require("../../assets/images/gymi.jpg")} />
              <Card.Content>
                <Title>DietPlan</Title>
                <Paragraph>Audio, Video & Text</Paragraph>
              </Card.Content>
              <Card.Actions>
                <Button
                  style={styles.button}
                  mode="contained"
                  onPress={() => navigation.navigate("DietPlan")}
                >
                  Book Now
                </Button>
              </Card.Actions>
            </Card>
            <Card style={styles.card}>
              <Card.Cover source={require("../../assets/images/gymi.jpg")} />
              <Card.Content>
                <Title>Body Building</Title>
                <Paragraph>Audio, Video & Text</Paragraph>
              </Card.Content>
              <Card.Actions>
                <Button
                  style={styles.button}
                  mode="contained"
                  onPress={() => navigation.navigate("BookNow")}
                >
                  Book Now
                </Button>
              </Card.Actions>
            </Card>
          </View>
        </ScrollView>
      </ScrollView>
      <Snackbar
        visible={visible1}
        onDismiss={onDismissSnackBar1}
        duration={Snackbar.DURATION_SHORT}
      >
        Notifications
      </Snackbar>
      {/* <Snackbar
        visible={visible2}
        onDismiss={onDismissSnackBar2}
        duration={Snackbar.DURATION_SHORT}
      >
        Profile
      </Snackbar> */}
    </View>
  );
};

const BookNowScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Book Now" titleStyle={styles.appbarTitle} />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Choose Your Plan</Text>
        <ScrollView horizontal contentContainerStyle={styles.cardsContainer}>
          <View style={styles.cards}>
            <Card style={styles.card}>
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

            <Card style={styles.card}>
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
  card: {
    width: 250,
    marginHorizontal: 6,
  },
});

export default Homepage;
