import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "./consultPlan/MainScreen";
import ScheduleScreen from "./consultPlan/ScheduleScreen";

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
