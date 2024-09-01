import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import moment from "moment";

const AppointUpdate = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [zoomMeetingLink, setZoomMeetingLink] = useState("");
  const [user, setUser] = useState("");
  const [username, setUsername] = useState("User");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [appointmentId, setAppointmentId] = useState(null);

  useEffect(() => {
    const initializeData = async () => {
      await getId();
      await getName();
      await fetchAppointmentData();
      suggestTime();
    };

    initializeData();
  }, []);

  const suggestTime = () => {
    const currentMinute = moment().minute();
    const nextHalfHour = moment()
      .add(30 - (currentMinute % 30), "minutes")
      .startOf("minute")
      .format("HH:mm"); // Changed format to HH:mm

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
      setUser(id || "");
      return id;
    } catch (error) {
      console.error("Error retrieving ID:", error);
    }
  };

  const getName = async () => {
    try {
      const name = await SecureStore.getItemAsync("username");
      setUsername(name || "User");
    } catch (error) {
      console.error("Error retrieving name:", error);
    }
  };

  const fetchAppointmentData = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      const id = await getId();
      const response = await axios.get(
        `https://beta.zerodope.in/api/appoints?filters[users_permissions_users][id][$eq]=${id}&populate=*`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && Array.isArray(response.data)) {
        const appointmentData = response.data[0];

        if (appointmentData) {2
          const { id, date, time, zoomMeetingLink, user } = appointmentData;
          setAppointmentId(user.id);
          console.log(appointmentId);
          setDate(new Date(date));
          setTime(time.slice(0, 5)); // Remove seconds from the time
          setZoomMeetingLink(zoomMeetingLink);
          setUser(user);
        } else {
          Alert.alert("Error", "No appointment data found for the user.");
        }
      } else {
        Alert.alert("Error", "Invalid response format.");
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching appointment:", error);
      Alert.alert("Error", "Failed to fetch appointment data");
      setLoading(false);
    }
  };

  const handleUpdateAppointment = async () => {
    if (!appointmentId) {
      Alert.alert("Error", "No appointment ID available for update.");
      return;
    }

    const updatedData = {
      data: {
        date: moment(date).format("YYYY-MM-DD"),
        time,
        zoomMeetingLink,
        user,
      },
    };

    try {
      const token = await getToken();
      const response = await axios.put(
        `https://beta.zerodope.in/api/appoints/${appointmentId}`, // Use the appointment ID for the PUT request
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Alert.alert("Success", "Appointment updated successfully");
    } catch (error) {
      console.error("Error updating appointment:", error);
      Alert.alert("Error", "Failed to update appointment");
    }
  };

  const renderTimeOptions = () => {
    const times = [];
    for (let i = 0; i < 24; i++) {
      times.push(`${i.toString().padStart(2, "0")}:00`);
      times.push(`${i.toString().padStart(2, "0")}:30`);
    }
    return times.map((timeOption) => (
      <Picker.Item key={timeOption} label={timeOption} value={timeOption} />
    ));
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#FAB917" />
      ) : (
        <>
          <Text style={styles.label}>Date:</Text>
          <View style={styles.dateButtonContainer}>
            <Button
              onPress={() => setShowDatePicker(true)}
              title={moment(date).format("YYYY-MM-DD")}
            />
          </View>

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

          <Text style={styles.label}>Time (24 hours format) :</Text>
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

          <TouchableOpacity
            style={styles.btn}
            onPress={handleUpdateAppointment}
          >
            <Text style={styles.btnText}>Update Appointment</Text>
          </TouchableOpacity>
        </>
      )}
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
  dateButtonContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginBottom: 12,
    overflow: "hidden",
  },
});

export default AppointUpdate;
