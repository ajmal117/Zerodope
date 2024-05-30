import { StyleSheet } from "react-native";

import App from "../App.js";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    secondary: "yellow",
  },
};

export default function HomeScreen() {
  return (
    <>
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    </>
  );
}
