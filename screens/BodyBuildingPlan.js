// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
// import { Button, useTheme } from "react-native-paper";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import axios from "axios";
// import * as SecureStore from "expo-secure-store";
// import { useNavigation } from "@react-navigation/native";

// const days = ["day1", "day2", "day3", "day4", "day5", "day6"];

// const parseExercises = (exercisesObj) => {
//   const { ExerciseName, Exercises } = exercisesObj;
//   const parsed = {
//     ExerciseName,
//     sets: Exercises.split(/\d+\.\s/)
//       .filter(Boolean)
//       .map((exercise, index) => {
//         const [name, ...details] = exercise.split("\n");
//         const targetMuscles = details.find((detail) =>
//           detail.startsWith("Target Muscles:")
//         );
//         const howToDoIndex = details.findIndex((detail) =>
//           detail.startsWith("How to Do:")
//         );
//         const howToDo = details.slice(howToDoIndex).join("\n");
//         return {
//           name: `${index + 1}. ${name.trim()}`,
//           targetMuscles: targetMuscles
//             ? targetMuscles.replace("Target Muscles: ", "").trim()
//             : "",
//           howToDo: howToDo ? howToDo.replace("How to Do:", "").trim() : "",
//         };
//       }),
//   };
//   return parsed;
// };

// const Bplan = () => {
//   const [selectedDay, setSelectedDay] = useState("day1");
//   const { colors } = useTheme();
//   const [data, setData] = useState({});
//   const [exerciseName, setExerciseName] = useState("");
//   const [noPlan, setNoPlan] = useState(false);
//   const navigation = useNavigation();

//   const handleClick = (day) => {
//     setSelectedDay(day);
//   };

//   const getToken = async () => {
//     try {
//       const token = await SecureStore.getItemAsync("token");
//       return token;
//     } catch (error) {
//       console.error("Error retrieving token:", error);
//     }
//   };

//   const getUserId = async () => {
//     try {
//       const userId = await SecureStore.getItemAsync("userid");
//       return userId;
//     } catch (error) {
//       console.error("Error retrieving userId:", error);
//     }
//   };

//   useEffect(() => {
//     const getData = async () => {
//       const token = await getToken();
//       const storedUserId = await getUserId();
//       console.log("Token:", token);
//       console.log("Stored User ID:", storedUserId);

//       try {
//         const response = await axios.get(
//           `https://beta.zerodope.in/api/body-building-plans?filters[users_permissions_users].[id].[$eq]=${storedUserId}&populate=*`,
//           {
//             headers: {
//               accept: "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         const responseData = response.data;
//         console.log("Complete Response Data:", JSON.stringify(responseData));

//         if (responseData.data && responseData.data.length > 0) {
//           const fetchedData = responseData.data[0].attributes;

//           const filteredData = days.reduce((acc, day) => {
//             if (fetchedData[day] && fetchedData[day].Exercises) {
//               acc[day] = parseExercises(fetchedData[day]);
//             } else {
//               console.log(`No exercises found for ${day}`);
//             }
//             return acc;
//           }, {});

//           console.log("Filtered Data:", filteredData);
//           setData(filteredData);

//           if (filteredData[selectedDay]) {
//             setExerciseName(filteredData[selectedDay].ExerciseName);
//           }
//         } else {
//           setNoPlan(true);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setNoPlan(true);
//       }
//     };
//     getData();
//   }, []);

//   useEffect(() => {
//     if (data[selectedDay]) {
//       setExerciseName(data[selectedDay].ExerciseName);
//     }
//   }, [selectedDay, data]);

//   const hasExercises = data[selectedDay] && data[selectedDay].sets.length > 0;

//   if (noPlan) {
//     return (
//       <View style={styles.noPlanContainer}>
//         <Text style={styles.noDataText}>
//           There is no Body Building plan for you right now. Please contact your
//           Body Building planner.
//         </Text>
//         <Button mode="contained" onPress={() => navigation.navigate("BookNow")}>
//           BOOK NOW
//         </Button>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <ScrollView style={styles.scrollContainer}>
//         <View style={styles.headerContainer}>
//           <View style={styles.dayTabs}>
//             <View style={styles.buttonRow}>
//               {days.map((day, index) => (
//                 <Button
//                   key={index}
//                   mode="contained"
//                   onPress={() => handleClick(day)}
//                   style={
//                     selectedDay === day ? styles.selectedButton : styles.button
//                   }
//                 >
//                   <View style={styles.buttonContent}>
//                     <Text style={styles.buttonText}>Day</Text>
//                     <Text style={styles.buttonTextNumber}>{index + 1}</Text>
//                     {selectedDay === day && (
//                       <MaterialCommunityIcons
//                         name="chevron-down"
//                         size={14}
//                         color={colors.text}
//                         style={styles.downArrow}
//                       />
//                     )}
//                   </View>
//                 </Button>
//               ))}
//             </View>
//           </View>
//         </View>

