// import React, { useState, useEffect, useCallback } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Dimensions,
//   TouchableOpacity,
//   Linking,
// } from "react-native";
// import axios from "axios";
// import * as SecureStore from "expo-secure-store";
// import { useNavigation, useFocusEffect } from "@react-navigation/native";

// const { width } = Dimensions.get("window");

// const AppointCard = () => {
//   const [timeRemaining, setTimeRemaining] = useState("");
//   const [appointmentTime, setAppointmentTime] = useState(null);
//   const [isCardVisible, setIsCardVisible] = useState(true);
//   const navigation = useNavigation();

//   const getToken = async () => {
//     try {
//       const token = await SecureStore.getItemAsync("token");
//       return token;
//     } catch (error) {
//       console.error("Error retrieving token:", error);
//     }
//   };

//   const getId = async () => {
//     try {
//       const id = await SecureStore.getItemAsync("userid");
//       return id;
//     } catch (error) {
//       console.error("Error retrieving ID:", error);
//     }
//   };

//   const getAppointmentId = async () => {
//     try {
//       const appointmentId = await SecureStore.getItemAsync("appointmentId");
//       return appointmentId;
//     } catch (error) {
//       console.error("Error retrieving appointment ID:", error);
//     }
//   };

//   const fetchAppointmentData = async () => {
//     const token = await getToken();
//     const id = await getId();
//     const appointmentId = await getAppointmentId();

//     if (!appointmentId) {
//       console.log("No appointment ID found.");
//       setIsCardVisible(false);
//       return;
//     }

//     if (id && token) {
//       try {
//         const response = await axios.get(
//           `https://beta.zerodope.in/api/appoints/${appointmentId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         console.log("API Response:", response.data);

//         if (response.data) {
//           const appointmentData = response.data;

//           if (appointmentData.date && appointmentData.time) {
//             const appointmentDateTime = new Date(
//               `${appointmentData.date}T${appointmentData.time}`
//             );

//             setAppointmentTime(appointmentDateTime.toISOString());
//             setIsCardVisible(true);
//           } else {
//             console.log("Incomplete appointment data.");
//             setIsCardVisible(false);
//           }
//         } else {
//           console.log("No appointment data found.");
//           setIsCardVisible(false);
//         }
//       } catch (error) {
//         console.error("Error fetching appointment data:", error);
//         setIsCardVisible(false);
//       }
//     }
//   };

//   useFocusEffect(
//     useCallback(() => {
//       fetchAppointmentData();
//     }, [])
//   );

//   useEffect(() => {
//     if (!appointmentTime) return;

//     const calculateTimeRemaining = () => {
//       const now = new Date();
//       const appointmentDate = new Date(appointmentTime);
//       const difference = appointmentDate - now;

//       if (difference > 0) {
//         const days = Math.floor(difference / (1000 * 60 * 60 * 24));
//         const hours = Math.floor(
//           (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//         );
//         const minutes = Math.floor(
//           (difference % (1000 * 60 * 60)) / (1000 * 60)
//         );
//         const seconds = Math.floor((difference % (1000 * 60)) / 1000);

//         setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);
//       } else {
//         setTimeRemaining("Time to join the appointment! Tap to join.");
//       }
//     };

//     const timer = setInterval(calculateTimeRemaining, 1000);

//     return () => clearInterval(timer);
//   }, [appointmentTime]);

//   const handlePress = () => {
//     if (timeRemaining === "Time to join the appointment! Tap to join.") {
//       Linking.openURL(
//         "https://us05web.zoom.us/j/85195110539?pwd=2kHabli2ZMGuThKHwj69q858aJs7aX.1"
//       );
//     }
//   };

//   const handleUpdatePress = () => {
//     navigation.navigate("AppointUpdate");
//   };

//   if (!isCardVisible) return null;

