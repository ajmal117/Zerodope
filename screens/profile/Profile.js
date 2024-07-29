// import React, { useEffect, useState } from "react";
// import {
//   View,
//   StyleSheet,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   Alert, // Import Alert from react-native
// } from "react-native";
// import {
//   Avatar,
//   Button,
//   Card,
//   Title,
//   Paragraph,
//   List,
// } from "react-native-paper";
// import { createStackNavigator } from "@react-navigation/stack";
// import * as SecureStore from "expo-secure-store";
// import Logout from "../profilePage/Logout";
// import MainProfile from "../profilePage/mainProfile/MainProfile";
// import MyOrders from "../profilePage/MyOrders";
// import HelpSupport from "../profilePage/HelpSupport";
// import AppVersion from "../profilePage/AppVersion";
// import CommGuid from "../profilePage/CommGuid";
// import Review from "../profilePage/Review";
// import TermsAndCond from "../profilePage/TermsAndCond";
// import PrivacyPolicy from "../profilePage/PrivacyPolicy";
// import { useSession } from "@/app/ctx";

// const Stack = createStackNavigator();

// const HomeProfile = ({ navigation }) => {
//   const { signOut } = useSession();
//   const [username, setUsername] = useState("");

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

//   const handleLogout = () => {
//     Alert.alert(
//       "Logout",
//       "Are you sure you want to logout?",
//       [
//         {
//           text: "Cancel",
//           style: "cancel",
//         },
//         {
//           text: "Logout",
//           onPress:() => signOut(), // Navigate to Logout screen
//           style: "destructive",
//         },
//       ],
//       { cancelable: false }
//     );
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <Card style={styles.profileCard}>
//         <TouchableOpacity onPress={() => navigation.navigate("MainProfile")}>
//           <Card.Title
//             title={`Hey, ${username}`}
//             subtitle="Complete your profile here"
//             left={(props) => <Avatar.Icon {...props} icon="account" />}
//           />
//         </TouchableOpacity>
//       </Card>
//       <List.Section style={styles.ListSection}>
//         <List.Item
//           title="My Orders"
//           left={() => <List.Icon icon="cart" />}
//           right={() => <List.Icon icon="chevron-right" />}
//           onPress={() => navigation.navigate("MyOrders")}
//           style={styles.listItem}
//         />
//         <List.Item
//           title="Help & Support"
//           left={() => <List.Icon icon="help-circle" />}
//           right={() => <List.Icon icon="chevron-right" />}
//           onPress={() => navigation.navigate("HelpSupport")}
//           style={styles.listItem}
//         />
//         <List.Item
//           title="Review"
//           left={() => <List.Icon icon="star-outline" />}
//           right={() => <List.Icon icon="chevron-right" />}
//           onPress={() => navigation.navigate("Review")}
//           style={styles.listItem}
//         />
//         <List.Item
//           title="Terms & Conditions"
//           left={() => <List.Icon icon="file-document-outline" />}
//           right={() => <List.Icon icon="chevron-right" />}
//           onPress={() => navigation.navigate("TermsConditions")}
//           style={styles.listItem}
//         />
//         <List.Item
//           title="Privacy Policy"
//           left={() => <List.Icon icon="shield-star-outline" />}
//           right={() => <List.Icon icon="chevron-right" />}
//           onPress={() => navigation.navigate("PrivacyPolicy")}
//           style={styles.listItem}
//         />
//         <List.Item
//           title="Community Guidelines"
//           left={() => <List.Icon icon="file-check-outline" />}
//           right={() => <List.Icon icon="chevron-right" />}
//           onPress={() => navigation.navigate("CommGuid")}
//           style={styles.listItem}
//         />
//       </List.Section>
//       <List.Section style={styles.ListSection}>
//         <List.Item
//           title="App Version: 5.8.1 (3)"
//           left={() => <List.Icon icon="cellphone" />}
//           // right={() => <List.Icon icon="chevron-right" />}
//           style={styles.listItem}
//         />
//         <List.Item
//           title="Logout"
//           left={() => <List.Icon icon="logout" />}
//           right={() => <List.Icon icon="chevron-right" />}
//           onPress={handleLogout} // Call handleLogout function on press
//           style={styles.listItem}
//         />
//       </List.Section>
//     </ScrollView>
//   );
// };

// const Profile = () => {
//   return (
//     <Stack.Navigator
//       initialRouteName="HomeProfile"
//       screenOptions={{
//         headerTitleAlign: "center",
//         headerStyle: { backgroundColor: "#f5f5f5" },
//         headerTintColor: "#333",
//       }}
//     >
//       <Stack.Screen name="HomeProfile" component={HomeProfile} />
//       <Stack.Screen
//         name="MainProfile"
//         component={MainProfile}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen name="MyOrders" component={MyOrders} />
//       <Stack.Screen
//         name="HelpSupport"
//         component={HelpSupport}
//         options={{ title: "Help & Support" }}
//       />
//       <Stack.Screen name="Review" component={Review} />
//       <Stack.Screen name="TermsConditions" component={TermsAndCond} />
//       <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
//       <Stack.Screen name="AppVersion" component={AppVersion} />
//       <Stack.Screen
//         name="CommGuid"
//         component={CommGuid}
//         options={{ title: "Community Guidelines", headerShown: false }}
//       />
//       <Stack.Screen name="Logout" component={Logout} />
//     </Stack.Navigator>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   profileCard: {
//     margin: 10,
//   },
//   ListSection: {
//     margin: 10,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 5,
//   },
//   listItem: {
//     paddingStart: 10,
//   },
// });

