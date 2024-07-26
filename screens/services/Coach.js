import * as React from "react";
import { View, ScrollView, Image, StyleSheet } from "react-native";
import { Button, Text, Card, Title, Paragraph, List } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import CoachDetails from "../services/coachDetails/CoachDetails";
import coachPic from "../../assets/images/coach.jpg";

const Stack = createStackNavigator();

const CoachScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.time}></Text>
        <Button icon="headset" onPress={() => {}} style={styles.iconButton}>
          Talk to an expert
        </Button>
      </View>
      <Card style={styles.card}>
        <Card.Cover source={coachPic} />
        <Card.Content>
          <Title>Fitness Anytime, Anywhere!</Title>
          <Paragraph>Online Personal Training</Paragraph>
          <Paragraph>
            Reach your fitness goals & learn new skills...without leaving your
            home!
          </Paragraph>
        </Card.Content>
      </Card>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Fitness and Nutrition Coaching</Title>
          <List.Section>
            <List.Item
              title="Select From Internationally Certified Coaches"
              left={() => <List.Icon icon="check-circle" color="green" />}
            />
            <List.Item
              title="Personalised Diet and Workout Plans"
              left={() => <List.Icon icon="check-circle" color="green" />}
            />
            <List.Item
              title="Weekly Monitoring"
              left={() => <List.Icon icon="check-circle" color="green" />}
            />
            <List.Item
              title="Regular Plan Improvisation as per your Progress"
              left={() => <List.Icon icon="check-circle" color="green" />}
            />
            <List.Item
              title="Continuous Support - Coach is just a message or a phone call away"
              left={() => <List.Icon icon="check-circle" color="green" />}
            />
            <List.Item
              title="Unlimited Access to Healthy Recipes"
              left={() => <List.Icon icon="check-circle" color="green" />}
            />
          </List.Section>
        </Card.Content>
        <Card.Actions>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("CoachDetails")}
            style={styles.viewCoachesButton}
          >
            View Coaches
          </Button>
        </Card.Actions>
      </Card>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Online Personal Training Coach</Title>
          <List.Section>
            <List.Item
              title="1:1 Online Workout Session"
              left={() => <List.Icon icon="check-circle" color="green" />}
            />
            <List.Item
              title="5 days a week session - 45 minutes each."
              left={() => <List.Icon icon="check-circle" color="green" />}
            />
            <List.Item
              title="Weekly Monitoring"
              left={() => <List.Icon icon="check-circle" color="green" />}
            />
            <List.Item
              title="Regular Plan Improvisation as per your Progress"
              left={() => <List.Icon icon="check-circle" color="green" />}
            />
            <List.Item
              title="Continuous Support - Coach is just a message or a phone call away"
              left={() => <List.Icon icon="check-circle" color="green" />}
            />
            <List.Item
              title="Unlimited Access to Healthy Recipes"
              left={() => <List.Icon icon="check-circle" color="green" />}
            />
          </List.Section>
        </Card.Content>
        <Card.Actions>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("CoachDetails")}
            style={styles.viewCoachesButton}
          >
            View Coaches
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
};

const Coach = () => {
  return (
    <Stack.Navigator initialRouteName="CoachScreen">
      <Stack.Screen
        name="CoachScreen"
        component={CoachScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CoachDetails"
        component={CoachDetails}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    // backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  time: {
    color: "#fff",
    fontSize: 20,
  },
  iconButton: {
    color: "#fff",
    borderWidth: 1,
    borderColor: "#000",
  },
  card: {
    margin: 12,
    paddingBottom: 35,
  },
  viewCoachesButton: {
    marginTop: 1,
    backgroundColor: "green",
  },
});

export default Coach;
