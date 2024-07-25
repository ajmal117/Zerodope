import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Checkbox, Title, Paragraph } from "react-native-paper";

const CommGuid = () => {
  return (
    <ScrollView style={styles.container}>
      <Title style={styles.title}>Review Guidelines</Title>
      <View style={styles.section}>
        <Checkbox status="checked" color="green" />
        <View style={styles.textContainer}>
          <Title style={styles.sectionTitle}>Welcome to zerodope!</Title>
          <Paragraph style={styles.paragraph}>
            Hey there! Welcome to your new zerodope family where we get fit,
            learn, share, transform and become better version of ourselves
            everyday! To have a pleasurable experience, we request you to read
            all guidelines.
          </Paragraph>
        </View>
      </View>

      <View style={styles.section}>
        <Checkbox status="checked" color="green" />
        <View style={styles.textContainer}>
          <Title style={styles.sectionTitle}>
            Avoid self promotion or spam!
          </Title>
          <Paragraph style={styles.paragraph}>
            Needless to say we don't tolerate any sort of trolling or bullying
            and you'd be blocked immediately if you don't follow community
            guidelines. We do this so there's a safe environment for everyone.
            That doesn't mean you can't express yourself or raise your concern
            in a democratic manner. It's a transparent and open platform which
            learns and grows bigger and better with every feedback. We
            understand if you want to build a career in fitness industry, but
            that doesn't mean you'd start self-promotion.
          </Paragraph>
        </View>
      </View>

      <View style={styles.section}>
        <Checkbox status="checked" color="green" />
        <View style={styles.textContainer}>
          <Title style={styles.sectionTitle}>We rise by lifting others</Title>
          <Paragraph style={styles.paragraph}>
            This is a community of the people, by the people and for the people,
            which means that we believe in giving more than we take. The
            philosophy is what has turned zerodope from a small WhatsApp group
            into a large platform, and after having impacted millions of lives,
            we assure you that nothing good ever comes out of negativity and
            putting others down. At the end of the day, we're here to become a
            better version of ourselves and we can't be physically better
            without becoming mentally better. Engage in positivity, report
            negativity. Love people and you'd be loved in return, help people
            and you'd get more help than you can imagine. We mean it!
          </Paragraph>
        </View>
      </View>

      <View style={styles.section}>
        <Checkbox status="checked" color="green" />
        <View style={styles.textContainer}>
          <Title style={styles.sectionTitle}>The knowledge is free</Title>
          <Paragraph style={styles.paragraph}>
            Whether you joined the app through a friends' reference or
            accidentally.
          </Paragraph>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5", // Light background color
    padding: 12,
  },
  title: {
    color: "#000", // Dark text color
    textAlign: "center",
    marginBottom: 18,
  },
  section: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  sectionTitle: {
    color: "#000", // Dark text color
  },
  paragraph: {
    color: "#333", // Dark text color
  },
});

export default CommGuid;
