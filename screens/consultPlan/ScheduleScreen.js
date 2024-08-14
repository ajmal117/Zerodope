import React, { useState,useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const ScheduleScreen = ({ route }) => {
  const { plan } = route.params;
  const [selectedDay, setSelectedDay] = useState(null);

  const handleDayPress = (day) => {
    setSelectedDay(day);
    Alert.alert(
      "Consultation Scheduled",
      `You have scheduled an ${plan} on ${day}.`
    );
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>{plan}</Text>
      {days.map((day, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.dayButton,
            selectedDay === day && styles.selectedDayButton,
          ]}
          onPress={() => handleDayPress(day)}
        >
          <Text style={styles.dayText}>{day}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  dayButton: {
    backgroundColor: "#6c757d",
    padding: 15,
    margin: 5,
    borderRadius: 10,
    width: "70%",
    alignItems: "center",
  },
  selectedDayButton: {
    backgroundColor: "#28a745",
  },
  dayText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default ScheduleScreen;
