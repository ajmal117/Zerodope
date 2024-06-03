import { View, Text } from "react-native";
import React from "react";
import { useTheme } from "react-native-paper";

import Register from "@/screens/auth/Register";
import Login from "@/screens/auth/Login";
// import WorkOutPlan from "@/screens/WorkOutPlan";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

// import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WorkOutPlan from "@/screens/WorkOutPlan";
import DietPlan from "@/screens/DietPlan";

const App = () => {
  const theme = useTheme();
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
    // <NavigationContainer>
    <Stack.Navigator initialRouteName="WorkOutPlan">
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WorkOutPlan"
        component={WorkOutPlan}
        options={{
          headerShown: false,
          // headerStyle: {
            backgroundColor: "#000",
          // },
          headerTintColor: "white",
        }}
      />

      <Stack.Screen
        name="DietPlan"
        component={DietPlan}
        options={{
          headerStyle: {
            height: 0,
          },
        }}
      />
    </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default App;
