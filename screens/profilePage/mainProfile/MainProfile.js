import * as React from "react";
// import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ProfileProvider } from "./ProfileContext";
import ProfileFirst from "./ProfileFirst";
import EditProfileScreen from "./EditProfileScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
      <ProfileProvider>
        <Stack.Navigator initialRouteName="Profile" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Profile" component={ProfileFirst} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        </Stack.Navigator>
      </ProfileProvider>

  );
}
