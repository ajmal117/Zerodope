
import React, { useEffect, useState, useRef } from "react";
import {
  Alert,
  BackHandler,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
} from "react-native";
import { Avatar, Appbar, Snackbar } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import * as SecureStore from "expo-secure-store";
import BookNow from "../booknow/BookNow";
import VideoCard from "./VideoCard/VideoCard";
import { videos } from "./VideoCard/videos"; // Correctly import the videos array
import PromoCard from "./promo/PromoCard";
import MediaPlayer from "./mediaplayer/MediaPlayer";
import { activities } from "./activities/activities";
import { customise } from "./customise/customise";
import ActivityCard from "./activities/ActivityCard";
// import Apointment from "./apointment/Apointment";

const Stack = createStackNavigator();

const Homepage = ({ navigation }) => {
  const [paid, setPaid] = useState(true);
  const [apointMent, setApointMent] = useState(true);
  const [visible2, setVisible2] = useState(false);
  const [username, setUsername] = useState("");
  const [todayDate, setTodayDate] = useState("");

  const onToggleSnackBar2 = () => setVisible2(!visible2);
  const onDismissSnackBar2 = () => setVisible2(false);

  useEffect(() => {
    const getName = async () => {
      try {
        const name = await SecureStore.getItemAsync("username");
        setUsername(name);
      } catch (error) {
        console.error("Error retrieving name:", error);
      }
    };
    getName();

    // Set today's date in Indian format (day month)
    const today = new Date();
    const day = today.getDate();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[today.getMonth()];
    const formattedDate = `${day} ${month}`;
    setTodayDate(formattedDate);
  }, []);

  useEffect(() => {
    const backAction = () => {
      // Optionally show an alert or just return true to prevent going back
      Alert.alert("Hold on!", "Are you sure you want to exit?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar} mode="small">
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Avatar.Image
            size={40}
            source={require("../../assets/images/c1.jpg")}
            style={{ marginRight: 6 }}
          />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Appbar.Content
            titleStyle={styles.appbarTitle}
            title={`Hi, ${username}`}
          />
          <Text style={styles.dateText}>{todayDate}</Text>
        </View>
        <Appbar.Action icon="magnify" onPress={onToggleSnackBar2} />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.content}>
        <PromoCard
          offerDetail="🔥 limited offer"
          offerText="30% Discount Before 31st"
        />
        <View style={styles.headTitleSection}>
          <Text style={styles.sectionTitle}>Your Activities</Text>
        </View>
        <ScrollView horizontal style={styles.activitiesContainer}>
          {activities.map((activity, index) => (
            <ActivityCard
              key={index}
              activity={activity}
              index={index}
              navigation={navigation}
              apointMent={apointMent} // Pass the paid state
            />
          ))}
        </ScrollView>
        <View style={styles.headTitleSection}>
          <Text style={styles.sectionTitle}>Customise Plan</Text>
        </View>
        <View style={styles.activitiesContainer1}>
          {customise.map((activity, index) => (
            <ActivityCard
              key={index}
              activity={activity}
              index={index}
              navigation={navigation}
              paid={paid} // Pass the paid state
            />
          ))}
        </View>
        <View style={styles.headTitleSection}>
          <Text style={styles.sectionTitle}>Fitness videos</Text>
        </View>
        <ScrollView horizontal style={styles.videoContainer}>
          {videos &&
            videos.map((video, index) => (
              <VideoCard key={index} video={video} />
            ))}
        </ScrollView>
      </ScrollView>
      <Snackbar
        visible={visible2}
        onDismiss={onDismissSnackBar2}
        duration={Snackbar.DURATION_SHORT}
      >
        Search
      </Snackbar>
    </View>
  );
};

const App = () => (
  <Stack.Navigator initialRouteName="Homepage">
    <Stack.Screen
      name="Homepage"
      component={Homepage}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="BookNow" component={BookNow} />
    <Stack.Screen name="MediaPlayer" component={MediaPlayer} />
    {/* <Stack.Screen name="Apointment" component={Apointment} /> */}
    {/* Add other screens here as needed */}
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  appbar: {
    minHeight: 50, // Increased height to accommodate date text
    elevation: 1, // Add elevation for shadow effect
    shadowOffset: { width: 0, height: 1 }, // Shadow offset
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 1, // Shadow radius
  },
  appbarTitle: {
    fontSize: 22,
    fontWeight: "700",
  },
  headerContent: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 3,
    marginTop: 12,
  },
  dateText: {
    fontSize: 12,
    color: "#888",
    marginBottom: 8,
  },
  content: {
    paddingLeft: 15,
    paddingVertical: 20,
  },
  headTitleSection: {
    borderColor: "#333",
    width: "100%",
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    paddingVertical: 2,
    paddingHorizontal: 3,
  },
  activitiesContainer: {
    flexDirection: "row",
    marginVertical: 4,
  },
  activitiesContainer1: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  card: {
    flex: 1,
    marginVertical: 15,
    paddingHorizontal: 7,
    paddingVertical: 15,
    borderRadius: 10,
    width: "86%",
    alignItems: "center",
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
    color: "#000",
  },
  videoContainer: {
    flexDirection: "row",
    marginVertical: 4,
    paddingVertical: 10,
    // backgroundColor: "white",
    // backgroundColor: "#F5F5F5", // Light background color
    borderRadius: 14,
    // padding:14
    // paddingLeft: 15, // Added padding to align with other sections
  },
});

export default App;
