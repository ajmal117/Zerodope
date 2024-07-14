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
import InputBox from "../components/form/InputBox";
import SubmitButton from "../components/form/SubmitButton";
import axios from "axios";
import { router } from "expo-router";

const ForgetPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!email) {
        Alert.alert("Error", "Please Fill All Fields");
        setLoading(false);
        return;
      }

      console.log("Request Payload:", { email });

      const response = await axios.post(
        "https://beta.zerodope.in/api/auth/forgot-password",
        {
          email: email,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response:", response.status);

      setLoading(false);
      Alert.alert(
        "Success",
        "Password reset link has been sent to your email."
      );
    } catch (error) {
      setLoading(false);
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      Alert.alert(
        "Error",
        error.response ? error.response.data.message : error.message
      );
    }
  };

  return (
    <ImageBackground style={styles.container}>
      <Text style={styles.pageTitle}>FITTR</Text>
      <Text style={styles.pageTitle}>Forget Password</Text>

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
      <SubmitButton
        btnTitle="Reset Password"
        loading={loading}
        handleSubmit={handleSubmit}
        onPress={handleSubmit}
      />
      <Text style={styles.linkText}>
        Already Registered?{" "}
        <Text style={styles.link} onPress={() => router.replace("login")}>
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
  linkText: {
    textAlign: "center",
  },
  link: {
    color: "red",
    height: 25,
  },
});

export default ForgetPassword;
