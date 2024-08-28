import { createStackNavigator } from "@react-navigation/stack";
import AppointCard from "./AppointCard";
import LinkCard from "./LinkCard";

const Stack = createStackNavigator();

export default function Appointment() {
  return (
    <Stack.Navigator initialRouteName="AppointCard">
      <Stack.Screen name="AppointCard" component={AppointCard} />
      <Stack.Screen name="LinkCard" component={LinkCard} />
    </Stack.Navigator>
  );
}
