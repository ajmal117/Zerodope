import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [hideOldPassword, setHideOldPassword] = useState(true);
  const [hideNewPassword, setHideNewPassword] = useState(true);
  const [hideConfirmNewPassword, setHideConfirmNewPassword] = useState(true);

  const navigation = useNavigation();

  const togglePasswordVisibility = (setter) => {
    setter((prevState) => !prevState);
  };

  const handleSubmit = async () => {
    if (newPassword !== confirmNewPassword) {
      Alert.alert("Error", "New passwords do not match");
      return;
    }

    try {
      const token = await SecureStore.getItemAsync("token");
      const response = await axios.post(
        "https://beta.zerodope.in/api/auth/change-password",
        {
          password: newPassword,
          currentPassword: oldPassword,
          passwordConfirmation: confirmNewPassword,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        }
      );
      console.log("Response:", response.data);

      if (response.status === 200) {
        Alert.alert("Success", "Password has been changed successfully");
        navigation.goBack(); // Navigate to the previous screen
      } else {
        Alert.alert("Error", response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Failed to change password");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Old Password"
          secureTextEntry={hideOldPassword}
          onChangeText={setOldPassword}
          value={oldPassword}
          placeholderTextColor="#999"
        />
        <TouchableOpacity
          style={styles.icon}
          onPress={() => togglePasswordVisibility(setHideOldPassword)}
        >
          <Icon
            name={hideOldPassword ? "visibility-off" : "visibility"}
            size={20}
            color="#999"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="New Password"
          secureTextEntry={hideNewPassword}
          onChangeText={setNewPassword}
          value={newPassword}
          placeholderTextColor="#999"
        />
        <TouchableOpacity
          style={styles.icon}
          onPress={() => togglePasswordVisibility(setHideNewPassword)}
        >
          <Icon
            name={hideNewPassword ? "visibility-off" : "visibility"}
            size={20}
            color="#999"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirm New Password"
          secureTextEntry={hideConfirmNewPassword}
          onChangeText={setConfirmNewPassword}
          value={confirmNewPassword}
          placeholderTextColor="#999"
        />
        <TouchableOpacity
          style={styles.icon}
          onPress={() => togglePasswordVisibility(setHideConfirmNewPassword)}
        >
          <Icon
            name={hideConfirmNewPassword ? "visibility-off" : "visibility"}
            size={20}
            color="#999"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingTop: 40,
  },
  title: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    // paddingVertical: 10,
  },
  input: {
    flex: 1,
    color: "#000",
    height: 40,
    fontSize: 16,
  },
  icon: {
    padding: 5,
  },
  button: {
    backgroundColor: "#FAB917",
    borderRadius: 5,
    alignItems: "center",
    paddingVertical: 10,
    height: 40,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "400",
  },
});

export default ChangePassword;
