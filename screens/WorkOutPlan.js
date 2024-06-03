import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { Button, IconButton, useTheme } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

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
    },
    {
      name: "Bench Dip13333333",
      muscle: "Triceps",
      sets: "1 set",
      image: require("../assets/images/gymi.jpg"),
    },
    {
      name: "Dumbbell33333 wrist curl",
      muscle: "Biceps",
      sets: "1 set",
      image: require("../assets/images/gymi.jpg"),
    },
    {
      name: "Dumbbell3 skull crushers",
      muscle: "Triceps3333",
      sets: "1 set",
      image: require("../assets/images/gymi.jpg"),
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

const DietPlan = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const { colors } = useTheme();

  const handleClick = (day) => {
    setSelectedDay(day);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.dayTabs}>
          <View style={styles.textView}>
            <Text style={styles.stackText}>Workout Plan</Text>
          </View>
          <View style={styles.buttonRow}>
            {days.map((day, index) => (
              <Button
                key={index}
                mode="container"
                onPress={() => handleClick(day)}
                // labelStyle={styles.buttonLabel}
              >
                <View
                  style={
                    (selectedDay === day && styles.headerText) ||
                    styles.buttonColor
                  }
                >
                  <View style={styles.headerDays}>
                    <Text>Day </Text>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                      {index + 1}
                    </Text>
                  </View>
                  <View style={selectedDay === day && styles.downArrow}>
                    {selectedDay === day && (
                      <IconButton
                        icon={() => (
                          <MaterialCommunityIcons
                            name="chevron-down"
                            size={20}
                            color={colors.text}
                          />
                        )}
                        style={styles.downArrow}
                        size={20}
                      />
                    )}
                  </View>
                </View>
              </Button>
            ))}
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.workoutContainer}>
        {/* <Text style={styles.workoutText}>{workouts[selectedDay]}</Text> */}
        <Text style={styles.workoutsIncluded}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            Workouts included :
          </Text>{" "}
          Chest, Triceps, Full Body
        </Text>
        <ScrollView contentContainerStyle={styles.workoutList}>
          {workouts[selectedDay]?.map((workout, index) => (
            <View key={index} style={styles.workoutItem}>
              <Image source={workout.image} style={styles.workoutImage} />
              <View style={{ gap: 2 }}>
                <View>
                  <Text style={styles.workoutName}>{workout.name}</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    gap: 6,
                    paddingTop: 4,
                  }}
                >
                  <Text style={styles.workoutMuscle}>{workout.muscle}</Text>
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
    backgroundColor: "#fff",
    padding: 14,
    // fontFamily: "poppinsMedium",
  },
  textView: {
    alignItems: "center",
    marginBottom: 26,
  },
  downArrow: {
    flex: 1,
    // marginLeft: 5,
    // borderRadius: 4,
    // padding: 2,
    alignSelf: "flex-start",
  },

  stackText: {
    fontSize: 18,
    fontWeight: "bold",
    // fontFamily: "poppinsMedium",
  },

  headerContainer: {
    // justifyContent: "center",
    // borderWidth: 1,
    // borderColor: "#ccc",
    height: 100, // Adjust this value to reduce the height of the header
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
    // marginBottom: 20,
  },
  headerText: {
    backgroundColor: "#E8EBF5",
    paddingTop: 14,
    borderRadius: 50,
    borderWidth: 1,
  },
  buttonColor: { backgroundColor: "#E8EBF5", padding: 12, borderRadius: 50 },

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
    // justifyContent: "center",
    // alignItems: "center",
    paddingTop: 14,
  },
  workoutText: {
    fontSize: 24,
    textAlign: "center",
  },

  workoutsIncluded: {
    // textAlign: "center",
    marginBottom: 25,
    marginTop: 10,
    fontSize: 14,
    // fontWeight: "bold",
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
    // fontFamily: "poppinsMedium",
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

  workoutMuscle: {
    fontSize: 14,
    color: "#181b21",
    backgroundColor: "#e7ecf0",
    borderRadius: 4,
    padding: 2,
    alignSelf: "flex-start",
  },
});
