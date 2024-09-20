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
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "@env";




const AppointUpdate = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [user, setUser] = useState("");
  const [username, setUsername] = useState("User");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false); // Loader for fetching data
  const [updateLoading, setUpdateLoading] = useState(false); // Loader for update process
  const [appointmentId, setAppointmentId] = useState(null);

  const navigation = useNavigation();

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
      .format("HH:mm");

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

  const getAppointmentId = async () => {
    try {
      const id = await SecureStore.getItemAsync("appointmentId");
      setAppointmentId(id || "");
      return id;
    } catch (error) {
      console.error("Error retrieving appointment ID:", error);
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
      const appointmentId = await getAppointmentId();

      const response = await axios.get(
        `${API_URL}/appoints/${appointmentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        const appointmentData = response.data;
        const { date, time, user } = appointmentData;

        setDate(new Date(date));
        setTime(time.slice(0, 5));
        setUser(user);
      } else {
        Alert.alert("Error", "No appointment data found.");
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
        user,
      },
    };

    setUpdateLoading(true); // Start the update loader
    try {
      const token = await getToken();
      await axios.put(
        `${API_URL}/appoints/${appointmentId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Alert.alert("Success", "Appointment updated successfully", [
        {
          text: "OK",
          onPress: () => {
            setUpdateLoading(false); // Stop the update loader
            navigation.navigate("Homepage"); // Navigate to the home page on alert click
          },
        },
      ]);
    } catch (error) {
      console.error("Error updating appointment:", error);
      Alert.alert("Error", "Failed to update appointment");
      setUpdateLoading(false); // Stop the update loader in case of error
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

          <Text style={styles.label}>Time (24 hours format):</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={time}
              onValueChange={(itemValue) => setTime(itemValue)}
            >
              {renderTimeOptions()}
            </Picker>
          </View>

          <TouchableOpacity
            style={styles.btn}
            onPress={handleUpdateAppointment}
            disabled={updateLoading} // Disable the button when updating
          >
            {updateLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.btnText}>Update Appointment</Text>
            )}
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
