import * as React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import {
  Appbar,
  Card,
  TextInput,
  Button,
  Text,
  Avatar,
} from "react-native-paper";

const CoachDetails = () => {
  const coaches = [
    {
      name: "Musaddiq Ismail",
      image: require("../../../assets/images/c1.jpg"),
      rating: 5,
      coachedPeople: 123,
      slotsAvailable: 2,
      level: "Starter",
    },
    {
      name: "Ramanuj",
      image: require("../../../assets/images/c2.jpg"),
      rating: 5,
      coachedPeople: 461,
      slotsAvailable: 2,
      level: "Basic",
    },
    {
      name: "Prashant Vyas",
      image: require("../../../assets/images/c3.jpg"),
      rating: 5,
      coachedPeople: 940,
      slotsAvailable: 2,
      level: "Standard",
    },
    {
      name: "Venkatesh Pakalapati",
      image: require("../../../assets/images/c4.jpg"),
      rating: 5,
      coachedPeople: 580,
      slotsAvailable: 2,
      level: "Standard",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <TextInput
        label="Find a coach"
        style={styles.searchInput}
        left={<TextInput.Icon name="magnify" />}
      />
      <Card style={styles.helpCard}>
        <Card.Content>
          <Text style={styles.helpText}>Need help?</Text>
          <Text>Speak to our experts</Text>
          <Button onPress={() => {}}>Get In Touch</Button>
        </Card.Content>
      </Card>
      <View style={styles.coachesContainer}>
        {coaches.map((coach, index) => (
          <Card key={index} style={styles.coachCard}>
            <Card.Content style={styles.coachContent}>
              <Avatar.Image size={80} source={coach.image} />
              <View style={styles.coachInfo}>
                <Button mode="outlined" style={styles.coachLevel}>
                  {coach.level}
                </Button>
                <Text style={styles.coachName}>{coach.name}</Text>
                <Text>⭐ {coach.rating} stars</Text>
                <Text>Coached {coach.coachedPeople} people</Text>
                <Text>{coach.slotsAvailable} slots available</Text>
              </View>
            </Card.Content>
          </Card>
        ))}
      </View>
      <Button mode="contained" style={styles.filterButton}>
        Filter
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  searchInput: {
    margin: 16,
    backgroundColor: "#ffffff",
    borderRadius: 8,
  },
  helpCard: {
    margin: 10,
    backgroundColor: "#ffffff",
    borderRadius: 8,
  },
  helpText: {
    fontWeight: "bold",
    color: "#000",
  },
  coachesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  coachCard: {
    width: "45%",
    margin: 8,
    backgroundColor: "#ffffff",
    borderRadius: 8,
  },
  coachContent: {
    alignItems: "center",
  },
  coachInfo: {
    alignItems: "center",
  },
  coachLevel: {
    marginTop: 8,
  },
  coachName: {
    fontWeight: "bold",
    marginTop: 8,
    color: "#000",
  },
  filterButton: {
    margin: 16,
    // backgroundColor: "#6200ee",
    backgroundColor: "#FAB917",
  },
});

export default CoachDetails;
