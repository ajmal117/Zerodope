import React, { useState } from "react";
import { View, Text, Switch, StyleSheet, TouchableOpacity } from "react-native";

const Privacy = ({ navigation }) => {
  const [isPrivate, setIsPrivate] = useState(false);

  const toggleSwitch = () => setIsPrivate((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.privacySetting}>
          <View style={styles.row}>
            <Text style={styles.privacyText}>Privacy Setting</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isPrivate ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isPrivate}
              style={styles.switch}
            />
          </View>
          <Text style={styles.privacyDescription}>
            When your account is private, only people you approve can follow you
            or see your profile posts.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 30,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  headerTitle: {
    color: "black",
    fontSize: 20,
    marginLeft: 16,
  },
  content: {
    flex: 1,
    // alignItems: "center",
  },
  privacySetting: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 10,
    // width: "90%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  privacyText: {
    color: "black",
    fontSize: 17,
  },
  switch: {
    marginLeft: "auto",
  },
  privacyDescription: {
    color: "grey",
    fontSize: 16,
    marginTop: 16,
  },
});

export default Privacy;
