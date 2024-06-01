import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { Button } from "react-native-paper";
// import { NavigationContainer } from '@react-navigation/native';

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const workouts = {
  Monday: [
    {
      name: "Barbell333 biceps curl",
      muscle: "Biceps",
      sets: "1 set",
      image: require("../assets/images/gymi.jpg"),
      // image: require("../assets/images/partial-react-logo.png"),
    },
    {
      name: "Bench Dip13333333",
      muscle: "Triceps",
      sets: "1 set",
      image: require("../assets/images/gymi.jpg"),
      // image: require("../assets/images/partial-react-logo.png"),
    },
    {
      name: "Dumbbell33333 wrist curl",
      muscle: "Biceps",
      sets: "1 set",
      image: require("../assets/images/gymi.jpg"),
      // image: require("../assets/images/partial-react-logo.png"),
    },
    {
      name: "Dumbbell3 skull crushers",
      muscle: "Triceps3333",
      sets: "1 set",
      image: require("../assets/images/gymi.jpg"),
      // image: require("../assets/images/partial-react-logo.png"),
    },
  ],
  Tuesday: [
    {
      name: "Barbell biceps curl",
      muscle: "Biceps",
      sets: "1 set",
      image: require("../assets/images/gymi.jpg"),
      // image: require("../assets/images/partial-react-logo.png"),
    },
    {
      name: "Bench Dip",
      muscle: "Triceps",
      sets: "1 set",
      image: require("../assets/images/gymi.jpg"),
      // image: require("../assets/images/partial-react-logo.png"),
    },
    {
      name: "Dumbbell wrist curl",
      muscle: "Biceps",
      sets: "1 set",
      image: require("../assets/images/gymi.jpg"),
      // image: require("../assets/images/partial-react-logo.png"),
    },
    {
      name: "Dumbbell skull crushers",
      muscle: "Triceps",
      sets: "1 set",
      image: require("../assets/images/gymi.jpg"),
      // image: require("../assets/images/partial-react-logo.png"),
    },
  ],
  // Define workouts for other days similarly
};

const workoutsDay = {
  Monday: "Run 5 miles",
  Tuesday: "Upper body strength training",
  Wednesday: "Yoga and stretching",
  Thursday: "HIIT workout",
  Friday: "Lower body strength training",
  Saturday: "Rest day OR light activity",
};

const DietPlan = () => {
  const [selectedDay, setSelectedDay] = useState(null);

  const handleClick = (day) => {
    setSelectedDay(day);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.dayTabs}>
          <View style={styles.textView}>
            <Text style={styles.stackText}>Work Out Plan</Text>
          </View>
          <View style={styles.buttonRow}>
            {days.map((day, index) => (
              <Button
                key={index}
                mode="container"
                onPress={() => handleClick(day)}
                // labelStyle={styles.buttonLabel}
              >
                <Text style={selectedDay === day && styles.headerText}>
                  {day}
                </Text>
              </Button>
            ))}
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.workoutContainer}>
        {/* <Text style={styles.workoutText}>{workouts[selectedDay]}</Text> */}
        <Text style={styles.workoutsIncluded}>
          Workouts included: Chest, Triceps, Full Body
        </Text>
        <ScrollView contentContainerStyle={styles.workoutList}>
          {workouts[selectedDay]?.map((workout, index) => (
            <View key={index} style={styles.workoutItem}>
              <Image source={workout.image} style={styles.workoutImage} />
              <View style={{gap:2}}>
                <View>
                  <Text style={styles.workoutName}>{workout.name}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: "row",gap:6 , paddingTop:4}}>
                  <Text style={styles.workoutMuscle} >{workout.muscle}</Text>
                  <Text style={styles.workoutSets}>{workout.sets}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
};

