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
import axios from "axios";

const Register = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // const handleSubmit = async () => {
  //   try {
  //     setLoading(true);
  //     if (!name || !email || !password) {
  //       Alert.alert("Please Fill All Fields");
  //       setLoading(false);
  //       return;
  //     }
  //     setLoading(false);
  //     navigation.navigate("Login");
  //     console.log("Register Data==> ", { name, email, password });
  //   } catch (error) {
  //     setLoading(false);
  //     console.log(error);
  //   }
  // };
  const handleSubmit = () => {
    // console.log("Register Data==> ", { name, email, password });
    axios
      .post(
        "https://beta.zerodope.in/documentation#/Users-Permissions%20-%20Auth/post_auth_local_register",
        {
          username: name,
          email: email,
          password: password,
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ImageBackground style={styles.container}>
      <Text style={styles.pageTitle}>FITTR</Text>
      <Text style={styles.pageTitle}>Sign up</Text>

      <View style={styles.inputCont}>
        <Image
          source={require("../../assets/images/name.png")}
          style={styles.flag}
        />
        <InputBox
          placeholder="Name"
          autoComplete="Name"
          value={name}
          setValue={setName}
        />
      </View>
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
      <View style={styles.inputCont}>
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
      </View>
      <SubmitButton
        btnTitle="Register"
        loading={loading}
        handleSubmit={handleSubmit}
        onPress="Login"
      />
      <Text style={styles.linkText}>
        Already Register Please ?{" "}
        <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
          LOGIN
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
