import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Linking,
} from "react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const { width } = Dimensions.get("window");

const AppointCard = () => {
  const [timeRemaining, setTimeRemaining] = useState("");
  const [appointmentTime, setAppointmentTime] = useState(null);
  const [zoomMeetingLink, setZoomMeetingLink] = useState("");
  const [isCardVisible, setIsCardVisible] = useState(true); // New state to control visibility

  const getToken = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      return token;
    } catch (error) {
      console.error("Error retrieving token:", error);
    }
  };

  const getId = async () => {
    try {
      const id = await SecureStore.getItemAsync("userid");
      return id || "";
    } catch (error) {
      console.error("Error retrieving ID:", error);
    }
  };

  useEffect(() => {
    const fetchAppointmentData = async () => {
      try {
        const token = await getToken();
        const id = await getId();

        if (id && token) {
          const response = await axios.get(
            `https://beta.zerodope.in/api/appoints?filters[users_permissions_users].[id][$eq]=${id}&populate=*`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log("API Response:", response.data);

          if (response.data && response.data.length > 0) {
            const appointmentData = response.data[0];
            const appointmentDateTime = new Date(
              `${appointmentData.date}T${appointmentData.time}`
            );

            setAppointmentTime(appointmentDateTime.toISOString());
            setZoomMeetingLink(appointmentData.zoomMeetingLink);
            setIsCardVisible(true); // Show the card when appointment data is found
          } else {
            console.log("No appointment data found.");
            setIsCardVisible(false); // Hide the card if no data is found
          }
        }
      } catch (error) {
        console.error("Error fetching appointment data:", error);
        setIsCardVisible(false); // Hide the card if an error occurs
      }
    };

    fetchAppointmentData();
  }, []);

  useEffect(() => {
    if (!appointmentTime) return;

    const calculateTimeRemaining = () => {
      const now = new Date();
      const appointmentDate = new Date(appointmentTime);
      const difference = appointmentDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      } else {
        setTimeRemaining("Time to join the appointment! Tap to join.");
      }
    };

    const timer = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(timer);
  }, [appointmentTime]);

  const handlePress = () => {
    if (
      zoomMeetingLink &&
      timeRemaining === "Time to join the appointment! Tap to join."
    ) {
      Linking.openURL(zoomMeetingLink);
    }
  };

  if (!isCardVisible) return null; // Return null to hide the component if no data

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={timeRemaining !== "Time to join the appointment! Tap to join."}
    >
      <View style={styles.card}>
        <Text
          style={[
            styles.timerText,
            timeRemaining === "Time to join the appointment! Tap to join." &&
              styles.joinNowText,
          ]}
        >
          {timeRemaining === "Time to join the appointment! Tap to join."
            ? "Join the appointment right now"
            : `Appointment starts in : ${timeRemaining}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width * 0.93,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 10,
  },
  timerText: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  joinNowText: {
    color: "#1e90ff", // Change to your preferred color
    fontSize: 14, // Optionally increase the font size
  },
});

export default AppointCard;