export default function App() {
  return <DietPlan />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // fontFamily: "poppinsMedium",
  },
  textView: {
    alignItems: "center",
  },

  stackText: {
    fontSize: 16,
    fontWeight: "bold",
  },

  headerContainer: {
    justifyContent: "center",
    // borderWidth: 1,
    // borderColor: "#ccc",
    height: 60, // Adjust this value to reduce the height of the header
  },

  dayTabs: {
    flexDirection: "column",
    justifyContent: "space-around",
    // marginBottom: 20,
  },
  headerText: {
    color: "#000",
    fontWeight: "bold",
  },
  buttonRow: {
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
  },
  buttonLabel: {
    fontSize: 10,
    color: "#fff",
  },
  workoutContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  workoutText: {
    fontSize: 24,
    textAlign: "center",
  },

  workoutsIncluded: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "poppinsMedium",
    // fontFamily: "satoshiRegular",
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
    fontFamily: "poppinsMedium",
  },
  workoutImage: {
    width: 135,
    height: 80,
    marginRight: 20,
    borderRadius: 5,
  },
  workoutName: {
    fontSize: 14,
    fontWeight: "bold",
  },

  workoutMuscle: {
    fontSize: 14,
    color: "#555",
    backgroundColor:"#e7ecf0",
    borderRadius:4,
    padding:2
  },

});

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   Button,
//   StyleSheet,
//   ScrollView,
//   Image,
//   TouchableOpacity,
// } from "react-native";

// const workouts = {
//   day1: [
//     {
//       name: "Barbell biceps curl",
//       muscle: "Biceps",
//       sets: "1 set",
//       image: require("../assets/images/partial-react-logo.png"),
//     },
//     {
//       name: "Bench Dip",
//       muscle: "Triceps",
//       sets: "1 set",
//       image: require("../assets/images/partial-react-logo.png"),
//     },
//     {
//       name: "Dumbbell wrist curl",
//       muscle: "Biceps",
//       sets: "1 set",
//       image: require("../assets/images/partial-react-logo.png"),
//     },
//     {
//       name: "Dumbbell skull crushers",
//       muscle: "Triceps",
//       sets: "1 set",
//       image: require("../assets/images/partial-react-logo.png"),
//     },
//   ],
//   // Define workouts for other days similarly
// };

// const WorkOutPlan = () => {
//   const [selectedDay, setSelectedDay] = useState("day1");

//   return (
//     <View style={styles.container}>
//       <View style={styles.dayTabs}>
//         {Object.keys(workouts).map((day, index) => (
//           <TouchableOpacity
//             key={index}
//             style={[
//               styles.dayTab,
//               selectedDay === day ? styles.activeTab : null,
//             ]}
//             onPress={() => setSelectedDay(day)}
//           >
//             <Text style={styles.dayTabText}>Day {index + 1}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//       <Text style={styles.workoutsIncluded}>
//         Workouts included: Chest, Triceps, Full Body
//       </Text>
//       <ScrollView contentContainerStyle={styles.workoutList}>
//         {workouts[selectedDay].map((workout, index) => (
//           <View key={index} style={styles.workoutItem}>
//             <Image
//               source={workout.image}
//               style={styles.workoutImage}
//               alt="image"
//             />
//             <View>
//               <Text style={styles.workoutName}>{workout.name}</Text>
//               <Text style={styles.workoutMuscle}>{workout.muscle}</Text>
//               <Text style={styles.workoutSets}>{workout.sets}</Text>
//             </View>
//           </View>
//         ))}
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: "#fff",
//   },
//   dayTabs: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginBottom: 20,
//   },
//   dayTab: {
//     padding: 10,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 5,
//   },
//   activeTab: {
//     backgroundColor: "#007bff",
//   },
//   dayTabText: {
//     color: "#007bff",
//   },
//   workoutsIncluded: {
//     textAlign: "center",
//     marginBottom: 20,
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   workoutList: {
//     flexGrow: 1,
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
//   workoutImage: {
//     width: 80,
//     height: 80,
//     marginRight: 20,
//     borderRadius: 5,
//   },
//   workoutName: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   workoutMuscle: {
//     fontSize: 14,
//     color: "#555",
//   },
//   workoutSets: {
//     fontSize: 14,
//     color: "#555",
//   },
// });

// export default WorkOutPlan;
