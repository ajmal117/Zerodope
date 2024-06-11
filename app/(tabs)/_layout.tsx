// import { Tabs } from "expo-router";
// import React from "react";

// import { TabBarIcon } from "@/components/navigation/TabBarIcon";
// import { useColorScheme } from "@/hooks/useColorScheme";

// export default function TabLayout() {
//   const colorScheme = useColorScheme();

//   return (
//     <Tabs
//       screenOptions={{
//         // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
//         headerShown: false,
//       }}
//     >
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: "Home",
//           tabBarIcon: ({ color, focused }) => (
//             <TabBarIcon
//               name={focused ? "home" : "home-outline"}
//               color={color}
//             />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="Login"
//         options={{
//           title: "Explore",
//           tabBarIcon: ({ color, focused }) => (
//             <TabBarIcon
//               name={focused ? "code-slash" : "code-slash-outline"}
//               color={color}
//             />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }


import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-paper";

import index from "./index"; // Replace with your actual screen component
import Homepage from "../../screens/home/Homepage"; // Replace with your actual screen component
// import SearchScreen from "./screens/SearchScreen"; // Replace with your actual screen component
// import ProfileScreen from "./screens/ProfileScreen"; // Replace with your actual screen component

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
        name="Search"
        component={Homepage}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color, size }) => (
            <Icon source="magnify" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Homepage}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Icon source="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function TabLayout() {
  return <MyTabs />;
}
