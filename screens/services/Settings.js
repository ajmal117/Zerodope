// import * as React from "react";
// import { View, StyleSheet, ScrollView } from "react-native";
// import { Button, Card, Text } from "react-native-paper";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// const ToolButton = ({ iconName, label }) => (
//   <Card style={styles.card}>
//     <Button
//       mode="contained"
//       contentStyle={styles.buttonContent}
//       labelStyle={styles.buttonLabel}
//       style={styles.button}
//       icon={() => <Icon name={iconName} size={30} color="#000" />}
//     >
//       {label}
//     </Button>
//   </Card>
// );

// const ToolsComponent = () => (
//   <View style={styles.container}>
//     <View style={styles.toolHeader}>
//       <Text style={styles.toolText}>Tools</Text>
//     </View>
//     <ScrollView contentContainerStyle={styles.scrollContainer}>
//       <ToolButton iconName="chart-line" label="Progress & Insights" />
//       <ToolButton iconName="heart" label="HealthKit" />
//       <ToolButton iconName="food-apple" label="Diet tool" />
//       <ToolButton iconName="dumbbell" label="Training tool" />
//       <ToolButton iconName="calculator" label="BMR Calculator" />
//       <ToolButton iconName="human-male-height" label="Body Fat Calculator" />
//       <ToolButton iconName="target" label="Goal Calculator" />
//       <ToolButton iconName="food-turkey" label="Macro Calculator" />
//       <ToolButton iconName="fire" label="Calorie Calculator" />
//       <ToolButton iconName="weight-lifter" label="1RM Calculator" />
//       <ToolButton iconName="bell" label="Reminders" />
//       {/* Add more buttons for additional tools */}
//     </ScrollView>
//   </View>
// );

// const styles = StyleSheet.create({
//   container: {
//     paddingTop: 60,
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//   },
//   toolHeader: {
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 10, // Reduced the gap between the header and the tools
//   },
//   toolText: {
//     fontSize: 18, // Increased font size
//     fontWeight: "bold",
//   },
//   scrollContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//     paddingHorizontal: 12,
//     paddingVertical: 15,
//   },
//   card: {
//     width: "48%", // Adjusted to ensure two cards per line with space between
//     marginVertical: 8,
//     borderRadius: 8,
//     elevation: 2,
//     backgroundColor: "#fff",
//   },
//   button: {
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: "yellow", // Lighter dark border color
//     backgroundColor: "#f0f0f0", // Light button color
//   },
//   buttonContent: {
//     flexDirection: "row-reverse", // Put the icon at the right side
//   },
//   buttonLabel: {
//     color: "#000", // Text color
//   },
// });

// export default ToolsComponent;

//setting compo

import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import * as SecureStore from "expo-secure-store";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import AvatarImg from "../../assets/images/c1.jpg"; // replace with your image path
import MainProfile from "../profilePage/mainProfile/MainProfile";
import ResetPassword from "../services/settingDetails/ResetPassword";
import Privacy from "../services/settingDetails/Privacy";
import Acount from "../services/settingDetails/Acount";
import BlockedUser from "../services/settingDetails/BlockedUser";
import NotificationsSetting from "../services/settingDetails/NotificationsSetting";

const Stack = createStackNavigator();

const SettingScreen = ({ navigation }) => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const name = await SecureStore.getItemAsync("username");
        const email = await SecureStore.getItemAsync("email");
        setProfile((prevProfile) => ({
          ...prevProfile,
          email: email || prevProfile.email,
          name: name || prevProfile.name,
        }));
      } catch (error) {
        console.error("Error retrieving user ID or username:", error);
      }
    };
    getProfileData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("MainProfile")}>
          <Text style={styles.viewProfile}>View Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileContainer}>
        <Image source={AvatarImg} style={styles.profileImage} />
        {/* <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate("MainProfile")}
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity> */}
        <Text style={styles.profileName}>Hey, {profile.name}</Text>
        <Text style={styles.profileEmail}>{profile.email}</Text>
      </View>
      {/* <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuText}>Name, Age, Phone, Email etc.</Text>
      </TouchableOpacity> */}
      {/* <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuText}>Goals & Preferences</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate("ResetPassword")}
      >
        <Ionicons name="key" size={24} color="orange" />
        <Text style={styles.menuText}>Reset Password</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate("Privacy")}
      >
        <Ionicons name="lock-closed" size={24} color="blue" />
        <Text style={styles.menuText}>Privacy</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate("Acount")}
      >
        <FontAwesome name="cogs" size={24} color="green" />
        <Text style={styles.menuText}>Account settings</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate("NotificationsSetting")}
      >
        <Ionicons name="notifications" size={24} color="blue" />
        <Text style={styles.menuText}>Notifications</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem}>
        <MaterialIcons name="location-on" size={24} color="green" />
        <Text style={styles.menuText}>Location Access</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate("BlockedUser")}
      >
        <Ionicons name="ban" size={24} color="purple" />
        <Text style={styles.menuText}>Blocked Users</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const Settings = () => {
  return (
    <Stack.Navigator initialRouteName="SettingScreen">
      <Stack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{ headerShown: false, title: "Settings" }}
      />
      <Stack.Screen
        name="MainProfile"
        component={MainProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="ResetPassword" component={ResetPassword} options={{
          title: "Reset Password",
        }} />
      <Stack.Screen name="Privacy" component={Privacy} />
      <Stack.Screen name="Acount" component={Acount} />
      <Stack.Screen
        name="BlockedUser"
        component={BlockedUser}
        options={{
          title: "Blocked users",
        }}
      />
      <Stack.Screen
        name="NotificationsSetting"
        component={NotificationsSetting}
        options={{
          title: "Notifications",
          // headerShown: false,
          // headerStyle: {
          // backgroundColor: "#000",
          // },
          // headerTintColor: "white",
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 16,
    textAlign: "right",
  },
  viewProfile: {
    color: "#007BFF",
    fontSize: 16,
    textAlign: "right",
  },
  profileContainer: {
    alignItems: "center",
    marginVertical: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  editButton: {
    position: "absolute",
    top: 60,
    right: "40%",
    backgroundColor: "#000",
    padding: 4,
    borderRadius: 12,
  },
  editButtonText: {
    color: "#fff",
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  profileEmail: {
    color: "grey",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  menuText: {
    marginLeft: 16,
    fontSize: 16,
  },
  mainProfileContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Settings;
