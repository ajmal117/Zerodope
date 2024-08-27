// import React, { useState,useEffect } from "react";
// import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
// import axios from "axios";
// import * as SecureStore from "expo-secure-store";

// const days = [
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
// ];

// const ScheduleScreen = ({ route }) => {
//   const { plan } = route.params;
//   const [selectedDay, setSelectedDay] = useState(null);

//   const handleDayPress = (day) => {
//     setSelectedDay(day);
//     Alert.alert(
//       "Consultation Scheduled",
//       `You have scheduled an ${plan} on ${day}.`
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{plan}</Text>
//       {days.map((day, index) => (
//         <TouchableOpacity
//           key={index}
//           style={[
//             styles.dayButton,
//             selectedDay === day && styles.selectedDayButton,
//           ]}
//           onPress={() => handleDayPress(day)}
//         >
//           <Text style={styles.dayText}>{day}</Text>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f8f9fa",
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
//   dayButton: {
//     backgroundColor: "#6c757d",
//     padding: 15,
//     margin: 5,
//     borderRadius: 10,
//     width: "70%",
//     alignItems: "center",
//   },
//   selectedDayButton: {
//     backgroundColor: "#28a745",
//   },
//   dayText: {
//     color: "#fff",
//     fontSize: 18,
//   },
// });

// export default ScheduleScreen;




import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput, // Import TextInput
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import moment from "moment"; // Import moment for date and time handling

const ScheduleScreen = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [zoomMeetingLink, setZoomMeetingLink] = useState("");
  const [user, setUser] = useState("");
  const [username, setUsername] = useState("User"); // Default username
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const initializeData = async () => {
      await getId();
      await getName();
      suggestTime();
    };

    initializeData();
  }, []);

  const suggestTime = () => {
    
    const currentMinute = moment().minute();
    const nextHalfHour = moment()
      .add(30 - (currentMinute % 30), "minutes")
      .startOf("minute")
      .format("HH:mm:ss.SSS"); // Include milliseconds

    setTime(nextHalfHour);
  };

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
      setUser(id || ""); // Update user field with retrieved ID
    } catch (error) {
      console.error("Error retrieving ID:", error);
    }
  };

  const getName = async () => {
    try {
      const name = await SecureStore.getItemAsync("username");
      setUsername(name || "User"); // Provide a default value in case name is null
    } catch (error) {
      console.error("Error retrieving name:", error);
    }
  };
  const handlePostAppointment = async () => {
    const postData = {
      data: {
        date: moment(date).format("YYYY-MM-DD"),
        time,
        zoomMeetingLink,
        user,
      },
    };

    console.log(postData); // Log postData to check the structure

    try {
      const token = await getToken();
      const response = await axios.post(
        "https://beta.zerodope.in/api/appoints?filters[users_permissions_users].[id].[$eq]=2&populate=*",
        postData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Alert.alert("Success", "Appointment posted successfully");
      console.log(response.data);
    } catch (error) {
      console.error("Error posting appointment:", error);
      Alert.alert("Error", "Failed to post appointment");
    }
  };

  // Function to render time options in half-hour increments

  const renderTimeOptions = () => {
    const times = [];
    for (let i = 0; i < 24; i++) {
      times.push(`${i.toString().padStart(2, "0")}:00:00.000`);
      times.push(`${i.toString().padStart(2, "0")}:30:00.000`);
    }
    return times.map((timeOption) => (
      <Picker.Item key={timeOption} label={timeOption} value={timeOption} />
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Date:</Text>
      <Button
        onPress={() => setShowDatePicker(true)}
        title={moment(date).format("YYYY-MM-DD")}
      />

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setDate(selectedDate);
            }
          }}
        />
      )}

      <Text style={styles.label}>Time:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={time}
          onValueChange={(itemValue) => setTime(itemValue)}
        >
          {renderTimeOptions()}
        </Picker>
      </View>

      <Text style={styles.label}>Zoom Meeting Link:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Zoom meeting link"
        value={zoomMeetingLink}
        onChangeText={setZoomMeetingLink}
      />

      <Text style={styles.label}>User (ID or name):</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter user ID or name"
        value={user}
        onChangeText={setUser}
      />

      <TouchableOpacity style={styles.btn} onPress={handlePostAppointment}>
        <Text style={styles.btnText}>Post Appointment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  btn: {
    backgroundColor: "#FAB917",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  pickerContainer: {
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    borderRadius: 4,
    overflow: "hidden",
  },
});

export default ScheduleScreen;
