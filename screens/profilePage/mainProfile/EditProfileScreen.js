import React, { useContext, useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Button,
  IconButton,
  TextInput as PaperTextInput,
} from "react-native-paper";
import { ProfileContext } from "./ProfileContext";

const EditProfileScreen = () => {
  const { profile, setProfile } = useContext(ProfileContext);
  const [formData, setFormData] = useState(profile);
  const navigation = useNavigation();

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    setProfile(formData);
    navigation.goBack(); // Navigate back after saving
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
        <Text style={styles.headerText}>{profile.name}</Text>
      </View>
      <View style={styles.section}>
        <PaperTextInput
          label="Name"
          value={formData.name}
          onChangeText={(text) => handleChange("name", text)}
          style={styles.input}
        />
        <PaperTextInput
          label="Id"
          value={formData.id}
          onChangeText={(text) => handleChange("id", text)}
          style={styles.input}
        />
        <PaperTextInput
          label="Gender"
          value={formData.gender}
          onChangeText={(text) => handleChange("gender", text)}
          style={styles.input}
        />
        <PaperTextInput
          label="Height (ft)"
          value={formData.height}
          onChangeText={(text) => handleChange("height", text)}
          style={styles.input}
        />
        <PaperTextInput
          label="Height (inch)"
          value={formData.inch}
          onChangeText={(text) => handleChange("inch", text)}
          style={styles.input}
        />
        <PaperTextInput
          label="Weight (kg)"
          value={formData.weight}
          onChangeText={(text) => handleChange("weight", text)}
          style={styles.input}
        />
        <PaperTextInput
          label="Target Weight (kg)"
          value={formData.targetWeight}
          onChangeText={(text) => handleChange("targetWeight", text)}
          style={styles.input}
        />
        <PaperTextInput
          label="Date of Birth"
          value={formData.dob}
          onChangeText={(text) => handleChange("dob", text)}
          style={styles.input}
        />
        <PaperTextInput
          label="Fat Percentage"
          value={formData.fatPercentage}
          onChangeText={(text) => handleChange("fatPercentage", text)}
          style={styles.input}
        />
        <PaperTextInput
          label="Food Preference"
          value={formData.foodPreference}
          onChangeText={(text) => handleChange("foodPreference", text)}
          style={styles.input}
        />
        <PaperTextInput
          label="Fitness Level"
          value={formData.fitnessLevel}
          onChangeText={(text) => handleChange("fitnessLevel", text)}
          style={styles.input}
        />
        <PaperTextInput
          label="Bio"
          value={formData.bio}
          onChangeText={(text) => handleChange("bio", text)}
          style={styles.input}
        />
        <PaperTextInput
          label="Mobile Number"
          value={formData.mobileNumber}
          onChangeText={(text) => handleChange("mobileNumber", text)}
          style={styles.input}
        />
        <PaperTextInput
          label="Email"
          value={formData.email}
          onChangeText={(text) => handleChange("email", text)}
          style={styles.input}
        />
        <PaperTextInput
          label="Country"
          value={formData.country}
          onChangeText={(text) => handleChange("country", text)}
          style={styles.input}
        />
        {formData.interests.map((interest, index) => (
          <PaperTextInput
            key={index}
            label={`Interest ${index + 1}`}
            value={interest}
            onChangeText={(text) => {
              const newInterests = formData.interests.map((item, idx) =>
                idx === index ? text : item
              );
              handleChange("interests", newInterests);
            }}
            style={styles.input}
          />
        ))}
      </View>
      <Button mode="contained" onPress={handleSave} style={styles.button}>
        Save Changes
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  section: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  header: {
    paddingTop: 40,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#FAB917",
  },
});

export default EditProfileScreen;
