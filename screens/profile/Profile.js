import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  List,
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

const Stack = createStackNavigator();

const HomeProfile = ({ navigation }) => {
  const [username, setUsername] = useState("");

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
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.profileCard}>
        <TouchableOpacity onPress={() => navigation.navigate("MainProfile")}>
          <Card.Title
            title={`Hey, ${username}`}
            subtitle="Complete your profile here"
            left={(props) => <Avatar.Icon {...props} icon="account" />}
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
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => navigation.navigate("Review")}
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
          // right={() => <List.Icon icon="chevron-right" />}
          style={styles.listItem}
        />
        <List.Item
          title="Logout"
          left={() => <List.Icon icon="logout" />}
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => navigation.navigate("Logout")}
          style={styles.listItem}
        />
      </List.Section>
    </ScrollView>
  );
};

const Profile = () => {
  return (
    <Stack.Navigator initialRouteName="HomeProfile">
      <Stack.Screen name="HomeProfile" component={HomeProfile} />
      <Stack.Screen
        name="MainProfile"
        component={MainProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="MyOrders" component={MyOrders} />
      <Stack.Screen name="HelpSupport" component={HelpSupport} />
      <Stack.Screen name="Review" component={Review} />
      <Stack.Screen name="TermsConditions" component={TermsAndCond} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="AppVersion" component={AppVersion} />
      <Stack.Screen name="CommGuid" component={CommGuid} />
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
});

export default Profile;
