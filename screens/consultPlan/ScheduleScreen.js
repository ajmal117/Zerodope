// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   Button,
//   StyleSheet,
//   Alert,
//   TouchableOpacity,
//   ActivityIndicator,
// } from "react-native";
// import axios from "axios";
// import * as SecureStore from "expo-secure-store";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import { Picker } from "@react-native-picker/picker";
// import moment from "moment";
// import { useNavigation } from "@react-navigation/native"; // Import useNavigation
// import { API_URL, API_KEY } from "@env";

// const ScheduleScreen = () => {
//   const [date, setDate] = useState(new Date());
//   const [time, setTime] = useState("");
//   const [zoomMeetingLink, setZoomMeetingLink] = useState("");
//   const [user, setUser] = useState("");
//   const [username, setUsername] = useState("User");
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [loading, setLoading] = useState(false); // Loading state for the button

//   const navigation = useNavigation(); // Initialize navigation

//   useEffect(() => {
//     const initializeData = async () => {
//       try {
//         await getId();
//         await getName();
//         suggestTime();
//       } catch (error) {
//         console.error("Error initializing data:", error);
//       }
//     };

//     initializeData();
//   }, []);

//   const suggestTime = () => {
//     const currentMinute = moment().minute();
//     const nextHalfHour = moment()
//       .add(30 - (currentMinute % 30), "minutes")
//       .startOf("minute")
//       .format("HH:mm"); // Updated to "HH:mm" format

//     setTime(nextHalfHour);
//   };

//   const getToken = async () => {
//     try {
//       const token = await SecureStore.getItemAsync("token");
//       return token;
//     } catch (error) {
//       console.error("Error retrieving token:", error);
//       throw error; // Re-throw error to handle it upstream
//     }
//   };

//   const getId = async () => {
//     try {
//       const id = await SecureStore.getItemAsync("userid");
//       setUser(id || "");
//       return id;
//     } catch (error) {
//       console.error("Error retrieving ID:", error);
//       throw error; // Re-throw error to handle it upstream
//     }
//   };

//   const getName = async () => {
//     try {
//       const name = await SecureStore.getItemAsync("username");
//       setUsername(name || "User");
//     } catch (error) {
//       console.error("Error retrieving name:", error);
//       throw error; // Re-throw error to handle it upstream
//     }
//   };

//   const handlePostAppointment = async () => {
//     setLoading(true); // Show the loader when the appointment is being posted

//     const postData = {
//       data: {
//         date: moment(date).format("YYYY-MM-DD"),
//         time,
//         zoomMeetingLink,
//         user,
//       },
//     };

//     console.log(postData); // Log postData to check the structure

//     try {
//       const token = await getToken();
//       const id = await getId();
//       console.log("appoint me used id", id);
//       const response = await axios.post(
//         `${API_URL}/appoints?filters[users_permissions_users].[id].[$eq]=${id}&populate=*`,
//         postData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       Alert.alert("Success", "Appointment posted successfully", [
//         {
//           text: "OK",
//           onPress: () => navigation.navigate("Homepage"), // Navigate to Home on alert OK press
//         },
//       ]);

//       console.log(response.data);
//       await SecureStore.setItemAsync(
//         "appointmentId",
//         response.data.id.toString()
//       );
//       console.log(response.data.zoomMeetingLink);
//       await SecureStore.setItemAsync(
//         "appointmentLink",
//         response.data.zoomMeetingLink.toString()
//       );
//     } catch (error) {
//       console.error("Error posting appointment:", error.message);
//       Alert.alert("Error", "Failed to post appointment", error.message);
//     } finally {
//       setLoading(false); // Hide the loader after the appointment is posted
//     }
//   };

//   const renderTimeOptions = () => {
//     const times = [];
//     for (let i = 0; i < 24; i++) {
//       times.push(`${i.toString().padStart(2, "0")}:00`);
//       times.push(`${i.toString().padStart(2, "0")}:30`);
//     }
//     return times.map((timeOption) => (
//       <Picker.Item key={timeOption} label={timeOption} value={timeOption} />
//     ));
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>Date:</Text>

//       <View style={styles.dateButtonContainer}>
//         <Button
//           onPress={() => setShowDatePicker(true)}
//           title={moment(date).format("YYYY-MM-DD")}
//         />
//       </View>

//       {showDatePicker && (
//         <DateTimePicker
//           value={date}
//           mode="date"
//           display="default"
//           onChange={(event, selectedDate) => {
//             setShowDatePicker(false);
//             if (selectedDate) {
//               setDate(selectedDate);
//             }
//           }}
//         />
//       )}

//       <Text style={styles.label}>Time (24 hours format):</Text>
//       <View style={styles.pickerContainer}>
//         <Picker
//           selectedValue={time}
//           onValueChange={(itemValue) => setTime(itemValue)}
//         >
//           {renderTimeOptions()}
//         </Picker>
//       </View>

//       {/* <Text style={styles.label}>Zoom Meeting Link:</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter Zoom meeting link"
//         value={zoomMeetingLink}
//         onChangeText={setZoomMeetingLink}
//       /> */}