// export default Profile;

// review comp

import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
  Linking,
  Image,
} from "react-native";
import {
  Avatar,
  Card,
  List,
  Modal,
  Portal,
  Button,
  Snackbar,
  TouchableRipple,
} from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import * as SecureStore from "expo-secure-store";
import Logout from "../profilePage/Logout";
import MainProfile from "../profilePage/mainProfile/MainProfile";
import MyOrders from "../profilePage/MyOrders";
import HelpSupport from "../profilePage/HelpSupport";
import AppVersion from "../profilePage/AppVersion";
import CommGuid from "../profilePage/CommGuid";
import Review from "../profilePage/Review";
import TermsAndCond from "../profilePage/TermsAndCond";
import PrivacyPolicy from "../profilePage/PrivacyPolicy";
import { useSession } from "@/app/ctx";
import { AirbnbRating } from "react-native-ratings";
import AvatarImg from "../../assets/images/c1.jpg";

const Stack = createStackNavigator();

const HomeProfile = ({ navigation = { navigate: () => {} } }) => {
  const { signOut } = useSession();
  const [username, setUsername] = useState("");
  const [isReviewModalVisible, setReviewModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  useEffect(() => {
    const getName = async () => {
      try {
        const name = await SecureStore.getItemAsync("username");
        setUsername(name || "User"); // Provide a default value in case name is null
      } catch (error) {
        console.error("Error retrieving name:", error);
      }
    };
    getName();
  }, []);

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: () => signOut(),
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  const toggleReviewModal = () => {
    setReviewModalVisible(!isReviewModalVisible);
  };

  const handleReviewSubmit = () => {
    // Send review with rating to backend (dummy implementation)
    console.log(`Submitted review with rating: ${rating}`);

    // Close modal after submission
    toggleReviewModal();

    // Optionally show a snackbar or other feedback
    setSnackbarVisible(true);
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.profileCard}>
        <TouchableOpacity onPress={() => navigation.navigate("MainProfile")}>
          <Card.Title
            title={`Hey, ${username}`}
            subtitle="Complete your profile here"
            left={(props) => (
              <Avatar.Image {...props} source={AvatarImg} size={40} />
            )}
          />
        </TouchableOpacity>
      </Card>
      <List.Section style={styles.ListSection}>
        <List.Item
          title="My Orders"
          left={() => <List.Icon icon="cart" />}
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => navigation.navigate("MyOrders")}
          style={styles.listItem}
        />
        <List.Item
          title="Help & Support"
          left={() => <List.Icon icon="help-circle" />}
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => navigation.navigate("HelpSupport")}
          style={styles.listItem}
        />
        <List.Item
          title="Review"
          left={() => <List.Icon icon="star-outline" />}
          // right={() => <List.Icon icon="chevron-right" />}
          onPress={toggleReviewModal}
          style={styles.listItem}
        />
        <List.Item
          title="Terms & Conditions"
          left={() => <List.Icon icon="file-document-outline" />}
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => navigation.navigate("TermsConditions")}
          style={styles.listItem}
        />
        <List.Item
          title="Privacy Policy"
          left={() => <List.Icon icon="shield-star-outline" />}
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => navigation.navigate("PrivacyPolicy")}
          style={styles.listItem}
        />
        <List.Item
          title="Community Guidelines"
          left={() => <List.Icon icon="file-check-outline" />}
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => navigation.navigate("CommGuid")}
          style={styles.listItem}
        />
      </List.Section>
      <List.Section style={styles.ListSection}>
        <List.Item
          title="App Version: 5.8.1 (3)"
          left={() => <List.Icon icon="cellphone" />}
          style={styles.listItem}
        />
        <List.Item
          title="Logout"
          left={() => <List.Icon icon="logout" />}
          onPress={handleLogout}
          style={styles.listItem}
        />
      </List.Section>

      {/* Review Modal */}
      <Portal>
        <Modal
          visible={isReviewModalVisible}
          onDismiss={toggleReviewModal}
          contentContainerStyle={styles.modalContent}
        >
          <Text style={styles.modalTitle}>Rate Your Experience</Text>
          <AirbnbRating
            showRating
            onFinishRating={setRating}
            style={{ paddingVertical: 10 }}
          />
          <Button mode="contained" onPress={handleReviewSubmit}>
            Submit Review
          </Button>
        </Modal>
      </Portal>

      {/* Snackbar for feedback */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={Snackbar.DURATION_SHORT}
      >
        Review submitted successfully!
      </Snackbar>
    </ScrollView>
  );
};

const Profile = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeProfile"
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: "#f5f5f5" },
        headerTintColor: "#333",
      }}
    >
      <Stack.Screen name="HomeProfile" component={HomeProfile} />
      <Stack.Screen
        name="MainProfile"
        component={MainProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="MyOrders" component={MyOrders} />
      <Stack.Screen
        name="HelpSupport"
        component={HelpSupport}
        options={{ title: "Help & Support" }}
      />
      <Stack.Screen name="Review" component={Review} />
      <Stack.Screen
        name="TermsConditions"
        component={TermsAndCond}
        options={{ title: "Terms And Condition" }}
      />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="AppVersion" component={AppVersion} />
      <Stack.Screen
        name="CommGuid"
        component={CommGuid}
        options={{ title: "Community Guidelines" }}
      />
      <Stack.Screen name="Logout" component={Logout} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  profileCard: {
    margin: 10,
  },
  ListSection: {
    margin: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  listItem: {
    paddingStart: 10,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default Profile;
