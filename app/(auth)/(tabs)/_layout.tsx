import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-paper";
import index from "./index"; // Replace with your actual screen component
// import Homepage from "../../../screens/home/Homepage"; // Replace with your actual screen component
// import Chat from "../../../screens/services/Chat";
import Notification from "../../../screens/services/Notification";
import Coach from "../../../screens/services/Coach";
import Tools from "../../../screens/services/Tools";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#6200ee",
        // tabBarStyle: { height: 60 },
        tabBarLabelStyle: { marginBottom: 5 }, // Adjust the bottom margin to reduce the gap
      }}
    >
      <Tab.Screen
        name="home"
        component={index}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Icon source="home" color={color} size={size} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="chat"
        component={Chat}
        options={{
          tabBarLabel: "Chat",
          tabBarIcon: ({ color, size }) => (
            <Icon source="chat-processing-outline" color={color} size={size} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="coach"
        component={Coach}
        options={{
          tabBarLabel: "Get a Coach",
          tabBarIcon: ({ color, size }) => (
            <Icon source="police-badge-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="notifications"
        component={Notification}
        options={{
          tabBarLabel: "Notifications",
          tabBarIcon: ({ color, size }) => (
            <Icon source="bell-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="tools"
        component={Tools}
        options={{
          tabBarLabel: "Tools",
          tabBarIcon: ({ color, size }) => (
            <Icon source="bag-personal-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function TabLayout() {
  return <MyTabs />;
}

export default TabLayout;
