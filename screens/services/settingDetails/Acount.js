import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Acount = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Deactivate Account</Text>
          <Text style={styles.cardDescription}>
            Deactivating your account will disable your ZERODOPE profile. All
            the content that you have posted on the ZERODOPE app will be hidden.
            To restore your account, you will need to write to
            support@zerodope.com.
          </Text>
          <TouchableOpacity>
            <Text style={styles.deactivateButton}>Deactivate your Account</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Delete Account</Text>
          <Text style={styles.cardDescription}>
            Deleting your account will completely remove all your posts and
            details from the ZERODOPE app. You cannot recover your account once
            it is deleted. However, you can use the same email or phone to
            create a fresh account.
          </Text>
          <TouchableOpacity>
            <Text style={styles.deleteButton}>Delete your Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
    paddingHorizontal:10
    // backgroundColor: '#fff',
  },

  headerTitle: {
    color: "black",
    fontSize: 20,
    marginLeft: 16,
  },
  content: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
  },
  cardTitle: {
    color: "black",
    fontSize: 17,
    marginBottom: 8,
  },
  cardDescription: {
    color: "grey",
    fontSize: 16,
    marginBottom: 16,
  },
  deactivateButton: {
    color: "red",
    fontSize: 16,
  },
  deleteButton: {
    color: "red",
    fontSize: 16,
  },
});

export default Acount;
