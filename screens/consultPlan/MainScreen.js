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

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { API_URL, API_KEY } from "@env";

// import axios from "axios";
// import * as SecureStore from "expo-secure-store";

const plans = [
  {
    title: "Apointment",
    subtitle: "For Diet Plan and Workout Plan",
    key: "apointment",
    image: require("../../assets/images/gyma1.jpg"),
  },
];

const MainScreen = () => {
  const navigation = useNavigation();

  console.log(API_URL);
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
