import App from "../../App";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper"; // Updated import for PaperProvider

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    secondary: "yellow",
  },
};

export default function TabOneScreen() {
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
}

// import React from "react";
// import { useFonts } from "expo-font";
// import AppLoading from "expo-app-loading";

// // import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import Homepage from "@/screens/home/Homepage";
// import WorkOutPlan from "@/screens/WorkOutPlan";
// import DietPlan from "@/screens/DietPlan";
// import ConsultSchedule from "@/screens/ConsultSchedule";
// import Profile from "@/screens/profile/Profile";

// const TabOneScreen = () => {
//   const Stack = createNativeStackNavigator();

//   let [fontsLoaded] = useFonts({
//     poppins: require("../../../assets/fonts/Poppins-ExtraLight.ttf"),
//     poppinsBold: require("../../../assets/fonts/Poppins-ExtraBold.ttf"),
//     poppinsMedium: require("../../../assets/fonts/Poppins-Medium.ttf"),
//     satoshiRegular: require("../../../assets/fonts/Satoshi-Regular.ttf"),
//   });

//   if (!fontsLoaded) {
//     return <AppLoading />;
//   }
//   return (
//     <Stack.Navigator initialRouteName="home">

//       <Stack.Screen
//         name="Home"
//         component={Homepage}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="Profile"
//         component={Profile}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="ConsultSchedule"
//         component={ConsultSchedule}
//         options={{ headerShown: false }}
//       />

//       <Stack.Screen
//         name="WorkOutPlan"
//         component={WorkOutPlan}
//         options={{
//           // headerShown: false,
//           // headerStyle: {
//           backgroundColor: "#000",
//           // },
//           // headerTintColor: "white",
//         }}
//       />

//       <Stack.Screen
//         name="DietPlan"
//         component={DietPlan}
//         options={{
//           // headerShown: false,
//           headerStyle: {
//             height: 0,
//           },
//         }}
//       />
//     </Stack.Navigator>
//   );
// };

// export default TabOneScreen;
