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
import MainScreen from "../consultPlan/MainScreen";

import VideoCard from "./VideoCard/VideoCard";
// import { videos } from "./VideoCard/videos"; // Correctly import the videos array
import PromoCard from "./promo/PromoCard";
// import CheckCard from "./promo/CheckCard";
import AppointCard from "./promo/AppointCard";
import MediaPlayer from "./mediaplayer/MediaPlayer";
import { activities } from "./activities/activities";
import { customise } from "./customise/customise";
import ActivityCard from "./activities/ActivityCard";
import ActivityCard1 from "./activities/ActivityCard1";
import { useIsFocused } from "@react-navigation/native";
// import { API_URL, API_KEY } from "@env";

import AppointUpdate from "../home/promo/AppointUpdate";

const Stack = createStackNavigator();

const Homepage = ({ navigation }) => {
  // console.log(API_URL, API_KEY);

  const [paid, setPaid] = useState(true);
  const [apointMent, setApointMent] = useState(true);
  const [visible2, setVisible2] = useState(false);
  const [username, setUsername] = useState("");
  const [todayDate, setTodayDate] = useState("");

  const isFocused = useIsFocused(); // Hook to check if screen is focused

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
      if (isFocused) {
        Alert.alert("Hold on!", "Are you sure you want to exit?", [
          { text: "Cancel", onPress: () => null, style: "cancel" },
          { text: "YES", onPress: () => BackHandler.exitApp() },
        ]);
        return true; // Prevent default behavior
      }
      return false; // Allow default behavior if not focused
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // Clean up listener
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar} mode="small">
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Avatar.Image
            size={38}
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
        {/* <Appbar.Action icon="magnify" onPress={onToggleSnackBar2} /> */}
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.content}>
        <AppointCard />
        {/* <CheckCard /> */}
        <PromoCard />
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
        <ScrollView horizontal style={styles.activitiesContainer1}>
          {customise.map((activity, index) => (
            <ActivityCard1
              key={index}
              activity={activity}
              index={index}
              navigation={navigation}
              paid={paid} // Pass the paid state
            />
          ))}
        </ScrollView>
        <View style={styles.headTitleSection}>
          <Text style={styles.sectionTitle}>Fitness videos</Text>
        </View>
        {/* <ScrollView horizontal style={styles.videoContainer}> */}
        {/* {videos.map((video, index) => (
            <VideoCard key={index} video={video} />
          ))} */}
        <VideoCard />
        {/* </ScrollView> */}
      </ScrollView>
      {/* <Snackbar
        visible={visible2}
        onDismiss={onDismissSnackBar2}
        duration={Snackbar.DURATION_SHORT}
      >
        Search
      </Snackbar> */}
    </View>
  );
};

const App = () => (
  <Stack.Navigator initialRouteName="Homepage">
    <Stack.Screen
      name="Homepage"
      component={Homepage}
      options={{ headerShown: false, title: "Home" }}
    />
    <Stack.Screen name="BookNow" component={BookNow} />
    <Stack.Screen name="MainScreen" component={MainScreen} />
    <Stack.Screen
      name="MediaPlayer"
      component={MediaPlayer}
      options={{
        title: "Workout Video",
        // headerShown: false,
        // headerStyle: {
        backgroundColor: "#000",
        // },
        // headerTintColor: "white",
      }}
    />
    <Stack.Screen
      name="AppointUpdate"
      component={AppointUpdate}
      options={{
        title: "Appointment Reschedule",
        // headerShown: false,
        // headerStyle: {
        backgroundColor: "#000",
        // },
        // headerTintColor: "white",
      }}
    />
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
    fontSize: 18,
    fontWeight: "700",
  },
  headerContent: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 3,
    marginTop: 12,
  },
  dateText: {
    fontSize: 10,
    color: "#888",
    marginBottom: 12,
  },
  content: {
    paddingLeft: 15,
    paddingVertical: 20,
  },
  headTitleSection: {
    borderColor: "#333",
    width: "100%",
    // marginTop: 12,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#333",
    paddingVertical: 2,
    paddingHorizontal: 3,
    lineHeight: 18,
  },
  activitiesContainer: {
    flexDirection: "row",
    marginVertical: 4,
  },
  activitiesContainer1: {
    flexDirection: "row",
    // justifyContent: "space-between",
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
  // videoContainer: {
  //   flexDirection: "row",
  //   // borderWidth:1,
  //   // marginVertical: 4,
  //   paddingVertical: 6,
  //   // backgroundColor: "white",
  //   // backgroundColor: "#F5F5F5", // Light background color
  //   borderRadius: 14,
  //   // padding:14
  //   // paddingLeft: 15, // Added padding to align with other sections
  // },
});

export default App;
