// import { Button, StyleSheet, TextInput } from "react-native";
// import { Text, View } from "@/components/Themed";
// import { useSession } from "./ctx";
// import { router } from "expo-router";

// export default function Login() {
//   const { signIn } = useSession();
//   const handleLogin = () => {
//     //Adicione sua lógica de login aqui
//     signIn();
//     //Antes de navegar, tenha certeza de que o usuário está autenticado
//     router.replace("/");
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome! 🌈 </Text>
//       <Text style={styles.paragraph}>
//         This is a simple repo that emulates a login authentication workflow
//         using Expo Router, focused on the navigation aspect.
//       </Text>
//       <View
//         style={styles.separator}
//         lightColor="#eee"
//         darkColor="rgba(255,255,255,0.1)"
//       />
//       <TextInput placeholder="Username(not required)" style={styles.input} />
//       <TextInput
//         placeholder="Password(not required)"
//         secureTextEntry
//         style={styles.input}
//       />
//       <Button title="Login" onPress={handleLogin} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   paragraph: {
//     margin: 24,
//     fontSize: 18,
//     textAlign: "center",
//   },

//   separator: {
//     marginVertical: 30,
//     height: 1,
//     width: "80%",
//   },
//   input: {
//     width: "80%",
//     borderWidth: 1,
//     borderColor: "#000",
//     padding: 10,
//     margin: 10,
//     borderRadius: 4,
//   },
// });

import React, { useState } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSession } from "./ctx";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  Image,
  ImageBackground,
} from "react-native";
import InputBox from "../components/form/InputBox";
import SubmitButton from "../components/form/SubmitButton";
import axios from "axios";
import { router } from "expo-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { signIn } = useSession();

  // const { setToken } = useAuth();

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Check if email and password fields are filled
      if (!email || !password) {
        Alert.alert("Error", "Please Fill All Fields");
        setLoading(false);
        return;
      }

      // Log register data for debugging purposes
      console.log("Register Data==> ", { email, password });

      // Make API call to register the user
      const response = await axios.post(
        "https://beta.zerodope.in/api/auth/local",
        {
          identifier: email,
          password: password,
        }
      );

      // Log the API response
      console.log(response.data);
      console.log(response.data.jwt);
      signIn();

      // token store in asyncStore
      // await AsyncStorage.setItem("token", response.data.jwt);

      // Stop loading state
      setLoading(false);

      // Navigate to Homepage if login is successful
      if (response.data.jwt) {
        router.replace("/");
        Alert.alert("Login Successfull");
      }
    } catch (error) {
      // Handle any errors
      setLoading(false);
      console.log(error.response ? error.response.data : error.message);
    }
  };

  return (
    <ImageBackground style={styles.container}>
      <Text style={styles.pageTitle}>FITTR</Text>
      <Text style={styles.pageTitle}>Sign In</Text>

      <View style={styles.inputCont}>
        <Image
          source={require("../assets/images/email.jpg")}
          style={styles.flag}
        />
        <InputBox
          placeholder="Email"
          keyboardType="email-address"
          autoComplete="email"
          value={email}
          setValue={setEmail}
        />
      </View>
      <View style={styles.inputCont}>
        <Image
          source={require("../assets/images/password.webp")}
          style={styles.flag}
        />
        <InputBox
          inputTitle={"Password"}
          placeholder="Password"
          secureTextEntry={true}
          autoComplete="password"
          value={password}
          setValue={setPassword}
        />
      </View>
      <SubmitButton
        btnTitle="Login"
        loading={loading}
        handleSubmit={handleSubmit}
        onPress={handleSubmit}
      />
      <Text style={styles.linkText}>
        <Text
          style={styles.link1}
          onPress={() => router.replace("ForgetPassword")}
        >
          Forget Password ?
        </Text>
      </Text>
      <Text style={styles.linkText}>
        Don't have an account, Please ?{" "}
        <Text style={styles.link} onPress={() => router.replace("Register")}>
          SIGN UP
        </Text>
      </Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  flag: {
    width: 30,
    height: 26,
    marginRight: 10,
  },
  inputCont: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 6,
    marginVertical: 16,
    paddingHorizontal: 10,
    height: 45, // Adjust the height as per your design
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e2225",
    marginBottom: 10,
  },
  inputBox: {
    flex: 1,
    height: 40, // Adjust the height as per your design
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginTop: 10,
    color: "#af9f85",
    paddingHorizontal: 10,
  },
  linkText: {
    textAlign: "center",
    marginVertical: 4,
  },
  link1: {
    fontSize: 16,
    color: "#0d99ff",
    height: 25,
  },
  link: {
    color: "red",
    height: 25,
  },
});

export default Login;
