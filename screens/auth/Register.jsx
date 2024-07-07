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
      // Check if email and password fields are filled
      if (!email || !password) {
        Alert.alert("Error", "Please Fill All Fields");
        setLoading(false);
        return;
      }

      // Log register data for debugging purposes
      console.log("Register Data==> ", { name, email, password });

      // Make API call to register the user
      const response = await axios.post(
        "https://beta.zerodope.in/api/auth/local/register",
        {
          username: name,
          email: email,
          password: password,
        }
      );

      console.log(response.status);
      // Log the API response
      if (response.status === 200) {
        navigation.navigate("Login");
      }
      Alert.alert("Register succesfully");

      // Stop loading state
      setLoading(false);
    } catch (error) {
      // Handle any errors
      setLoading(false);
      console.log(error.response ? error.response.data : error.message);
      Alert.alert(
        "Email or Password is incorrect",
        error.response ? error.response.data.message : error.message
      );
    }
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
        onPress={handleSubmit}
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
