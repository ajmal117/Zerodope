// import React, { useEffect, useRef } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Animated,
//   TouchableOpacity,
// } from "react-native";

// const ActivityCard = ({ activity, index, navigation, paid, apointMent }) => {
//   // const scaleAnim = useRef(new Animated.Value(1)).current;

//   const handlePress = () => {
//     if (activity.name === "Free Support") {
//       navigation.navigate("FreeSupport");
//     } else if (activity.name === "Consultation Scheduling") {
//       navigation.navigate(activity.component);
//     } else {
//       const destination = paid ? activity.component : "BookNow";
//       navigation.navigate(destination);
//     }
//   };

//   // useEffect(() => {
//   //   Animated.loop(
//   //     Animated.sequence([
//   //       Animated.timing(scaleAnim, {
//   //         toValue: 1.1,
//   //         duration: 1000,
//   //         useNativeDriver: true,
//   //       }),
//   //       Animated.timing(scaleAnim, {
//   //         toValue: 1,
//   //         duration: 1000,
//   //         useNativeDriver: true,
//   //       }),
//   //     ])
//   //   ).start();
//   // }, [scaleAnim]);

//   return (
//     <TouchableOpacity style={{ flex: 1 }} onPress={handlePress}>
//       <View
//         style={[
//           styles.card,
//           { backgroundColor: activity.color },
//           // index === 1 && { transform: [{ scale: scaleAnim }] },
//         ]}
//       >
//         <Text style={styles.icon}>{activity.icon}</Text>
//         <Text style={styles.title}>{activity.name}</Text>
//         <Text style={styles.text}>{activity.text}</Text>
//         <Text
//           style={[
//             styles.bookNowText,
//             activity.name === "Free Support"
//               ? { color: "green" }
//               : !paid
//               ? { color: "red" }
//               : { color: "green" },
//           ]}
//         >
//           {activity.name === "Free Support"
//             ? "Open Now"
//             : paid
//             ? "Open Now"
//             : "Book Now"}
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );
// };

// export default ActivityCard;

// const styles = StyleSheet.create({
//   card: {
//     flex: 1,
//     width:190,
//     height: 110,
//     // marginVertical: 12,
//     paddingHorizontal: 7,
//     paddingVertical: 15,
//     borderRadius: 5,
//     // width: "86%",
//     alignItems: "center",
//     marginEnd: 12,
//     marginBottom: 14,
//   },
//   icon: {
//     // fontSize: 40,
//     width: 37,
//     height: 29,
//     // marginBottom: 15,
//     textAlign: "center",
//   },
//   title: {
//     fontSize: 10,
//     fontWeight: "700",
//     lineHeight: 15,
//     // marginBottom: 15,
//     textAlign: "center",
//   },
//   text: {
//     fontSize: 8,
//     fontWeight: "300",
//     color: "#403737",
//     textAlign: "center",
//     lineHeight: 12,
//   },
//   bookNowText: {
//     marginTop: 5,
//     textAlign: "center",
//     fontSize: 8,
//     fontWeight: "700",
//   },
// });

//payment paid

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as SecureStore from "expo-secure-store";

const ActivityCard = ({ activity, index, navigation, paid, apointMent }) => {
  const [paymentId, setPaymentId] = useState(null);

  // Retrieve paymentId from SecureStore when the component mounts
  useEffect(() => {
    const getPaymentId = async () => {
      try {
        const storedPaymentId = await SecureStore.getItemAsync("paymentId");
        if (storedPaymentId) {
          setPaymentId(storedPaymentId);
        }
      } catch (error) {
        console.error("Error retrieving paymentId:", error);
      }
    };

    getPaymentId();
  }, []);

  const handlePress = () => {
    if (activity.name === "Free Support") {
      navigation.navigate("FreeSupport");
    } else if (activity.name === "Consultation Scheduling") {
      navigation.navigate(activity.component);
    } else {
      const destination = paid ? activity.component : "BookNow";
      navigation.navigate(destination);
    }
  };

  const getTextColor = () => {
    if (activity.name === "Free Support") {
      return { color: "green" };
    } else if (activity.name === "Consultation Scheduling") {
      // If the paymentId exists or it's marked as paid, show green text
      if (paymentId || paid) {
        return { color: "green" };
      } else {
        return { color: "red" };
      }
    } else if (!paid && !paymentId) {
      return { color: "red" };
    } else {
      return { color: "green" };
    }
  };

  return (
    <TouchableOpacity style={{ flex: 1 }} onPress={handlePress}>
      <View style={[styles.card, { backgroundColor: activity.color }]}>
        <Text style={styles.icon}>{activity.icon}</Text>
        <Text style={styles.title}>{activity.name}</Text>
        <Text style={styles.text}>{activity.text}</Text>
        <Text style={[styles.bookNowText, getTextColor()]}>
          {activity.name === "Free Support"
            ? "Open Now"
            : activity.name === "Consultation Scheduling" && paymentId
            ? "Paid"
            : paid
            ? "Open Now"
            : "Book Now"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ActivityCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    width: 190,
    height: 110,
    paddingHorizontal: 7,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    marginEnd: 12,
    marginBottom: 14,
  },
  icon: {
    width: 37,
    height: 29,
    textAlign: "center",
  },
  title: {
    fontSize: 10,
    fontWeight: "700",
    lineHeight: 15,
    textAlign: "center",
  },
  text: {
    fontSize: 8,
    fontWeight: "300",
    color: "#403737",
    textAlign: "center",
    lineHeight: 12,
  },
  bookNowText: {
    marginTop: 5,
    textAlign: "center",
    fontSize: 8,
    fontWeight: "700",
  },
});
