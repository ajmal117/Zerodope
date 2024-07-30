import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const ResetPassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [hideOldPassword, setHideOldPassword] = useState(true);
  const [hideNewPassword, setHideNewPassword] = useState(true);
  const [hideConfirmNewPassword, setHideConfirmNewPassword] = useState(true);

  const togglePasswordVisibility = (setter) => {
    setter((prevState) => !prevState);
  };

  const handleSubmit = () => {
    // Handle password change submission logic here
    console.log("Old Password:", oldPassword);
    console.log("New Password:", newPassword);
    console.log("Confirm New Password:", confirmNewPassword);
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Change Password</Text> */}

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
    paddingVertical: 10,
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
    // backgroundColor: "#00b894",
    backgroundColor: "#FAB917",
    borderRadius: 5,
    alignItems: "center",
    paddingVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ResetPassword;
