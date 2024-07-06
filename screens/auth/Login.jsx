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



  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!email || !password) {
        Alert.alert("Please Fill All Fields");
        setLoading(false);
        return;
      }
      setLoading(false);
      console.log("Register Data==> ", { email, password });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <ImageBackground style={styles.container}>
      <Text style={styles.pageTitle}>FITTR</Text>
      <Text style={styles.pageTitle}>Sign In</Text>

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
        btnTitle="Login"
        loading={loading}
        handleSubmit={handleSubmit}
        onPress="Login"
      />
      <Text style={styles.linkText}>
        <Text
          style={styles.link1}
          onPress={() => navigation.navigate("ForgetPassword")}
        >
          Forget Password ?
        </Text>
      </Text>
      <Text style={styles.linkText}>
        Don't have an acount, Please ?{" "}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("Register")}
        >
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

export default Register;
