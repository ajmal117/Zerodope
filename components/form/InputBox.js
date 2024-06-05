import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";

const InputBox = ({
  inputTitle,
  autoComplete,
  keyboardType,
  secureTextEntry = false,
  value,
  setValue,
}) => {
  return (
    <View>
      <Text>{inputTitle}</Text>
      <TextInput
        style={styles.inputBox}
        autoCorrect={false}
        keyboardType={keyboardType}
        autoComplete={autoComplete}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={(text) => setValue(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    height: 40,
    borderWidth:1,
    marginBottom: 20,
    // backgroundColor: "#fdebe0",
    // backgroundColor: "transparent",
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 10,
    fontSize:14,
    // fontWeight:"500",
    fontFamily:"poppinsMedium",
    // color: "#af9f85",
  },
});

export default InputBox;