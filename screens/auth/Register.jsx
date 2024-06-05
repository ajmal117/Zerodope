import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import InputBox from "../../components/form/InputBox";
import SubmitButton from "../../components/form/SubmitButton";
import { ImageBackground } from "react-native";

const Register = ({ navigation }) => {
  // const localImage = require("../../assets/images/gymi.jpg");
  const localImage = require("../../assets/images/bgimage.jpg");
  // states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async ({ navigation }) => {
    try {
      setLoading(true);
      if (!name || !email || !password) {
        Alert.alert("Please Fill All Fields");
        setLoading(false);
        return;
      }
      setLoading(false);
      // const { data } = await axios.post("/auth/register", {
      //   name,
      //   email,
      //   password,
      // });
      // alert(data && data.message);
      navigation.navigate("Login");
      console.log("Register Data==> ", { name, email, password });
    } catch (error) {
      // alert(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <ImageBackground  source={localImage} style={styles.container}>
      <Text style={styles.pageTitle}>Register</Text>
      <View style={{ marginHorizontal: 20 }}>
        <InputBox inputTitle={"Name"} value={name} setValue={setName} />
        <InputBox
          inputTitle={"Email"}
          keyboardType="email-address"
          autoComplete="email"
          value={email}
          setValue={setEmail}
        />
        <InputBox
          inputTitle={"Password"}
          secureTextEntry={true}
          autoComplete="password"
          value={password}
          setValue={setPassword}
        />
      </View>
      <Text>{JSON.stringify({ name, email, password }, null, 4)}</Text>
      <SubmitButton
        btnTitle="Register"
        loading={loading}
        handleSubmit={handleSubmit}
        onPress="Login"
      />
      <Text style={styles.linkText}>
        Already Register Please ?{" "}
        <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>LOGIN</Text>{" "}
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
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1e2225",
    marginBottom: 20,
  },
  inputBox: {
    height: 16,
    marginBottom: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 10,
    color: "#af9f85",
  },
  linkText: {
    textAlign: "center",
  },
  link: {
    color: "red",
    height: 25,
    // borderRadius: 80,
  },
});

export default Register;
