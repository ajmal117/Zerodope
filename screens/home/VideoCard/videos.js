import { FontAwesome5 } from "@expo/vector-icons";

export const videos = [
  {
    uri: require("../../../assets/videos/fit1.mp4"),
    title: "Transformation",
    // color: "#E8F5E9",
    color: "#fff",
    icon: <FontAwesome5 name="dumbbell" size={15} color="#4CAF50" />, // Icon for transformation
  },

  {
    uri: require("../../../assets/videos/fitness.mp4"),
    title: "Pre Workout",
    color: "#FDEEC7",
    icon: <FontAwesome5 name="running" size={15} color="#FF9800" />, // Icon for pre-workout
  },
];
