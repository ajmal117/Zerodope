import React from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

// import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Homepage from "@/screens/home/Homepage";
import WorkOutPlan from "@/screens/WorkOutPlan";
import DietPlan from "@/screens/DietPlan";
import ConsultSchedule from "@/screens/ConsultSchedule";
import Profile from "@/screens/profile/Profile";
import BodyBuildingPlan from "../screens/BodyBuildingPlan";
import FreeSupport from "../screens/consultPlan/FreeSupport";

const App = () => {
  const Stack = createNativeStackNavigator();

  let [fontsLoaded] = useFonts({
    poppins: require("../assets/fonts/Poppins-ExtraLight.ttf"),
    poppinsBold: require("../assets/fonts/Poppins-ExtraBold.ttf"),
    poppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
    satoshiRegular: require("../assets/fonts/Satoshi-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen
        name="Home"
        component={Homepage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ConsultSchedule"
        component={ConsultSchedule}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="WorkOutPlan"
        component={WorkOutPlan}
        options={{
          // headerShown: false,
          // headerStyle: {
          backgroundColor: "#000",
          // },
          // headerTintColor: "white",
        }}
      />

      <Stack.Screen
        name="DietPlan"
        component={DietPlan}
        options={{
          title: "Diet Plan",
          // headerShown: false,
          headerStyle: {
            height: 0,
          },
        }}
      />
      <Stack.Screen
        name="BodyBuild"
        component={BodyBuildingPlan}
        options={{
          title: "Body Building Plan",
          // headerShown: false,
          // headerStyle: {
          backgroundColor: "#000",
          // },
          // headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="FreeSupport"
        component={FreeSupport}
        options={{
          title: "Free Support",
          // headerShown: false,
          // headerStyle: {
          backgroundColor: "#000",
          // },
          // headerTintColor: "white",
        }}
      />
    </Stack.Navigator>
  );
};

export default App;
