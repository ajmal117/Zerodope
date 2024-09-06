import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";

const ActivityCard = ({ activity, index, navigation, paid, apointMent }) => {
  // const scaleAnim = useRef(new Animated.Value(1)).current;

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

  // useEffect(() => {
  //   Animated.loop(
  //     Animated.sequence([
  //       Animated.timing(scaleAnim, {
  //         toValue: 1.1,
  //         duration: 1000,
  //         useNativeDriver: true,
  //       }),
  //       Animated.timing(scaleAnim, {
  //         toValue: 1,
  //         duration: 1000,
  //         useNativeDriver: true,
  //       }),
  //     ])
  //   ).start();
  // }, [scaleAnim]);

  return (
    <TouchableOpacity style={{ flex: 1 }} onPress={handlePress}>
      <View
        style={[
          styles.card,
          { backgroundColor: activity.color },
          // index === 1 && { transform: [{ scale: scaleAnim }] },
        ]}
      >
        <Text style={styles.icon}>{activity.icon}</Text>
        <Text style={styles.title}>{activity.name}</Text>
        <Text style={styles.text}>{activity.text}</Text>
        <Text
          style={[
            styles.bookNowText,
            activity.name === "Free Support"
              ? { color: "green" }
              : !paid
              ? { color: "red" }
              : { color: "green" },
          ]}
        >
          {activity.name === "Free Support"
            ? "Open Now"
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
    // marginVertical: 12,
    paddingHorizontal: 7,
    paddingVertical: 15,
    borderRadius: 5,
    // width: "86%",
    alignItems: "center",
    marginEnd:12,
    marginBottom:14
  },
  icon: {
    fontSize: 40,
    marginBottom: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  text: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
  },
  bookNowText: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
  },
});
