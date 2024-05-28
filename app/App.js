import { View, Text } from "react-native";
import React from "react";
import { useTheme } from "react-native-paper";

import Register from "@/screens/auth/Register";
import Login from "@/screens/auth/Login";
// import WorkOutPlan from "@/screens/WorkOutPlan";

// import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WorkOutPlan from "@/screens/WorkOutPlan";
import DietPlan from "@/screens/DietPlan";

const App = () => {
  const theme = useTheme();
  const Stack = createNativeStackNavigator();

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
          headerStyle: {
            backgroundColor: "black",
          },
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
