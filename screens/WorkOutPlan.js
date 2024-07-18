// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
// import { Button, IconButton, useTheme } from "react-native-paper";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import axios from "axios";
// import * as SecureStore from "expo-secure-store";

// const days = [
//   "Day1",
//   "Day2",
//   "Day4",
//   "Day",
//   "Day",
//   "Day",
// ];

// const workouts = {
//   Monday: [
//     {
//       name: "Barbell333 biceps curl",
//       muscle: "Biceps",
//       sets: "1 set",
//       image: require("../assets/images/gymi.jpg"),
//     },
//     {
//       name: "Bench Dip13333333",
//       muscle: "Triceps",
//       sets: "1 set",
//       image: require("../assets/images/gymi.jpg"),
//     },
//     {
//       name: "Dumbbell33333 wrist curl",
//       muscle: "Biceps",
//       sets: "1 set",
//       image: require("../assets/images/gymi.jpg"),
//     },
//     {
//       name: "Dumbbell3 skull crushers",
//       muscle: "Triceps3333",
//       sets: "1 set",
//       image: require("../assets/images/gymi.jpg"),
//     },
//   ],
//   Tuesday: [
//     {
//       name: "Barbell biceps curl",
//       muscle: "Biceps",
//       sets: "1 set",
//       image: require("../assets/images/gymi.jpg"),
//       // image: require("../assets/images/partial-react-logo.png"),
//     },
//     {
//       name: "Bench Dip",
//       muscle: "Triceps",
//       sets: "1 set",
//       image: require("../assets/images/gymi.jpg"),
//       // image: require("../assets/images/partial-react-logo.png"),
//     },
//     {
//       name: "Dumbbell wrist curl",
//       muscle: "Biceps",
//       sets: "1 set",
//       image: require("../assets/images/gymi.jpg"),
//       // image: require("../assets/images/partial-react-logo.png"),
//     },
//     {
//       name: "Dumbbell skull crushers",
//       muscle: "Triceps",
//       sets: "1 set",
//       image: require("../assets/images/gymi.jpg"),
//       // image: require("../assets/images/partial-react-logo.png"),
//     },
//   ],
//   // Define workouts for other days similarly
// };

// const DietPlan = () => {
//   const [selectedDay, setSelectedDay] = useState(null);
//   const { colors } = useTheme();
//   const [data, setData] = useState("");

//   const handleClick = (day) => {
//     setSelectedDay(day);
//   };

//   const getToken = async () => {
//     try {
//       const token = await SecureStore.getItemAsync("token");
//       // const token = await AsyncStorage.getItem("token");
//       return token;
//     } catch (error) {
//       console.error("Error retrieving token:", error);
//     }
//   };
//   useEffect(() => {
//     const getData = async () => {
//       const token = await getToken();
//       console.log("Token:", token);
//       try {
//         const response = await axios.get(
//           "https://beta.zerodope.in/api/workout-plans?filters[users_permissions_users].[id].[$eq]=1&populate=*",
//           {
//             headers: {
//               accept: "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         const responseData = response.data;
//         console.log(
//           "Complete Response Data:",
//           JSON.stringify(responseData, null, 2)
//         );

//         // Access the nested data
//         if (responseData.data && responseData.data.length > 0) {
//           const fetchedData = responseData.data.map((item) => {
//             const { id, attributes } = item;
//             return { id, attributes };
//           });
//           console.log("Fetched Data:", JSON.stringify(fetchedData, null, 2));
//           setData(fetchedData);
//         } else {
//           console.log("No data found");
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     getData();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <View style={styles.headerContainer}>
//         <View style={styles.dayTabs}>
//           {/* <View style={styles.textView}>
//             <Text style={styles.stackText}>Workout Plan</Text>
//           </View> */}
//           <View style={styles.buttonRow}>
//             {days.map((day, index) => (
//               <Button
//                 key={index}
//                 mode="container"
//                 onPress={() => handleClick(day)}
//                 // labelStyle={styles.buttonLabel}
//               >
//                 <View
//                   style={
//                     (selectedDay === day && styles.headerText) ||
//                     styles.buttonColor
//                   }
//                 >
//                   <View style={styles.headerDays}>
//                     <Text>Day </Text>
//                     <Text style={{ fontSize: 18, fontWeight: "bold" }}>
//                       {index + 1}
//                     </Text>
//                   </View>
//                   <View style={selectedDay === day && styles.downArrow}>
//                     {selectedDay === day && (
//                       <IconButton
//                         icon={() => (
//                           <MaterialCommunityIcons
//                             name="chevron-down"
//                             size={20}
//                             color={colors.text}
//                           />
//                         )}
//                         style={styles.downArrow}
//                         size={20}
//                       />
//                     )}
//                   </View>
//                 </View>
//               </Button>
//             ))}
//           </View>
//         </View>
//       </View>

