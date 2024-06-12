
import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-paper";

import index from "./index"; // Replace with your actual screen component
import Homepage from "../../screens/home/Homepage"; // Replace with your actual screen component

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#6200ee",
        tabBarStyle: { height: 80 },
      }}
    >
      <Tab.Screen
        name="index"
        component={index}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Icon source="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="chat"
        component={Homepage}
        options={{
          tabBarLabel: "Chat",
          tabBarIcon: ({ color, size }) => (
            <Icon source="chat-processing-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="coach"
        component={Homepage}
        options={{
          tabBarLabel: "Get a Coach",
          tabBarIcon: ({ color, size }) => (
            <Icon source="police-badge-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="notifications"
        component={Homepage}
        options={{
          tabBarLabel: "Notifications",
          tabBarIcon: ({ color, size }) => (
            <Icon source="bell-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="tools"
        component={Homepage}
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

export default function TabLayout() {
  return <MyTabs />;
}