//   return (
//     <TouchableOpacity
//       onPress={handlePress}
//       disabled={timeRemaining !== "Time to join the appointment! Tap to join."}
//     >
//       <View style={styles.card}>
//         <View style={styles.row}>
//           <Text
//             style={[
//               styles.timerText,
//               timeRemaining === "Time to join the appointment! Tap to join." &&
//                 styles.joinNowText,
//             ]}
//           >
//             {timeRemaining === "Time to join the appointment! Tap to join."
//               ? "Join the appointment right now"
//               : `Appointment starts in : ${timeRemaining}`}
//           </Text>
//           <TouchableOpacity
//             onPress={handleUpdatePress}
//             style={styles.updateButton}
//           >
//             <Text style={styles.updateButtonText}>Update</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     width: width * 0.93,
//     padding: 15,
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//     elevation: 3,
//     marginBottom: 10,
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   timerText: {
//     fontSize: 14,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   joinNowText: {
//     color: "#1e90ff",
//     fontSize: 14,
//   },
//   updateButton: {
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     backgroundColor: "#1e90ff",
//     borderRadius: 5,
//   },
//   updateButtonText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
// });

// export default AppointCard;

// new card
import React, { useState, useEffect, useCallback } from "react";
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
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const AppointCard = () => {
  const [timeRemaining, setTimeRemaining] = useState({});
  const [appointmentTime, setAppointmentTime] = useState(null);
  const [isCardVisible, setIsCardVisible] = useState(true);
  const navigation = useNavigation();

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
      return id;
    } catch (error) {
      console.error("Error retrieving ID:", error);
    }
  };

  const getAppointmentId = async () => {
    try {
      const appointmentId = await SecureStore.getItemAsync("appointmentId");
      return appointmentId;
    } catch (error) {
      console.error("Error retrieving appointment ID:", error);
    }
  };

  const fetchAppointmentData = async () => {
    const token = await getToken();
    const id = await getId();
    const appointmentId = await getAppointmentId();

    if (!appointmentId) {
      console.log("No appointment ID found.");
      setIsCardVisible(false);
      return;
    }

    if (id && token) {
      try {
        const response = await axios.get(
          `https://beta.zerodope.in/api/appoints/${appointmentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("API Response:", response.data);

        if (response.data) {
          const appointmentData = response.data;

          if (appointmentData.date && appointmentData.time) {
            const appointmentDateTime = new Date(
              `${appointmentData.date}T${appointmentData.time}`
            );

            setAppointmentTime(appointmentDateTime.toISOString());
            setIsCardVisible(true);
          } else {
            console.log("Incomplete appointment data.");
            setIsCardVisible(false);
          }
        } else {
          console.log("No appointment data found.");
          setIsCardVisible(false);
        }
      } catch (error) {
        console.error("Error fetching appointment data:", error);
        setIsCardVisible(false);
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchAppointmentData();
    }, [])
  );

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

        setTimeRemaining({ days, hours, minutes, seconds });
      } else {
        setTimeRemaining(null);
      }
    };

    const timer = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(timer);
  }, [appointmentTime]);

  const handlePress = () => {
    if (!timeRemaining) {
      Linking.openURL(
        "https://us05web.zoom.us/j/85195110539?pwd=2kHabli2ZMGuThKHwj69q858aJs7aX.1"
      );
    }
  };

  const handleUpdatePress = () => {
    navigation.navigate("AppointUpdate");
  };

  if (!isCardVisible) return null;

  return (
    <TouchableOpacity onPress={handlePress} disabled={!!timeRemaining}>
      <View style={styles.card}>
        <View style={styles.row}>
          {timeRemaining ? (
            <>
              <View style={styles.container}>
                <Text style={styles.appointmentLabel}>
                  Appointment starts in:
                </Text>
                <View style={styles.timeContainer}>
                  <View style={styles.timeBox}>
                    <Text style={styles.valueText}>
                      {String(timeRemaining.days).padStart(2, "0")}
                    </Text>
                    <Text style={styles.labelText}>Days</Text>
                  </View>
                  <View style={styles.timeBox}>
                    <Text style={styles.valueText}>
                      {String(timeRemaining.hours).padStart(2, "0")}
                    </Text>
                    <Text style={styles.labelText}>Hours</Text>
                  </View>
                  <View style={styles.timeBox}>
                    <Text style={styles.valueText}>
                      {String(timeRemaining.minutes).padStart(2, "0")}
                    </Text>
                    <Text style={styles.labelText}>Minutes</Text>
                  </View>
                  <View style={styles.timeBox}>
                    <Text style={styles.valueText}>
                      {String(timeRemaining.seconds).padStart(2, "0")}
                    </Text>
                    <Text style={styles.labelText}>Seconds</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                onPress={handleUpdatePress}
                style={styles.updateButton}
              >
                <Text style={styles.updateButtonText}>Update</Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text style={[styles.timerText, styles.joinNowText]}>
              Time to join the appointment! Tap to join.
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width * 0.93,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timerText: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },
  joinNowText: {
    flex: 1,
    color: "#1e90ff",
    fontSize: 14,
  },
  updateButton: {
    paddingHorizontal: 10,
    paddingVertical: 13,
    backgroundColor: "#1e90ff",
    borderRadius: 5,
    alignSelf: "center",
    marginLeft: 10,
  },
  updateButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  container: {
    flexDirection: "column",
    width: width * 0.65,
    // backgroundColor: "#003F51",
    // backgroundColor: "#FDEEC7",
    borderRadius: 5,
    padding: 5,
  },
  appointmentLabel: {
    fontSize: 14,
    fontWeight: "500",
    // color: "#fff",
    marginBottom: 5,
    textAlign: "center",
  },
  timeContainer: {
    flexDirection: "row",
  },
  timeBox: {
    flex: 1,
    marginHorizontal: 3,
    backgroundColor: "#FFF",
    borderRadius: 5,
    alignItems: "center",
    padding: 3,
  },
  valueText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF3B3B",
  },
  labelText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#FF3B3B",
  },
});

export default AppointCard;