//       <ScrollView contentContainerStyle={styles.workoutContainer}>
//         {/* <Text style={styles.workoutText}>{workouts[selectedDay]}</Text> */}
//         <Text style={styles.workoutsIncluded}>
//           <Text style={{ fontWeight: "bold", fontSize: 16 }}>
//             Workouts included :
//           </Text>{" "}
//           Chest, Triceps, Full Body
//         </Text>
//         <ScrollView contentContainerStyle={styles.workoutList}>
//           {workouts[selectedDay]?.map((workout, index) => (
//             <View key={index} style={styles.workoutItem}>
//               <Image source={workout.image} style={styles.workoutImage} />
//               <View style={{ gap: 2 }}>
//                 <View>
//                   <Text style={styles.workoutName}>{workout.name}</Text>
//                 </View>
//                 <View
//                   style={{
//                     flex: 1,
//                     flexDirection: "row",
//                     gap: 6,
//                     paddingTop: 4,
//                   }}
//                 >
//                   <Text style={styles.workoutMuscle}>{workout.muscle}</Text>
//                   <Text style={styles.workoutSets}>{workout.sets}</Text>
//                 </View>
//               </View>
//             </View>
//           ))}
//         </ScrollView>
//       </ScrollView>
//     </View>
//   );
// };

// export default function WorkoutPlan() {
//   return <DietPlan />;
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     padding: 14,
//     // fontFamily: "poppinsMedium",
//     // paddingTop: 62,
//   },
//   textView: {
//     alignItems: "center",
//     marginBottom: 26,
//   },
//   downArrow: {
//     flex: 1,
//     // marginLeft: 5,
//     // borderRadius: 4,
//     // padding: 2,
//     alignSelf: "flex-start",
//   },

//   stackText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     // fontFamily: "poppinsMedium",
//   },

//   headerContainer: {
//     // justifyContent: "center",
//     // borderWidth: 1,
//     // borderColor: "#ccc",
//     height: 100, // Adjust this value to reduce the height of the header
//   },
//   headerDays: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     flexDirection: "column",
//     gap: 4,
//   },

//   dayTabs: {
//     flexDirection: "column",
//     justifyContent: "space-around",
//     // marginBottom: 20,
//   },
//   headerText: {
//     backgroundColor: "#E8EBF5",
//     paddingTop: 14,
//     borderRadius: 50,
//     borderWidth: 1,
//   },
//   buttonColor: { backgroundColor: "#E8EBF5", padding: 12, borderRadius: 50 },

//   buttonRow: {
//     flexDirection: "row",
//     // alignItems: "center",
//     justifyContent: "space-around",
//     width: "100%",
//   },
//   buttonLabel: {
//     fontSize: 10,
//     color: "#fff",
//   },
//   workoutContainer: {
//     flexGrow: 1,
//     // justifyContent: "center",
//     // alignItems: "center",
//     paddingTop: 14,
//   },
//   workoutText: {
//     fontSize: 24,
//     textAlign: "center",
//   },

//   workoutsIncluded: {
//     // textAlign: "center",
//     marginBottom: 25,
//     marginTop: 10,
//     fontSize: 14,
//     // fontWeight: "bold",
//     fontFamily: "poppinsMedium",
//     // fontFamily: "satoshiRegular",
//   },

//   workoutItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#ccc",
//     marginBottom: 10,
//     padding: 10,
//     borderRadius: 5,
//   },
//   workoutSets: {
//     fontSize: 14,
//     color: "#0366be",
//     fontWeight: "bold",
//   },
//   workoutList: {
//     flexGrow: 1,
//     // fontFamily: "poppinsMedium",
//   },
//   workoutImage: {
//     width: 80,
//     height: 50,
//     marginRight: 15,
//     borderRadius: 5,
//   },
//   workoutName: {
//     fontSize: 14,
//     fontWeight: "bold",
//   },

