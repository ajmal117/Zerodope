import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "./plans/MainScreen";
import ScheduleScreen from "./plans/ScheduleScreen";

const Stack = createStackNavigator();

const ConsultSchedule = () => {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{ title: "Gym Consultation Plans" }}
      />
      <Stack.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{ title: "Select a Day" }}
      />
    </Stack.Navigator>
  );
};

export default ConsultSchedule;
