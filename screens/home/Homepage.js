// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet, ScrollView } from "react-native";
// import {
//   Avatar,
//   Button,
//   Card,
//   Title,
//   Paragraph,
//   Provider,
//   Appbar,
//   Snackbar,
// } from "react-native-paper";
// import { createStackNavigator } from "@react-navigation/stack";
// import { TouchableOpacity } from "react-native-gesture-handler";
// import * as SecureStore from "expo-secure-store";
// import BookNow from "../booknow/BookNow";

// const Stack = createStackNavigator();

// const Homepage = ({ navigation }) => {
//   const [paid, setPaid] = useState(true);
//   const [visible2, setVisible2] = useState(false);
//   const [username, setUsername] = useState("");

//   const onToggleSnackBar2 = () => setVisible2(!visible2);
//   const onDismissSnackBar2 = () => setVisible2(false);

//   useEffect(() => {
//     const getName = async () => {
//       try {
//         const name = await SecureStore.getItemAsync("username");
//         setUsername(name);
//       } catch (error) {
//         console.error("Error retrieving name:", error);
//       }
//     };
//     getName();
//   }, []);

//   const renderButton = (targetScreen) => (
//     <Button
//       style={styles.button}
//       mode="contained"
//       onPress={() => navigation.navigate(paid ? targetScreen : "BookNow")}
//     >
//       {paid ? "Open Now" : "Book Now"}
//     </Button>
//   );

//   const renderFreeSupportButton = () => (
//     <Button
//       style={styles.button}
//       mode="contained"
//       onPress={() => navigation.navigate("FreeSupport")}
//     >
//       Open Now
//     </Button>
//   );

//   return (
//     <View style={styles.container}>
//       <Appbar.Header style={styles.appbar} mode="small">
//         <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
//           <Avatar.Image
//             size={40}
//             source={require("../../assets/images/c1.jpg")}
//             style={{ marginRight: 6 }}
//           />
//         </TouchableOpacity>
//         <Appbar.Content
//           titleStyle={styles.appbarTitle}
//           title={`Hi, ${username}`}
//         />
//         <Appbar.Action icon="magnify" onPress={onToggleSnackBar2} />
//       </Appbar.Header>
//       <ScrollView contentContainerStyle={styles.content}>
//         <View style={styles.headTitleSection}>
//           <Text style={styles.sectionTitle}>News On Zerodope</Text>
//         </View>
//         <ScrollView horizontal contentContainerStyle={styles.cardsContainer}>
//           <View style={styles.cards}>
//             <Card style={styles.card}>
//               <Card.Cover source={require("../../assets/images/gymi.jpg")} />
//               <Card.Content>
//                 <Title>Consultation Scheduling</Title>
//                 <Paragraph>Free Diet Plan, Free Workout Plan</Paragraph>
//               </Card.Content>
//               <Card.Actions>{renderButton("ConsultSchedule")}</Card.Actions>
//             </Card>
//             <Card style={styles.card}>
//               <Card.Cover source={require("../../assets/images/gyma.jpg")} />
//               <Card.Content>
//                 <Title>Free Support</Title>
//                 <Paragraph>Free Diet Plan, Free Workout Plan</Paragraph>
//               </Card.Content>
//               <Card.Actions>{renderFreeSupportButton()}</Card.Actions>
//             </Card>
//           </View>
//         </ScrollView>
//         <View style={styles.headTitleSection}>
//           <Text style={styles.sectionTitle}>Customise Plan</Text>
//         </View>
//         <ScrollView horizontal contentContainerStyle={styles.cardsContainer}>
//           <View style={styles.cards}>
//             <Card style={styles.card}>
//               <Card.Cover source={require("../../assets/images/gymi.jpg")} />
//               <Card.Content>
//                 <Title>WorkOut Plan</Title>
//                 <Paragraph>Audio, Video & Text</Paragraph>
//               </Card.Content>
//               <Card.Actions>{renderButton("WorkOutPlan")}</Card.Actions>
//             </Card>
//             <Card style={styles.card}>
//               <Card.Cover source={require("../../assets/images/gymi.jpg")} />
//               <Card.Content>
//                 <Title>Diet Plan</Title>
//                 <Paragraph>Audio, Video & Text</Paragraph>
//               </Card.Content>
//               <Card.Actions>{renderButton("DietPlan")}</Card.Actions>
//             </Card>
//             <Card style={styles.card}>
//               <Card.Cover source={require("../../assets/images/gymi.jpg")} />
//               <Card.Content>
//                 <Title>Body Building</Title>
//                 <Paragraph>Audio, Video & Text</Paragraph>
//               </Card.Content>
//               <Card.Actions>{renderButton("BodyBuild")}</Card.Actions>
//             </Card>
//           </View>
//         </ScrollView>
//       </ScrollView>
//       <Snackbar
//         visible={visible2}
//         onDismiss={onDismissSnackBar2}
//         duration={Snackbar.DURATION_SHORT}
//       >
//         Search
//       </Snackbar>
//     </View>
//   );
// };