//   workoutMuscle: {
//     fontSize: 14,
//     color: "#181b21",
//     backgroundColor: "#e7ecf0",
//     borderRadius: 4,
//     padding: 2,
//     alignSelf: "flex-start",
//   },
// });

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { Button, IconButton, useTheme } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const days = ["day1", "day2", "day3", "day4", "day5", "day6"];

const parseExercises = (exercisesObj) => {
  console.log("Parsing exercises for:", exercisesObj);
  const { ExerciseName, Exercises } = exercisesObj;
  const parsed = {
    ExerciseName,
    sets: Exercises.split("\n\n").map((exercise) => {
      const [name, sets] = exercise.split(": ");
      return { name, sets };
    }),
  };
  console.log("Parsed exercises:", parsed);
  return parsed;
};

const Wplan = () => {
  const [selectedDay, setSelectedDay] = useState("day1"); // Default selected day is Day1
  const { colors } = useTheme();
  const [data, setData] = useState({});
  const [exerciseName, setExerciseName] = useState(""); // State to hold exercise name

  const handleClick = (day) => {
    setSelectedDay(day);
  };

  const getToken = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      return token;
    } catch (error) {
      console.error("Error retrieving token:", error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const token = await getToken();
      console.log("Token:", token);
      try {
        const response = await axios.get(
          "https://beta.zerodope.in/api/workout-plans?filters[users_permissions_users].[id].[$eq]=1&populate=*",
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
          console.log("Fetched Data:", fetchedData);

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

          if (filteredData[selectedDay]) {
            setExerciseName(filteredData[selectedDay].ExerciseName);
          }
        } else {
          console.log("No data found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (data[selectedDay]) {
      setExerciseName(data[selectedDay].ExerciseName);
    }
  }, [selectedDay, data]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.dayTabs}>
          <View style={styles.buttonRow}>
            {days.map((day, index) => (
              <Button
                key={index}
                mode="contained"
                onPress={() => handleClick(day)}
                style={[
                  styles.button,
                  selectedDay === day && styles.activeButton,
                ]}
              >
                <View>
                  <View style={styles.headerDays}>
                    <Text>Day </Text>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                      {index + 1}
                    </Text>
                  </View>
                  {selectedDay === day && (
                    <IconButton
                      icon={() => (
                        <MaterialCommunityIcons
                          fontSize={30}
                          name="chevron-down"
                          size={25}
                          color={colors.text}
                        />
                      )}
                      size={10}
                    />
                  )}
                </View>
              </Button>
            ))}
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.workoutContainer}>
        <Text style={styles.workoutsIncluded}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            Workouts Included: {exerciseName}
          </Text>
        </Text>
        <ScrollView contentContainerStyle={styles.workoutList}>
          {data[selectedDay]?.sets.map((exercise, index) => (
            <View key={index} style={styles.workoutItem}>
              <Image
                source={require("../assets/images/gymi.jpg")}
                style={styles.workoutImage}
                alt="image"
              />
              <View style={{ gap: 2 }}>
                <View>
                  <Text style={styles.workoutName}>{exercise.name}</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    gap: 6,
                    paddingTop: 4,
                  }}
                >
                  <Text style={styles.workoutSets}>{exercise.sets}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
};

export default function WorkoutPlan() {
  return <Wplan />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 14,
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },
  headerDays: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: 4,
  },
  dayTabs: {
    flexDirection: "column",
    justifyContent: "space-around",
  },
  button: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "black",
  },
  activeButton: {
    backgroundColor: "#E8EBF5",
    borderWidth: 1,
    borderColor: "black",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  workoutContainer: {
    flexGrow: 1,
    paddingTop: 14,
  },
  workoutsIncluded: {
    marginBottom: 25,
    marginTop: 10,
    fontSize: 14,
    fontFamily: "poppinsMedium",
  },
  workoutItem: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  workoutSets: {
    fontSize: 14,
    color: "#0366be",
    fontWeight: "bold",
  },
  workoutList: {
    flexGrow: 1,
  },
  workoutImage: {
    width: 80,
    height: 50,
    marginRight: 15,
    borderRadius: 5,
  },
  workoutName: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
