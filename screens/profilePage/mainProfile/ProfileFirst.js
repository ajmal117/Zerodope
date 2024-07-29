import React, { useContext } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Button, IconButton, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { ProfileContext } from "./ProfileContext";
import avatar from "../../../assets/images/c1.jpg";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const ProfileFirst = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { profile } = useContext(ProfileContext);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
      </View>
      <View style={styles.profileImageContainer}>
        <Image
          source={avatar} // replace with actual image source
          style={styles.profileImage}
        />
      </View>
      <Text style={styles.name}>{profile.name}</Text>
      <View style={styles.followContainer}>
        <Text style={styles.followText}>Followers: 0</Text>
        <Text style={styles.followText}>Following: 1</Text>
      </View>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("EditProfile")}
        style={styles.button}
      >
        <Text style={styles.editButton}>Edit Profile </Text>
        <MaterialCommunityIcons
          name="chevron-right"
          size={17}
          color={colors.text}
          style={styles.downArrow}
        />
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    flex: 1,
    padding: 16,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  profileImageContainer: {
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  followContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    marginVertical: 20,
  },
  followText: {
    fontSize: 16,
  },
  editButton: {
    fontSize: 16,
    marginTop: 15,
    backgroundColor: "#FAB917",
    // backgroundColor: "black",
  },
  button: {
    backgroundColor: "#FAB917",
  },
  downArrow: {},
});

export default ProfileFirst;
