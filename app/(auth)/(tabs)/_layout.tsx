// import React from "react";
// import FontAwesome from "@expo/vector-icons/FontAwesome";
// import { Link, Tabs } from "expo-router";
// import { Pressable } from "react-native";

// import Colors from "@/constants/Colors";
// import { useColorScheme } from "@/components/useColorScheme";
// import { useClientOnlyValue } from "@/components/useClientOnlyValue";

// // You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
// function TabBarIcon(props: {
//   name: React.ComponentProps<typeof FontAwesome>["name"];
//   color: string;
// }) {
//   return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
// }

// export default function TabLayout() {
//   const colorScheme = useColorScheme();

//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
//         // Disable the static render of the header on web
//         // to prevent a hydration error in React Navigation v6.
//         headerShown: useClientOnlyValue(false, true),
//       }}
//     >
//       <Tabs.Screen
//         name="index"
//         options={{
//           headerShown: false,
//           title: "Tab One",
//           tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
//           // headerRight: () => (
//           //   <Link href="/modal" asChild>
//           //     <Pressable>
//           //       {({ pressed }) => (
//           //         <FontAwesome
//           //           name="info-circle"
//           //           size={25}
//           //           color={Colors[colorScheme ?? "light"].text}
//           //           style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
//           //         />
//           //       )}
//           //     </Pressable>
//           //   </Link>
//           // ),
//         }}
//       />
//       {/* <Tab.Screen
//         name="home"
//         component={index}
//         options={{
//           tabBarLabel: "Home",
//           tabBarIcon: ({ color, size }) => (
//             <Icon source="home" color={color} size={size} />
//           ),
//         }}
//       /> */}
//       <Tabs.Screen
//         name="two"
//         options={{
//           title: "Tab Tw",
//           tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
//         }}
//       />
//     </Tabs>
//   );
// }

import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-paper";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import index from "./index"; // Replace with your actual screen component
import Homepage from "../../../screens/home/Homepage"; // Replace with your actual screen componen
import Chat from "../../../screens/services/Chat";
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
        tabBarStyle: { height: 80 },
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
      <Tab.Screen
        name="chat"
        component={Chat}
        options={{
          tabBarLabel: "Chat",
          tabBarIcon: ({ color, size }) => (
            <Icon source="chat-processing-outline" color={color} size={size} />
          ),
        }}
      />
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
