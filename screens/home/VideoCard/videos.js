import { FontAwesome5 } from "@expo/vector-icons";




export const videos = [
  {
    thumbnailUri: require("../../../assets/images/powerlifting.jpg"),
    uri: require("../../../assets/videos/fit2.mp4"),
    title: "Power Lifting",
    color: "#fff",
    icon: <FontAwesome5 name="dumbbell" size={15} color="#4CAF50" />, // Icon for power lifting
  },
  {
    thumbnailUri: require("../../../assets/images/preworkout.jpg"),
    uri: require("../../../assets/videos/fitness.mp4"),
    title: "Pre Workout",
    color: "#FDEEC7",
    icon: <FontAwesome5 name="running" size={15} color="#FF9800" />, // Icon for pre-workout
  },
  {
    thumbnailUri: require("../../../assets/images/transformation.jpg"),
    uri: require("../../../assets/videos/fit1.mp4"),
    title: "Transformation",
    color: "#fff",
    icon: <FontAwesome5 name="exchange-alt" size={15} color="#4CAF50" />, // Icon for transformation
  },
];