//       <TouchableOpacity
//         style={styles.btn}
//         onPress={handlePostAppointment}
//         disabled={loading} // Disable button while loading
//       >
//         {loading ? ( // Show loader or button text based on loading state
//           <ActivityIndicator size="small" color="#fff" />
//         ) : (
//           <Text style={styles.btnText}>Post Appointment</Text>
//         )}
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#fff",
//   },
//   btn: {
//     backgroundColor: "#FAB917",
//     padding: 10,
//     borderRadius: 5,
//     alignItems: "center",
//     marginVertical: 4,
//   },
//   btnText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   label: {
//     marginBottom: 8,
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   pickerContainer: {
//     borderColor: "#ccc",
//     borderWidth: 1,
//     marginBottom: 12,
//     borderRadius: 4,
//     overflow: "hidden",
//   },
//   dateButtonContainer: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 4,
//     marginBottom: 12,
//     overflow: "hidden",
//   },
// });

// export default ScheduleScreen;

// // with razor pay

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
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
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import RazorpayCheckout from "react-native-razorpay"; // Razorpay SDK
import { RAZOR_PAY_KEY_ID } from "@env";

const ScheduleScreen = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [zoomMeetingLink, setZoomMeetingLink] = useState("");
  const [user, setUser] = useState("");
  const [username, setUsername] = useState("User");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for the button

  const navigation = useNavigation(); // Initialize navigation

  useEffect(() => {
    const initializeData = async () => {
      try {
        await getId();
        await getName();
        await getEmail();
        suggestTime();
      } catch (error) {
        console.error("Error initializing data:", error);
      }
    };

    initializeData();
  }, []);

  const suggestTime = () => {
    const currentMinute = moment().minute();
    const nextHalfHour = moment()
      .add(30 - (currentMinute % 30), "minutes")
      .startOf("minute")
      .format("HH:mm"); // Updated to "HH:mm" format

    setTime(nextHalfHour);
  };

  const getToken = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      return token;
    } catch (error) {
      console.error("Error retrieving token:", error);
      throw error; // Re-throw error to handle it upstream
    }
  };

  const getId = async () => {
    try {
      const id = await SecureStore.getItemAsync("userid");
      setUser(id || "");
      return id;
    } catch (error) {
      console.error("Error retrieving ID:", error);
      throw error; // Re-throw error to handle it upstream
    }
  };

  const getName = async () => {
    try {
      const name = await SecureStore.getItemAsync("username");
      setUsername(name || "User");
      return name;
    } catch (error) {
      console.error("Error retrieving name:", error);
      throw error; // Re-throw error to handle it upstream
    }
  };
  const getEmail = async () => {
    try {
      const emailValue = await SecureStore.getItemAsync("email");
      return emailValue;
    } catch (error) {
      console.error("Error retrieving email:", error);
      throw error; // Re-throw error to handle it upstream
    }
  };

  const handlePostAppointment = async () => {
    setLoading(true); // Show the loader when the appointment is being posted

    const postData = {
      data: {
        date: moment(date).format("YYYY-MM-DD"),
        time,
        zoomMeetingLink,
        user,
      },
    };

    const openRazorpay = async () => {
      try {
        const token = await getToken();
        const id = await getId();
        const name = await getName();
        const email = await getEmail();

        const TotalAmount = 13; // Update with the total amount
        const options = {
          description: "Payment for Appointment",
          image: require("../../assets/images/adaptive-icon.png"), // Optional: add your logo URL here
          currency: "INR",
          key: RAZOR_PAY_KEY_ID, // Replace with your Razorpay Key ID
          amount: TotalAmount * 100, // Amount in paise (130 INR = 13000 paise)
          name: "Zerodope",
          prefill: {
            email: email || "test@example.com", // Prefill email if available, otherwise fallback
            contact: "", // Add the phone number if needed
            name: name || "Test User", // Prefill name if available
          },
          theme: { color: "#FAB917" }, // Customize the payment screen theme color
        };

        const data = await RazorpayCheckout.open(options);

        // Payment successful
        console.log("Payment ID:", data.razorpay_payment_id);

        // Post appointment data after payment success
        const response = await axios.post(
          `${API_URL}/appoints?filters[users_permissions_users].[id].[$eq]=${id}&populate=*`,
          postData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        Alert.alert("Success", "Appointment posted successfully", [
          {
            text: "OK",
            onPress: () => navigation.navigate("Homepage"), // Navigate to Home on alert OK press
          },
        ]);

        console.log(response.data);
        await SecureStore.setItemAsync(
          "appointmentId",
          response.data.id.toString()
        );
        await SecureStore.setItemAsync(
          "appointmentLink",
          response.data.zoomMeetingLink.toString()
        );
      } catch (error) {
        // Payment or appointment posting failed
        console.error("Error:", error.message);
        Alert.alert(
          "Error",
          "Failed to post appointment or payment",
          error.message
        );
      } finally {
        setLoading(false); // Hide the loader after the process
      }
    };

    openRazorpay(); // Call the Razorpay payment flow
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

      {/* <Text style={styles.label}>Zoom Meeting Link:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Zoom meeting link"
        value={zoomMeetingLink}
        onChangeText={setZoomMeetingLink}
      /> */}

      <TouchableOpacity
        style={styles.btn}
        onPress={handlePostAppointment}
        disabled={loading} // Disable button while loading
      >
        {loading ? ( // Show loader or button text based on loading state
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.btnText}>Post Appointment</Text>
        )}
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
    marginVertical: 4,
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

export default ScheduleScreen;