// const App = () => (
//   <Stack.Navigator initialRouteName="Homepage">
//     <Stack.Screen
//       name="Homepage"
//       component={Homepage}
//       options={{ headerShown: false }}
//     />
//     <Stack.Screen
//       name="BookNow"
//       component={BookNow}
//       // options={{ headerShown: false }}
//     />
//     {/* Add other screens here as needed */}
//   </Stack.Navigator>
// );

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   button: {
//     backgroundColor: "#FAB917",
//   },
//   appbar: {
//     minHeight: 60,
//     elevation: 1, // Add elevation for shadow effect
//     shadowOffset: { width: 0, height: 1 }, // Shadow offset
//     shadowOpacity: 0.1, // Shadow opacity
//     shadowRadius: 1, // Shadow radius
//   },
//   appbarTitle: {
//     fontSize:22,
//     fontWeight: "500",
//   },
//   content: {
//     padding: 12,
//   },
//   headTitleSection: {
//     borderTopWidth: 1, // Add top border
//     borderBottomWidth: 1, // Add bottom border
//     borderColor: "#333", // Color of the border
//     width: "100%", // Ensure it takes the full width
//     // marginVertical: 9,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#333",
//     paddingVertical: 2, // Optional: Add some padding for better spacing
//     paddingHorizontal: 4, // Optional: Add horizontal padding
//   },
//   cardsContainer: {
//     flexDirection: "row",
//     // paddingHorizontal: 4,
//     marginVertical: 4,
//   },
//   cards: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingTop: 4,
//     paddingBottom: 12,
//   },
//   bookNowcards: {
//     flexDirection: "column",
//     paddingVertical: 6,
//   },
//   card: {
//     width: 250,
//     marginRight: 8,
//   },
//   bookCard: {
//     width: 340,
//     margin: 6,
//   },
// });

// export default App;

//final compon
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Avatar, Appbar, Snackbar } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import * as SecureStore from "expo-secure-store";
import { Video } from "expo-av";
import BookNow from "../booknow/BookNow";

const Stack = createStackNavigator();
const { width } = Dimensions.get("window");

const Homepage = ({ navigation }) => {
  const [paid, setPaid] = useState(true);
  const [visible2, setVisible2] = useState(false);
  const [username, setUsername] = useState("");
  const [todayDate, setTodayDate] = useState("");
  const [videoLoaded, setVideoLoaded] = useState(false);

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

  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scaleAnim]);

  const activities = [
    {
      name: "Consultation Scheduling",
      icon: "📅",
      text: "Free Diet Plan, Free Workout Plan",
      color: "#F4DDFD",
      component: "ConsultSchedule",
    },
    {
      name: "Free Support",
      icon: "💬",
      text: "Free Diet Plan, Free Workout Plan",
      color: "#FDEEC7",
      component: "FreeSupport",
    },
  ];

  const customise = [
    {
      name: "WorkOut Plan",
      icon: "🚴",
      text: "Audio, Video & Text",
      color: "#F4DDFD",
      component: "WorkOutPlan",
    },
    {
      name: "Diet Plan",
      icon: "🍎",
      text: "Audio, Video & Text",
      color: "#FDEEC7",
      component: "DietPlan",
    },
    {
      name: "Body Building",
      icon: "🏋️",
      text: "Audio, Video & Text",
      color: "#BBDEFB",
      component: "BodyBuild",
    },
  ];

  const videos = [
    {
      uri: require("../../assets/videos/fit1.mp4"),
      color: "#E8F5E9",
    },
    {
      uri: require("../../assets/videos/fitness.mp4"),
      color: "#FDEEC7",
    },
  ];

  const ActivityCard = ({ activity, index, navigation, paid }) => {
    const handlePress = () => {
      if (activity.name === "Free Support") {
        navigation.navigate("FreeSupport");
      } else {
        const destination = paid ? activity.component : "BookNow";
        navigation.navigate(destination);
      }
    };

    return (
      <TouchableOpacity style={{ flex: 1 }} onPress={handlePress}>
        <Animated.View
          style={[
            styles.card,
            { backgroundColor: activity.color },
            index === 1 && { transform: [{ scale: scaleAnim }] },
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
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const VideoCard = ({ video }) => {
    return (
      <View style={[styles.videoCard, { backgroundColor: video.color }]}>
        {!videoLoaded && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
        <Video
          source={video.uri}
          style={styles.video}
          resizeMode="cover"
          isLooping
          shouldPlay
          onLoad={() => setVideoLoaded(true)}
        />
      </View>
    );
  };

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
              paid={paid} // Pass the paid state
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
          <Text style={styles.sectionTitle}>Videos</Text>
        </View>
        <ScrollView horizontal style={styles.videoContainer}>
          {videos.map((video, index) => (
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
  },
  videoCard: {
    width: width * 0.8,
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
    marginRight: 10,
  },
  video: {
    width: "100%",
    height: "100%",
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default App;
