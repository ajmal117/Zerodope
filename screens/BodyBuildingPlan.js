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
          "https://beta.zerodope.in/api/body-building-plans?filters[users_permissions_users].[id].[$eq]=1&populate=*",
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

  const hasExercises = data[selectedDay] && data[selectedDay].sets.length > 0;

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
        {hasExercises && (
          <Text style={styles.workoutsIncluded}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              Workouts Included: {exerciseName}
            </Text>
          </Text>
        )}
        <ScrollView contentContainerStyle={styles.workoutList}>
          {hasExercises ? (
            data[selectedDay].sets.map((exercise, index) => (
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
            ))
          ) : (
            <Text style={styles.restMessage}>TAKE REST</Text>
          )}
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
  restMessage: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
});
