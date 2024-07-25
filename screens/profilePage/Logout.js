import { View, Text } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { useSession } from "@/app/ctx";

const Logout = () => {
  const { signOut } = useSession();
  console.log("logout");
  return (
    <View>
      <Button onPress={() => signOut()} style={{ borderWidth: 2 }}>
        Sign out
      </Button>
    </View>
  );
};

export default Logout;
