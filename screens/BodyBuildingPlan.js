import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { Button, useTheme } from "react-native-paper";
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

const Bplan = () => {
  const [selectedDay, setSelectedDay] = useState("day1"); // Default selected day is Day1
  const { colors } = useTheme();
  const [data, setData] = useState({});
  const [exerciseName, setExerciseName] = useState(""); // State to hold exercise name
  const [isLoading, setIsLoading] = useState(true);
  const [noPlan, setNoPlan] = useState(false);

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
          const fetchedUserId = responseData.data[0].id;

          if (storedUserId === fetchedUserId.toString()) {
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
            setNoPlan(true);
          }
        } else {
          setNoPlan(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setNoPlan(true);
      } finally {
        setIsLoading(false);
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

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (noPlan) {
    return (
      <View style={styles.noPlanContainer}>
        <Text>
          There is no Body Building plan for you right now. Please contact your
          Body Building planner.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.dayTabs}>
            <View style={styles.buttonRow}>
              {days.map((day, index) => (
                <Button
                  key={index}
                  mode="contained"
                  onPress={() => handleClick(day)}
                  style={
                    selectedDay === day ? styles.selectedButton : styles.button
                  }
                >
                  <View style={styles.buttonContent}>
                    <Text style={styles.buttonText}>Day</Text>
                    <Text style={styles.buttonTextNumber}>{index + 1}</Text>
                    {selectedDay === day && (
                      <MaterialCommunityIcons
                        name="chevron-down"
                        size={14}
                        color={colors.text}
                        style={styles.downArrow}
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
      </ScrollView>
    </View>
  );
};

export default function BodyBuildingPlan() {
  return <Bplan />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  scrollContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
  },
  headerDays: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: 1,
  },
  selectedButton: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    paddingTop: 8,
    borderWidth: 1,
    height: 70,
  },
  button: {
    backgroundColor: "#f0f0f0",
    borderColor: "black",
    justifyContent: "center",
    borderWidth: 1,
    height: 70,
  },
  buttonContent: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  buttonTextNumber: {
    fontSize: 12,
    fontWeight: "bold",
  },
  dayTabs: {
    flex: 1,
    flexDirection: "column",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "95%",
  },
  downArrow: {},
  workoutContainer: {
    flexGrow: 1,
  },
  workoutsIncluded: {
    marginBottom: 25,
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noPlanContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
