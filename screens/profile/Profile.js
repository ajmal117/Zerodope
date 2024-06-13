import * as React from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  List,
} from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const HomeProfile = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <Card style={styles.profileCard}>
        <Card.Title
          title="Hey, Rahul"
          subtitle="Complete your profile here"
          left={(props) => <Avatar.Icon {...props} icon="account" />}
          onPress={() => navigation.navigate("Profile")}
        />
      </Card>
      <List.Section style={styles.ListSection}>
        <List.Item
          title="Fitcoins"
          left={() => <List.Icon icon="currency-usd" />}
          onPress={() => navigation.navigate("Fitcoins")}
        />
        <List.Item
          title="Leaderboard"
          left={() => <List.Icon icon="trophy-outline" />}
          onPress={() => navigation.navigate("Leaderboard")}
        />
        <List.Item
          title="My Bookmarks"
          left={() => <List.Icon icon="bookmark-outline" />}
          onPress={() => navigation.navigate("Bookmarks")}
        />
        <List.Item
          title="My Orders"
          left={() => <List.Icon icon="cart" />}
          onPress={() => navigation.navigate("Orders")}
        />
      </List.Section>
      <List.Section style={styles.ListSection}>
        <List.Item
          title="Help & Support"
          left={() => <List.Icon icon="help-circle" />}
          onPress={() => navigation.navigate("HelpSupport")}
        />
        <List.Item
          title="Review"
          left={() => <List.Icon icon="star-outline" />}
          onPress={() => navigation.navigate("Review")}
        />
        <List.Item
          title="Terms & Conditions"
          left={() => <List.Icon icon="file-document-outline" />}
          onPress={() => navigation.navigate("TermsConditions")}
        />
        <List.Item
          title="Privacy Policy"
          left={() => <List.Icon icon="shield-star-outline" />}
          onPress={() => navigation.navigate("PrivacyPolicy")}
        />
        <List.Item
          title="Community Guidelines"
          left={() => <List.Icon icon="file-check-outline" />}
          onPress={() => navigation.navigate("CommunityGuidelines")}
        />
      </List.Section>
      <List.Section style={styles.ListSection}>
        <List.Item
          title="App Version: 5.8.3 (3)"
          left={() => <List.Icon icon="cellphone" />}
        />
        <List.Item
          title="Logout"
          left={() => <List.Icon icon="logout" />}
          onPress={() => navigation.navigate("Logout")}
        />
      </List.Section>
    </ScrollView>
  );
};

const ProfileScreen = () => {
  return (
    <View>
      <Text>Profile Screen</Text>
    </View>
  );
};
const FitcoinsScreen = () => {
  return (
    <View>
      <Text>Profile Screen</Text>
    </View>
  );
};
const LeaderboardScreen = () => (
  <View>
    <Text>Leaderboard Screen</Text>
  </View>
);
const BookmarksScreen = () => (
  <View>
    <Text>Bookmarks Screen</Text>
  </View>
);
const OrdersScreen = () => (
  <View>
    <Text>Orders Screen</Text>
  </View>
);
const HelpSupportScreen = () => (
  <View>
    <Text>Help & Support Screen</Text>
  </View>
);
const ReviewScreen = () => (
  <View>
    <Text>Review Screen</Text>
  </View>
);
const TermsConditionsScreen = () => (
  <View>
    <Text>Terms & Conditions Screen</Text>
  </View>
);
const PrivacyPolicyScreen = () => (
  <View>
    <Text>Privacy Policy Screen</Text>
  </View>
);
const CommunityGuidelinesScreen = () => (
  <View>
    <Text>Community Guidelines Screen</Text>
  </View>
);
const LogoutScreen = () => (
  <View>
    <Text>Logout Screen</Text>
  </View>
);

const Profile = () => {
  return (
    <Stack.Navigator initialRouteName="HomeProfile">
      <Stack.Screen name="HomeProfile" component={HomeProfile} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="Fitcoins" component={FitcoinsScreen} />
      <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
      <Stack.Screen name="Bookmarks" component={BookmarksScreen} />
      <Stack.Screen name="Orders" component={OrdersScreen} />
      <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
      <Stack.Screen name="Review" component={ReviewScreen} />
      <Stack.Screen name="TermsConditions" component={TermsConditionsScreen} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
      <Stack.Screen
        name="CommunityGuidelines"
        component={CommunityGuidelinesScreen}
      />
      <Stack.Screen name="Logout" component={LogoutScreen} />
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
    elevation: 1, // Add elevation for shadow effect
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 1 }, // Shadow offset
    shadowOpacity: 0.5, // Shadow opacity
    shadowRadius: 12, // Shadow radius
  },
});

export default Profile;
