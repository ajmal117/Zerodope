import React, { useState } from "react";
import * as SecureStore from "expo-secure-store";
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

  const saveToSecureStore = async (key, value) => {
    try {
      // Ensure value is a string
      const stringValue =
        typeof value === "string" ? value : JSON.stringify(value);
      await SecureStore.setItemAsync(key, stringValue);
      console.log(`Saved ${key} to SecureStore with value: ${stringValue}`);
    } catch (error) {
      console.log(`Error saving ${key}:`, error);
    }
  };
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
      console.log("API Response==>", response.data);
      const { jwt, user } = response.data;

      // Ensure user data is valid
      if (!user || !user.id) {
        console.log("User data is not available in the response");
        Alert.alert("Error", "Failed to retrieve user data");
        setLoading(false);
        return;
      }

      // Save values to SecureStore
      await saveToSecureStore("token", jwt);
      await saveToSecureStore("username", user.username);
      await saveToSecureStore("userid", String(user.id)); // Convert user.id to string
      await saveToSecureStore("email", user.email); // Convert user.id to string

      signIn();

      if (jwt) {
        router.replace("/");
        Alert.alert("Logged in Successfully");
      }

      // Stop loading state
      setLoading(false);
    } catch (error) {
      // Handle any errors
      Alert.alert("Error", "Enter valid email and password");
      setLoading(false);
      console.log(error.response ? error.response.data : error.message);
    }
  };

  return (
    <ImageBackground style={styles.container}>
      <Text style={styles.pageTitle}>ZERODOPE</Text>
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

//back stop comp

// import React, { useState, useEffect } from "react";
// import {
//   BackHandler,
//   View,
//   Text,
//   StyleSheet,
//   Alert,
//   Image,
//   ImageBackground,
// } from "react-native";
// import * as SecureStore from "expo-secure-store";
// import { useSession } from "./ctx";
// import InputBox from "../components/form/InputBox";
// import SubmitButton from "../components/form/SubmitButton";
// import axios from "axios";
// import { router } from "expo-router";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const { signIn } = useSession();

//   useEffect(() => {
//     const backAction = () => {
//       // Prevent going back to the login page
//       return true;
//     };

//     const backHandler = BackHandler.addEventListener(
//       "hardwareBackPress",
//       backAction
//     );

//     return () => backHandler.remove();
//   }, []);

//   const saveToSecureStore = async (key, value) => {
//     try {
//       const stringValue =
//         typeof value === "string" ? value : JSON.stringify(value);
//       await SecureStore.setItemAsync(key, stringValue);
//       console.log(`Saved ${key} to SecureStore with value: ${stringValue}`);
//     } catch (error) {
//       console.log(`Error saving ${key}:`, error);
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       setLoading(true);
//       if (!email || !password) {
//         Alert.alert("Error", "Please Fill All Fields");
//         setLoading(false);
//         return;
//       }

//       console.log("Register Data==> ", { email, password });

//       const response = await axios.post(
//         "https://beta.zerodope.in/api/auth/local",
//         {
//           identifier: email,
//           password: password,
//         }
//       );

//       console.log("API Response==>", response.data);
//       const { jwt, user } = response.data;

//       if (!user || !user.id) {
//         console.log("User data is not available in the response");
//         Alert.alert("Error", "Failed to retrieve user data");
//         setLoading(false);
//         return;
//       }

//       await saveToSecureStore("token", jwt);
//       await saveToSecureStore("username", user.username);
//       await saveToSecureStore("userid", String(user.id));
//       await saveToSecureStore("email", user.email);

//       signIn();

//       if (jwt) {
//         router.replace("/");
//         Alert.alert("Logged in Successfully");
//       }

//       setLoading(false);
//     } catch (error) {
//       Alert.alert("Error", "Enter valid email and password");
//       setLoading(false);
//       console.log(error.response ? error.response.data : error.message);
//     }
//   };

//   return (
//     <ImageBackground style={styles.container}>
//       <Text style={styles.pageTitle}>ZERODOPE</Text>
//       <Text style={styles.pageTitle}>Sign In</Text>

//       <View style={styles.inputCont}>
//         <Image
//           source={require("../assets/images/email.jpg")}
//           style={styles.flag}
//         />
//         <InputBox
//           placeholder="Email"
//           keyboardType="email-address"
//           autoComplete="email"
//           value={email}
//           setValue={setEmail}
//         />
//       </View>
//       <View style={styles.inputCont}>
//         <Image
//           source={require("../assets/images/password.webp")}
//           style={styles.flag}
//         />
//         <InputBox
//           inputTitle={"Password"}
//           placeholder="Password"
//           secureTextEntry={true}
//           autoComplete="password"
//           value={password}
//           setValue={setPassword}
//         />
//       </View>
//       <SubmitButton
//         btnTitle="Login"
//         loading={loading}
//         handleSubmit={handleSubmit}
//         onPress={handleSubmit}
//       />
//       <Text style={styles.linkText}>
//         <Text
//           style={styles.link1}
//           onPress={() => router.replace("ForgetPassword")}
//         >
//           Forget Password ?
//         </Text>
//       </Text>
//       <Text style={styles.linkText}>
//         Don't have an account, Please ?{" "}
//         <Text style={styles.link} onPress={() => router.replace("Register")}>
//           SIGN UP
//         </Text>
//       </Text>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignContent: "center",
//     backgroundColor: "#fff",
//     paddingHorizontal: 20,
//   },
//   flag: {
//     width: 30,
//     height: 26,
//     marginRight: 10,
//   },
//   inputCont: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 1,
//     borderRadius: 6,
//     marginVertical: 16,
//     paddingHorizontal: 10,
//     height: 45,
//   },
//   pageTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#1e2225",
//     marginBottom: 10,
//   },
//   inputBox: {
//     flex: 1,
//     height: 40,
//     backgroundColor: "#ffffff",
//     borderRadius: 10,
//     marginTop: 10,
//     color: "#af9f85",
//     paddingHorizontal: 10,
//   },
//   linkText: {
//     textAlign: "center",
//     marginVertical: 4,
//   },
//   link1: {
//     fontSize: 16,
//     color: "#0d99ff",
//     height: 25,
//   },
//   link: {
//     color: "red",
//     height: 25,
//   },
// });

// export default Login;
