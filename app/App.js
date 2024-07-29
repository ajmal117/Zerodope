import React from "react";
// import { useFonts } from "expo-font";
// import AppLoading from "expo-app-loading";

// import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Homepage from "@/screens/home/Homepage";
import WorkOutPlan from "@/screens/WorkOutPlan";
import DietPlan from "@/screens/DietPlan";
import ConsultSchedule from "@/screens/ConsultSchedule";
import Profile from "@/screens/profile/Profile";
import BodyBuildingPlan from "../screens/BodyBuildingPlan";
import FreeSupport from "../screens/consultPlan/FreeSupport";
import BookNow from "../screens/booknow/BookNow";
import BodyBuildData from "../screens/bodyBuild/BodyBuildData";

const App = () => {
  const Stack = createNativeStackNavigator();

  // let [fontsLoaded] = useFonts({

  // });

  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // }
  return (
    <Stack.Navigator initialRouteName="Home">
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
          title: "WorkOut Plan",
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
          title: "Body Building",
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
      <Stack.Screen
        name="BookNow"
        component={BookNow}
        options={{
          // title: "Free Support",
          // headerShown: false,
          // headerStyle: {
          backgroundColor: "#000",
          // },
          // headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="BodyBuildData"
        component={BodyBuildData}
        options={{
          title: "Day Data",
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
