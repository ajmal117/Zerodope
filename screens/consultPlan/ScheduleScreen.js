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
      `You have scheduled a consultation for ${plan} on ${day}.`
    );
  };

  const getToken = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      // const token = await AsyncStorage.getItem("token");
      return token;
    } catch (error) {
      console.error("Error retrieving token:", error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const token = await getToken();
      console.log("Token:", token);
      try {
        const response = await axios.get(
          "https://beta.zerodope.in/api/consultation-timings?filters[users_permissions_users].[id].[$eq]=1&populate=*",
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const responseData = response.data;
        console.log(
          "Complete Response Data:",
          JSON.stringify(responseData, null, 2)
        );

        // Access the nested data
        if (responseData.data && responseData.data.length > 0) {
          const fetchedData = responseData.data.map((item) => {
            const { id, attributes } = item;
            return { id, attributes };
          });
          console.log("Fetched Data:", JSON.stringify(fetchedData, null, 2));
        } else {
          console.log("No data found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);

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
