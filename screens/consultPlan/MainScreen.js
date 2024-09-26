// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { ScrollView } from "react-native-gesture-handler";
// // import axios from "axios";
// // import * as SecureStore from "expo-secure-store";

// const plans = [
//   {
//     title: "Apointment",
//     subtitle: "Free Diet Plan, Free Workout Plan",
//     key: "apointment",
//     image: require("../../assets/images/gyma1.jpg"),
//   },
// ];

// const MainScreen = () => {
//   const navigation = useNavigation();

//   return (
//     <ScrollView style={styles.container}>
//       {plans.map((plan) => (
//         <View key={plan.key} style={styles.card}>
//           <Image
//             // source={require("../../assets/images/gyma1.jpg")}
//             source={plan.image}
//             style={styles.cardImage}
//           />
//           <View style={styles.cardContent}>
//             <Text style={styles.cardTitle}>{plan.title}</Text>
//             <Text style={styles.cardSubtitle}>{plan.subtitle}</Text>
//             <TouchableOpacity
//               style={styles.button}
//               onPress={() =>
//                 navigation.navigate("Schedule", { plan: plan.title })
//               }
//             >
//               <Text style={styles.buttonText}>Book Now</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       ))}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f8f9fa",
//     paddingTop: 20,
//     paddingHorizontal: 15,
//   },
//   card: {
//     backgroundColor: "#fff",
//     marginBottom: 20,
//     borderRadius: 10,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   cardImage: {
//     width: "100%",
//     height: 150,
//     borderTopLeftRadius: 10,
//     borderTopRightRadius: 10,
//   },
//   cardContent: {
//     padding: 20,
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   cardSubtitle: {
//     fontSize: 14,
//     color: "#6c757d",
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: "#ffc107",
//     paddingVertical: 10,
//     borderRadius: 5,
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//   },
// });

// export default MainScreen;

//with razorpay compo

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import DateTimePicker from "@react-native-community/datetimepicker";
import RazorpayCheckout from "react-native-razorpay";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { API_URL, RAZOR_PAY_KEY_ID } from "@env";

const ConsultantSchedulingCard = ({ title, price }) => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [zoomMeetingLink, setZoomMeetingLink] = useState("");
  const [user, setUser] = useState("");
  const [username, setUsername] = useState("User");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

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
      .format("HH:mm");

    setTime(nextHalfHour);
  };

  const getToken = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      return token;
    } catch (error) {
      console.error("Error retrieving token:", error);
      throw error;
    }
  };

  const getId = async () => {
    try {
      const id = await SecureStore.getItemAsync("userid");
      setUser(id || "");
      return id;
    } catch (error) {
      console.error("Error retrieving ID:", error);
      throw error;
    }
  };

  const getName = async () => {
    try {
      const name = await SecureStore.getItemAsync("username");
      setUsername(name || "User");
      return name;
    } catch (error) {
      console.error("Error retrieving name:", error);
      throw error;
    }
  };

  const getEmail = async () => {
    try {
      const emailValue = await SecureStore.getItemAsync("email");
      return emailValue;
    } catch (error) {
      console.error("Error retrieving email:", error);
      throw error;
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setTime(moment(selectedTime).format("HH:mm"));
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

    try {
      const token = await getToken();
      const id = await getId();

      const response = await axios.post(
        `${API_URL}/appoints?filters[users_permissions_users].[id].[$eq]=${id}&populate=*`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      // Store appointment data securely
      await SecureStore.setItemAsync(
        "appointmentId",
        response.data.id.toString()
      );
      await SecureStore.setItemAsync(
        "appointmentLink",
        response.data.zoomMeetingLink.toString()
      );

      // Show success alert and navigate to Homepage
      Alert.alert("Success", "Appointment posted successfully", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Homepage"),
        },
      ]);
    } catch (error) {
      console.error("Error:", error.message);
      Alert.alert("Error", "Failed to post appointment");
    }
  };

  const handlePayNow = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      const name = await getName();
      const email = await getEmail();

      const TotalAmount = price; // Amount in INR
      const options = {
        description: "Payment for Appointment",
        image: require("../../assets/images/adaptive-icon.png"),
        currency: "INR",
        key: RAZOR_PAY_KEY_ID,
        amount: TotalAmount * 100,
        name: "Zerodope",
        prefill: {
          email: email || "test@example.com",
          name: name || "Test User",
        },
        theme: { color: "#FAB917" },
      };

      const data = await RazorpayCheckout.open(options);
      // console.log("Payment ID:", data.razorpay_payment_id);

      // Save successful payment ID to SecureStore
      await SecureStore.setItemAsync("paymentId", data.razorpay_payment_id);

      // Payment successful, post the appointment
      await handlePostAppointment();
    } catch (error) {
      console.error("Payment Error:", error.message);
      Alert.alert("Error", "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.card}>
      <Image
        source={require("../../assets/images/place.jpg")}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>₹{price}</Text>

        <Text style={styles.label}>Date</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <TextInput
            style={styles.input}
            placeholder="Select Date"
            value={moment(date).format("DD/MM/YYYY")}
            editable={false}
          />
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <Text style={styles.label}>Time</Text>
        <TouchableOpacity onPress={() => setShowTimePicker(true)}>
          <TextInput
            style={styles.input}
            placeholder="Select Time"
            value={time}
            editable={false}
          />
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={moment(time, "HH:mm").toDate()}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={handleTimeChange}
          />
        )}

        <TouchableOpacity style={styles.button} onPress={handlePayNow}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Pay Now</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const MainScreen = () => {
  return (
    <ScrollView horizontal style={styles.container}>
      <ConsultantSchedulingCard title="One time@999/- Only" price="999" />
      <ConsultantSchedulingCard title="Quarterly Payment" price="3000" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  card: {
    width: 300,
    height: 500,
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    color: "#333",
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  input: {
    backgroundColor: "#fef08a",
    borderRadius: 4,
    padding: 10,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#f59e0b",
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MainScreen;
