import React, { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    name: "",
    id: "",
    gender: "",
    height: "5",
    inch: "10.08",
    weight: "66",
    targetWeight: "75",
    dob: "",
    fatPercentage: "14",
    foodPreference: "",
    fitnessLevel: "Beginner",
    bio: "",
    mobileNumber: "",
    email: "",
    country: "India",
    interests: ["Calisthenics", "Trekking"],
  });

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const id = await SecureStore.getItemAsync("userid");
        const name = await SecureStore.getItemAsync("username");
        const email = await SecureStore.getItemAsync("email");
        setProfile((prevProfile) => ({
          ...prevProfile,
          id: id || prevProfile.id,
          name: name || prevProfile.name,
          email: email || prevProfile.email,
        }));
      } catch (error) {
        console.error("Error retrieving user ID or username:", error);
      }
    };
    getProfileData();
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
