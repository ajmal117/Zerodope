import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const CountdownTimer = ({ endDate = "2024-12-31T23:59:59" }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function calculateTimeLeft() {
    const difference = new Date(endDate) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  return (
    <View style={styles.container}>
      <View style={styles.timeBox}>
        <Text style={styles.valueText}>
          {String(timeLeft.days).padStart(2, "0")}
        </Text>
        <Text style={styles.labelText}>Days</Text>
      </View>
      <View style={styles.timeBox}>
        <Text style={styles.valueText}>
          {String(timeLeft.hours).padStart(2, "0")}
        </Text>
        <Text style={styles.labelText}>Hours</Text>
      </View>
      <View style={styles.timeBox}>
        <Text style={styles.valueText}>
          {String(timeLeft.minutes).padStart(2, "0")}
        </Text>
        <Text style={styles.labelText}>Minutes</Text>
      </View>
      <View style={styles.timeBox}>
        <Text style={styles.valueText}>
          {String(timeLeft.seconds).padStart(2, "0")}
        </Text>
        <Text style={styles.labelText}>Seconds</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#003F51",
    borderRadius: 15,
    padding: 10,
  },
  timeBox: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: "#FFF",
    borderRadius: 10,
    alignItems: "center",
    padding: 10,
  },
  valueText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FF3B3B", // Customize the color to match the screenshot
  },
  labelText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF3B3B", // Customize the color to match the screenshot
  },
});

export default CountdownTimer;