//         <View style={styles.workoutContainer}>
//           {hasExercises && (
//             <Text style={styles.workoutsIncluded}>
//               <Text style={{ fontWeight: "bold", fontSize: 16 }}>
//                 Workouts Included: {exerciseName}
//               </Text>
//             </Text>
//           )}
//           <ScrollView contentContainerStyle={styles.workoutList}>
//             {hasExercises ? (
//               data[selectedDay]?.sets.map((exercise, index) => (
//                 <View key={index} style={styles.workoutItem}>
//                   <Image
//                     source={require("../assets/images/gymi.jpg")}
//                     style={styles.workoutImage}
//                     alt="image"
//                   />
//                   <View style={styles.workoutDetailsContainer}>
//                     <Text style={styles.workoutName}>{exercise.name}</Text>
//                     <Text style={styles.sectionHeading}>Target Muscles:</Text>
//                     <Text style={styles.targetMuscles}>
//                       {exercise.targetMuscles}
//                     </Text>
//                     <Text style={styles.sectionHeading}>How to Do:</Text>
//                     <Text style={styles.howToDo}>{exercise.howToDo}</Text>
//                   </View>
//                 </View>
//               ))
//             ) : (
//               <Text style={styles.restMessage}>TAKE REST</Text>
//             )}
//           </ScrollView>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// export default function BodyBuildingPlan() {
//   return <Bplan />;
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     paddingHorizontal: 10,
//   },
//   headerContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//     marginVertical: 15,
//   },
//   selectedButton: {
//     justifyContent: "center",
//     alignItems: "center",
//     borderColor: "black",
//     paddingTop: 8,
//     borderWidth: 2,
//     backgroundColor: "#f0f0f0",
//     height: 70,
//   },
//   button: {
//     backgroundColor: "white",
//     borderColor: "black",
//     justifyContent: "center",
//     borderWidth: 1,
//     height: 70,
//   },
//   buttonContent: {
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   buttonText: {
//     fontSize: 12,
//     fontWeight: "bold",
//   },
//   buttonTextNumber: {
//     fontSize: 12,
//     fontWeight: "bold",
//   },
//   dayTabs: {
//     flex: 1,
//     flexDirection: "column",
//   },
//   buttonRow: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     width: "93%",
//   },
//   downArrow: {},
//   workoutContainer: {
//     flexGrow: 1,
//   },
//   workoutsIncluded: {
//     marginBottom: 25,
//     fontSize: 14,
//     fontFamily: "poppinsMedium",
//   },
//   workoutItem: {
//     flexDirection: "row",
//     alignItems: "flex-start",
//     borderWidth: 1,
//     borderColor: "#ccc",
//     marginBottom: 10,
//     padding: 10,
//     borderRadius: 5,
//   },
//   workoutDetailsContainer: {
//     flex: 1,
//   },
//   workoutDetails: {
//     fontSize: 14,
//     color: "#0366be",
//     flexWrap: "wrap",
//   },
//   sectionHeading: {
//     fontSize: 14,
//     fontWeight: "bold",
//     marginTop: 5,
//   },
//   targetMuscles: {
//     fontSize: 14,
//     color: "#FF5733",
//     marginBottom: 5,
//   },
//   howToDo: {
//     fontSize: 14,
//     color: "#0366be",
//   },
//   workoutList: {
//     flexGrow: 1,
//   },
//   workoutImage: {
//     width: 80,
//     height: 50,
//     marginRight: 15,
//     borderRadius: 5,
//   },
//   workoutName: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "black",
//   },
//   restMessage: {
//     fontSize: 20,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginTop: 40,
//   },
//   noPlanContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//     flex: 1,
//     padding: 20,
//   },

//   noDataText: {
//     fontSize: 20,
//     textAlign: "center",
//     marginBottom: 20,
//   },
//   scrollContainer: {
//     flexGrow: 1,
//   },
// });

//updated comp

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableHighlight,
// } from "react-native";
// import { Button, useTheme } from "react-native-paper";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import axios from "axios";
// import * as SecureStore from "expo-secure-store";
// import { useNavigation } from "@react-navigation/native";

// const days = ["day1", "day2", "day3", "day4", "day5", "day6"];

// const parseExercises = (exercisesObj) => {
//   const { ExerciseName, Exercises } = exercisesObj;
//   const parsed = {
//     ExerciseName,
//     sets: Exercises.split(/\d+\.\s/)
//       .filter(Boolean)
//       .map((exercise, index) => {
//         const [name, ...details] = exercise.split("\n");
//         const targetMuscles = details.find((detail) =>
//           detail.startsWith("Target Muscles:")
//         );
//         const howToDoIndex = details.findIndex((detail) =>
//           detail.startsWith("How to Do:")
//         );
//         const howToDo = details.slice(howToDoIndex).join("\n");
//         return {
//           name: `${index + 1}. ${name.trim()}`,
//           targetMuscles: targetMuscles
//             ? targetMuscles.replace("Target Muscles: ", "").trim()
//             : "",
//           howToDo: howToDo ? howToDo.replace("How to Do:", "").trim() : "",
//         };
//       }),
//   };
//   return parsed;
// };

// const BodyBuildingPlan = () => {
//   const { colors } = useTheme();
//   const [data, setData] = useState({});
//   const [noPlan, setNoPlan] = useState(false);
//   const navigation = useNavigation();

//   const getToken = async () => {
//     try {
//       const token = await SecureStore.getItemAsync("token");
//       return token;
//     } catch (error) {
//       console.error("Error retrieving token:", error);
//     }
//   };

//   const getUserId = async () => {
//     try {
//       const userId = await SecureStore.getItemAsync("userid");
//       return userId;
//     } catch (error) {
//       console.error("Error retrieving userId:", error);
//     }
//   };

//   useEffect(() => {
//     const getData = async () => {
//       const token = await getToken();
//       const storedUserId = await getUserId();
//       console.log("Token:", token);
//       console.log("Stored User ID:", storedUserId);

//       try {
//         const response = await axios.get(
//           `https://beta.zerodope.in/api/body-building-plans?filters[users_permissions_users].[id].[$eq]=${storedUserId}&populate=*`,
//           {
//             headers: {
//               accept: "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         const responseData = response.data;
//         console.log("Complete Response Data:", JSON.stringify(responseData));

//         if (responseData.data && responseData.data.length > 0) {
//           const fetchedData = responseData.data[0].attributes;

//           const filteredData = days.reduce((acc, day) => {
//             if (fetchedData[day] && fetchedData[day].Exercises) {
//               acc[day] = parseExercises(fetchedData[day]);
//             } else {
//               console.log(`No exercises found for ${day}`);
//             }
//             return acc;
//           }, {});

//           console.log("Filtered Data:", filteredData);
//           setData(filteredData);
//         } else {
//           setNoPlan(true);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setNoPlan(true);
//       }
//     };
//     getData();
//   }, []);

//   if (noPlan) {
//     return (
//       <View style={styles.noPlanContainer}>
//         <Text style={styles.noDataText}>
//           There is no Body Building plan for you right now. Please contact your
//           Body Building planner.
//         </Text>
//         <Button
//           mode="contained"
//           onPress={() => navigation.navigate("BookNow")}
//           style={styles.bookNowButton}
//         >
//           BOOK NOW
//         </Button>
//       </View>
//     );
//   }

//   const renderDayButton = ({ item, index }) => (
//     <View style={styles.buttonWrapper} key={index}>
//       <TouchableHighlight
//         style={styles.touchableHighlight}
//         // underlayColor="#ffd700" // Yellowish active state color
//         onPress={() =>
//           navigation.navigate("BodyBuildData", {
//             day: item,
//             data: data[item],
//           })
//         }
//       >
//         <View style={styles.button}>
//           <View style={styles.buttonContent}>
//             <Text style={styles.buttonText}>Day {index + 1} -</Text>
//             {data[item] && (
//               <Text style={styles.exerciseName}>{data[item].ExerciseName}</Text>
//             )}
//             <MaterialCommunityIcons
//               name="chevron-right"
//               size={20}
//               color={colors.text}
//               style={styles.downArrow}
//             />
//           </View>
//         </View>
//       </TouchableHighlight>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>
//         Select your day and get ready to crush it!
//       </Text>
//       <View style={styles.headerContainer}>
//         <FlatList
//           data={days}
//           renderItem={renderDayButton}
//           keyExtractor={(item, index) => index.toString()}
//           contentContainerStyle={styles.buttonList}
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     paddingHorizontal: 10,
//     // paddingTop:4
//   },
//   heading: {
//     fontSize: 18,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginVertical: 15,
//     color: "#000",
//   },
//   bookNowButton: {
//     backgroundColor: "#FAB917",
//   },
//   headerContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//     marginVertical: 15,
//   },
//   buttonWrapper: {
//     marginBottom: 10,
//     paddingHorizontal: 10,
//     width: "100%",
//   },
//   touchableHighlight: {
//     borderRadius: 10,
//   },
//   button: {
//     // backgroundColor: "white",
//     backgroundColor: "#FAB917",
//     borderColor: "black",
//     borderWidth: 1,
//     justifyContent: "center",
//     height: 50,
//     borderRadius: 10,
//   },
//   buttonContent: {
//     color: "white",
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 10,
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//     paddingHorizontal: 10,
//   },
//   exerciseName: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "semibold",
//     marginTop: 1,
//     paddingHorizontal: 6,
//   },
//   buttonList: {
//     width: "100%",
//   },
//   downArrow: { marginTop: 1, paddingHorizontal: 10, color: "white" },
//   noPlanContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//     flex: 1,
//     paddingTop: 18,
//     paddingBottom: 20,
//   },
//   noDataText: {
//     fontSize: 20,
//     textAlign: "center",
//     marginBottom: 20,
//   },
// });

// export default BodyBuildingPlan;

//after loader

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import { Button, useTheme } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "@env";

const days = ["day1", "day2", "day3", "day4", "day5", "day6"];

const parseExercises = (exercisesObj) => {
  const { ExerciseName, Exercises } = exercisesObj;
  const parsed = {
    ExerciseName,
    sets: Exercises.split(/\d+\.\s/)
      .filter(Boolean)
      .map((exercise, index) => {
        const [name, ...details] = exercise.split("\n");
        const targetMuscles = details.find((detail) =>
          detail.startsWith("Target Muscles:")
        );
        const howToDoIndex = details.findIndex((detail) =>
          detail.startsWith("How to Do:")
        );
        const howToDo = details.slice(howToDoIndex).join("\n");
        return {
          name: `${index + 1}. ${name.trim()}`,
          targetMuscles: targetMuscles
            ? targetMuscles.replace("Target Muscles: ", "").trim()
            : "",
          howToDo: howToDo ? howToDo.replace("How to Do:", "").trim() : "",
        };
      }),
  };
  return parsed;
};

const BodyBuildingPlan = () => {
  const { colors } = useTheme();
  const [data, setData] = useState({});
  const [noPlan, setNoPlan] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const getToken = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      return token;
    } catch (error) {
      console.error("Error retrieving token:", error);
    }
  };

  const getUserId = async () => {
    try {
      const userId = await SecureStore.getItemAsync("userid");
      return userId;
    } catch (error) {
      console.error("Error retrieving userId:", error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const token = await getToken();
      const storedUserId = await getUserId();
      console.log("Token:", token);
      console.log("Stored User ID:", storedUserId);

      try {
        const response = await axios.get(
          `${API_URL}/body-building-plans?filters[users_permissions_users].[id].[$eq]=${storedUserId}&populate=*`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const responseData = response.data;
        console.log("Complete Response Data:", JSON.stringify(responseData));

        if (responseData.data && responseData.data.length > 0) {
          const fetchedData = responseData.data[0].attributes;

          const filteredData = days.reduce((acc, day) => {
            if (fetchedData[day] && fetchedData[day].Exercises) {
              acc[day] = parseExercises(fetchedData[day]);
            } else {
              console.log(`No exercises found for ${day}`);
            }
            return acc;
          }, {});

          console.log("Filtered Data:", filteredData);
          setData(filteredData);
        } else {
          setNoPlan(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setNoPlan(true);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FAB917" />
        <Text>Loading body building plan...</Text>
      </View>
    );
  }

  if (noPlan) {
    return (
      <View style={styles.noPlanContainer}>
        <Text style={styles.noDataText}>
          There is no Body Building plan for you right now. Please contact your
          Body Building planner.
        </Text>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("BookNow")}
          style={styles.bookNowButton}
        >
          BOOK NOW
        </Button>
      </View>
    );
  }

  const renderDayButton = ({ item, index }) => (
    <View style={styles.buttonWrapper} key={index}>
      <TouchableHighlight
        style={styles.touchableHighlight}
        onPress={() =>
          navigation.navigate("BodyBuildData", {
            day: item,
            data: data[item],
          })
        }
      >
        <View style={styles.button}>
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>Day {index + 1} -</Text>
            {data[item] && (
              <Text style={styles.exerciseName}>{data[item].ExerciseName}</Text>
            )}
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color={colors.text}
              style={styles.downArrow}
            />
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Select your day and get ready to crush it!
      </Text>
      <View style={styles.headerContainer}>
        <FlatList
          data={days}
          renderItem={renderDayButton}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.buttonList}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
    color: "#000",
  },
  bookNowButton: {
    backgroundColor: "#FAB917",
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
  },
  buttonWrapper: {
    marginBottom: 10,
    paddingHorizontal: 10,
    width: "100%",
  },
  touchableHighlight: {
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#FAB917",
    borderColor: "black",
    borderWidth: 1,
    justifyContent: "center",
    height: 50,
    borderRadius: 10,
  },
  buttonContent: {
    color: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  exerciseName: {
    color: "white",
    fontSize: 16,
    fontWeight: "semibold",
    marginTop: 1,
    paddingHorizontal: 6,
  },
  buttonList: {
    width: "100%",
  },
  downArrow: { marginTop: 1, paddingHorizontal: 10, color: "white" },
  noPlanContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingTop: 18,
    paddingBottom: 20,
  },
  noDataText: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
});

export default BodyBuildingPlan;
