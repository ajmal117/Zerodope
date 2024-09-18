// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { ScrollView } from "react-native-gesture-handler";
// import axios from "axios";
// import * as SecureStore from "expo-secure-store";

// const plans = [
//   {
//     title: "Power Lifting Plan",
//     subtitle: "Free Diet Plan, Free Workout Plan",
//     key: "powerLifting",
//     image: "../../assets/images/gyma.jpg",
//   },
//   {
//     title: "Diet Plan",
//     subtitle: "Free Diet Plan, Free Workout Plan",
//     key: "diet",
//     image: "../../assets/images/gyma.jpg",
//   },
//   {
//     title: "Body Building Plan",
//     subtitle: "Free Diet Plan, Free Workout Plan",
//     key: "bodyBuilding",
//     image: "../../assets/images/gyma.jpg",
//   },
// ];

// const MainScreen = () => {
//   const navigation = useNavigation();

//   return (
//     <ScrollView style={styles.container}>
//       {plans.map((plan) => (
//         <View key={plan.key} style={styles.card}>
//           <Image
//             source={require("../../assets/images/gyma.jpg")}
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

// without razor pay

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
// import axios from "axios";
// import * as SecureStore from "expo-secure-store";

const plans = [
  {
    title: "Apointment",
    subtitle: "Free Diet Plan, Free Workout Plan",
    key: "apointment",
    image: require("../../assets/images/gyma1.jpg"),
  },
];

const MainScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      {plans.map((plan) => (
        <View key={plan.key} style={styles.card}>
          <Image
            // source={require("../../assets/images/gyma1.jpg")}
            source={plan.image}
            style={styles.cardImage}
          />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{plan.title}</Text>
            <Text style={styles.cardSubtitle}>{plan.subtitle}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate("Schedule", { plan: plan.title })
              }
            >
              <Text style={styles.buttonText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  card: {
    backgroundColor: "#fff",
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  cardImage: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardContent: {
    padding: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#6c757d",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#ffc107",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default MainScreen;

// with razor pay

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   Alert,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { ScrollView } from "react-native-gesture-handler";
// import RazorpayCheckout from "react-native-razorpay"; // Razorpay SDK
// import { RAZOR_PAY_KEY_ID } from "@env";
// import * as SecureStore from "expo-secure-store"; // SecureStore for saving and retrieving data

// // Your plans array
// const plans = [
//   {
//     title: "Appointment",
//     subtitle: "For Diet Plan and Workout Plan",
//     key: "appointment",
//     image: require("../../assets/images/gyma1.jpg"),
//   },
// ];

// const MainScreen = () => {
//   const navigation = useNavigation();
  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");

  // useEffect(() => {
  //   // Retrieve username and email from SecureStore
  //   const getName = async () => {
  //     try {
  //       const name = await SecureStore.getItemAsync("username");
  //       if (name) {
  //         setUsername(name);
  //       }
  //     } catch (error) {
  //       console.error("Error retrieving name:", error);
  //     }
  //   };

    // const getEmail = async () => {
    //   try {
        // const emailValue = await SecureStore.getItemAsync("email");
    //     if (emailValue) {
    //       setEmail(emailValue);
    //     }
    //   } catch (error) {
    //     console.error("Error retrieving email:", error);
    //   }
    // };

  //   getName();
  //   getEmail();
  // }, []);

  // const TotalAmount = 18;

  // const openRazorpay = () => {
  //   var options = {
  //     description: "Payment for Appointment",
  //     image: require("../../assets/images/adaptive-icon.png"), // Optional: add your logo URL here
  //     currency: "INR",
  //     key: RAZOR_PAY_KEY_ID, // Replace with your Razorpay Key ID
  //     amount: TotalAmount * 100, // Amount in paise (130 INR = 13000 paise)
  //     name: "Zerodope",
  //     prefill: {
  //       email: email || "test@example.com", // Prefill email if available, otherwise fallback
  //       contact: "", // Add the phone number if needed
  //       name: username || "Test User", // Prefill name if available
  //     },
  //     theme: { color: "#FAB917" }, // Customize the payment screen theme color
  //   };

  //   RazorpayCheckout.open(options)
  //     .then((data) => {
  //       // Payment successful, handle response here
  //       Alert.alert(
  //         "Payment Successful",
  //         `Payment ID: ${data.razorpay_payment_id}`
  //       );
  //       navigation.navigate("Schedule", { plan: "Appointment" }); // Redirect to the schedule screen
  //     })
  //     .catch((error) => {
  //       // Payment failed, handle the error here
  //       Alert.alert(
  //         "Payment Failed",
  //         `Error: ${error.code} | ${error.description}`
  //       );
  //     });
  // };

//   return (
//     <ScrollView style={styles.container}>
//       {plans.map((plan) => (
//         <View key={plan.key} style={styles.card}>
//           <Image source={plan.image} style={styles.cardImage} />
//           <View style={styles.cardContent}>
//             <Text style={styles.cardTitle}>{plan.title}</Text>
//             <Text style={styles.cardSubtitle}>{plan.subtitle}</Text>
//             <TouchableOpacity style={styles.button} onPress={openRazorpay}>
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
