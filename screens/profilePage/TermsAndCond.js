import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text, Appbar } from "react-native-paper";

const TermsAndCond = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>TERMS AND CONDITIONS</Text>
        <Text style={styles.updated}>Last updated 05-02-2024</Text>
        <Text style={styles.text}>
          Welcome to zerodope (the “Platform”), an e-commerce platform operated
          by Squats Fitness Private Limited (“Squats”, “Company”, “we,” “us” or
          “our”). Squats’ registered office is located at MIG 147, Sector B,
          Indra Nagar, Mandideep, Raisen, Madhya Pradesh, 462046, and its
          corporate office is located at 411, Platinum Square, Viman Nagar,
          Pune, Maharashtra, 411014.
        </Text>
        <Text style={styles.text}>
          This document is an electronic record in terms of Information
          Technology Act, 2000 and published in accordance with the provisions
          of Rule 4 of the Information Technology (Reasonable security practices
          and procedures and sensitive personal data or information) Rules, 2011
          that require publishing the Rules and Regulations, Privacy Policy and
          Terms and Conditions for access or usage of Platform through zerodope
          Mobile Application (hereinafter referred to as “Mobile Application”)
          and Website – [www.zerodope.com] (hereinafter referred to as
          "Website") and our related Website, Application, Services, Products,
          Devices and content (together with the Mobile Application and Website,
          collectively referred to as “Services”).
        </Text>
        <Text style={styles.heading}>AGREEMENT TO TERMS</Text>
        {/* Add more content here as needed */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#1c1c1e",
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    // color: "#fff",
    textAlign: "center",
    marginVertical: 10,
  },
  updated: {
    fontSize: 14,
    // color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    // color: "#fff",
    marginBottom: 15,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    // color: "#fff",
    marginVertical: 10,
  },
});

export default TermsAndCond;
