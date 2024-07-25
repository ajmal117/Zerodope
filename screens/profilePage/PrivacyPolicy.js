import * as React from "react";
import { ScrollView, StyleSheet, View, Linking } from "react-native";
import {
  Provider as PaperProvider,
  Appbar,
  Text,
  Title,
  Paragraph,
  TouchableRipple,
} from "react-native-paper";

const handlePress = (url) => {
  Linking.openURL(url);
};

export default function PrivacyPolicy() {
  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={styles.container}>
        <Title style={styles.para}>PRIVACY POLICY</Title>
        <Text style={styles.date} >Last updated 27-11-2023</Text>
        <Paragraph style={styles.para}>
          Thank you for choosing to be part of our community at Squats Fitness
          Private Limited, doing business as zerodope (“
          <Text style={styles.bold}>zerodope</Text>”, “
          <Text style={styles.bold}>we</Text>”, “
          <Text style={styles.bold}>us</Text>”, or “
          <Text style={styles.bold}>our</Text>”). We are committed to protecting
          your personal information and your right to privacy. If you have any
          questions or concerns about our policy, or our practices with regards
          to your personal information, please contact us at
          <TouchableRipple
            onPress={() => handlePress("mailto:support@zerodope.com")}
            style={styles.para}
          >
            <Text style={styles.link}> support@zerodope.com</Text>
          </TouchableRipple>
          , or reach out to our Data Protection Officer at
          <TouchableRipple
            onPress={() => handlePress("mailto:dpo@zerodope.com")}
            style={styles.para}
          >
            <Text style={styles.link}> dpo@zerodope.com</Text>
          </TouchableRipple>
          , whose contact details are listed at the end of this policy.
        </Paragraph>
        <Paragraph style={styles.para}>
          The use of our Platform which includes zerodope Mobile Application
          (hereinafter referred to as “
          <Text style={styles.bold}>Mobile Application</Text>”) and Internet
          pages of zerodope Website –
          <TouchableRipple
          style={styles.para}
            onPress={() => handlePress("https://www.zerodope.com")}
          >
            <Text style={styles.link}> www.zerodope.com</Text>
          </TouchableRipple>{" "}
          (hereinafter referred to as "<Text style={styles.bold}>Website</Text>
          ") and our related Websites, platforms, Applications, Services,
          Products and content (together with the Mobile Application and
          Website, collectively referred to as “
          <Text style={styles.bold}>Services</Text>”) is possible without any
          indication of personal data; however, if a data subject wants to use
          our services via our website or mobile application, processing of
          personal data could become necessary. If the processing of personal
          data is necessary and there is no statutory basis for such processing,
          we generally obtain consent from the data subject.
        </Paragraph>
      </ScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    color: "black",
  },
  bold: {
    fontWeight: "bold",
    color: "black",
  },
  date: {
    marginVertical: 8,
    color: "black",
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
  para: {
    color: "black",
  },
});
