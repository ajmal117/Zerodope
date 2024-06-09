// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   Alert,
//   ImageBackground,
// } from "react-native";
// import React, { useState } from "react";
// // import { AuthContext } from "../../context/authContext";
// import InputBox from "../../components/form/InputBox";
// import SubmitButton from "../../components/form/SubmitButton";

// const Login = ({ navigation }) => {
//   // const localImage = require("../../assets/images/bgimage.jpg");
//   //global state

//   //   const [state, setState] = useContext(AuthContext);

//   // states
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   //function
//   // btn funcn
//   const handleSubmit = async () => {
//     try {
//       setLoading(true);
//       if (!email || !password) {
//         Alert.alert("Please Fill All Fields");
//         setLoading(false);
//         return;
//       }
//       setLoading(false);
//       //   const { data } = await axios.post("/auth/login", { email, password });
//       //   setState(data);
//       //   await AsyncStorage.setItem("@auth", JSON.stringify(data));
//       //   alert(data && data.message);
//       //   navigation.navigate("Home");
//       console.log("Login Data==> ", { email, password });
//     } catch (error) {
//       //   alert(error.response.data.message);
//       setLoading(false);
//       console.log(error);
//     }
//   };
//   //temp function to check local storage data

//   //   const getLcoalStorageData = async () => {
//   //     let data = await AsyncStorage.getItem("@auth");
//   //     console.log("Local Storage ==> ", data);
//   //   };
//   //   getLcoalStorageData();

//   return (
//     <ImageBackground style={styles.container}>
//       <Text style={styles.pageTitle}>Login</Text>
//       <View style={{ marginHorizontal: 20 }}>
//         <InputBox
//           inputTitle={"Email"}
//           keyboardType="email-address"
//           autoComplete="email"
//           value={email}
//           setValue={setEmail}
//         />
//         <InputBox
//           inputTitle={"Password"}
//           secureTextEntry={true}
//           autoComplete="password"
//           value={password}
//           setValue={setPassword}
//         />
//       </View>
//       {/* <Text>{JSON.stringify({ name, email, password }, null, 4)}</Text> */}
//       <SubmitButton
//         btnTitle="Login"
//         loading={loading}
//         handleSubmit={handleSubmit}
//       />
//       <Text style={styles.linkText}>
//         Not a user Please?{" "}
//         <Text
//           style={styles.link}
//           onPress={() => navigation.navigate("Register")}
//         >
//           REGISTER
//         </Text>{" "}
//       </Text>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     // backgroundColor: "#e1d5c9",
//     backgroundColor: "#fff",
//   },
//   pageTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     textAlign: "center",
//     color: "#1e2225",
//     marginBottom: 20,
//   },
//   inputBox: {
//     height: 40,
//     marginBottom: 20,
//     backgroundColor: "#ffffff",
//     borderRadius: 10,
//     marginTop: 10,
//     paddingLeft: 10,
//     color: "#af9f85",
//   },
//   linkText: {
//     textAlign: "center",
//   },
//   link: {
//     color: "red",
//   },
// });

// export default Login;

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  Image,
  ImageBackground,
} from "react-native";
import InputBox from "../../components/form/InputBox";
import SubmitButton from "../../components/form/SubmitButton";

const Register = ({ navigation }) => {
  //   const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!email) {
        Alert.alert("Please Fill All Fields");
        setLoading(false);
        return;
      }
      setLoading(false);
      console.log("Register Data==> ", { email });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <ImageBackground style={styles.container}>
      <Text style={styles.pageTitle}>FITTR</Text>
      <Text style={styles.pageTitle}>Forget Password</Text>

      <View style={styles.inputCont}>
        <Image
          source={require("../../assets/images/email.jpg")}
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
      {/* <View style={styles.inputCont}>
        <Image
          source={require("../../assets/images/password.webp")}
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
      </View> */}
      <SubmitButton
        btnTitle="Get OTP"
        loading={loading}
        handleSubmit={handleSubmit}
        onPress="Login"
      />
      <Text style={styles.linkText}>
        Already Register Please ?{" "}
        <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
          Login
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
  },

  link: {
    color: "red",
    height: 25,
  },
});

export default Register;
