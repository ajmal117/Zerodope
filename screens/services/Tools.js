import * as React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const ToolButton = ({ iconName, label }) => (
  <Card style={styles.card}>
    <Button
      mode="contained"
      contentStyle={styles.buttonContent}
      labelStyle={styles.buttonLabel}
      style={styles.button}
      icon={() => <Icon name={iconName} size={30} color="#000" />}
    >
      {label}
    </Button>
  </Card>
);

const ToolsComponent = () => (
  <View style={styles.container}>
    <View style={styles.toolHeader}>
      <Text style={styles.toolText}>Tools</Text>
    </View>
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ToolButton iconName="chart-line" label="Progress & Insights" />
      <ToolButton iconName="heart" label="HealthKit" />
      <ToolButton iconName="food-apple" label="Diet tool" />
      <ToolButton iconName="dumbbell" label="Training tool" />
      <ToolButton iconName="calculator" label="BMR Calculator" />
      <ToolButton iconName="human-male-height" label="Body Fat Calculator" />
      <ToolButton iconName="target" label="Goal Calculator" />
      <ToolButton iconName="food-turkey" label="Macro Calculator" />
      <ToolButton iconName="fire" label="Calorie Calculator" />
      <ToolButton iconName="weight-lifter" label="1RM Calculator" />
      <ToolButton iconName="bell" label="Reminders" />
      {/* Add more buttons for additional tools */}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  toolHeader: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10, // Reduced the gap between the header and the tools
  },
  toolText: {
    fontSize: 18, // Increased font size
    fontWeight: "bold",
  },
  scrollContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 15,
  },
  card: {
    width: "48%", // Adjusted to ensure two cards per line with space between
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
    backgroundColor: "#fff",
  },
  button: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "yellow", // Lighter dark border color
    backgroundColor: "#f0f0f0", // Light button color
  },
  buttonContent: {
    flexDirection: "row-reverse", // Put the icon at the right side
  },
  buttonLabel: {
    color: "#000", // Text color
  },
});

export default ToolsComponent;
