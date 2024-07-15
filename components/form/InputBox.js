import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";

const InputBox = ({
  inputTitle,
  autoComplete,
  keyboardType,
  secureTextEntry = false,
  value,
  setValue,
  placeholder,
}) => {
  return (
    <View style={{ width: "90%" }}>
      {/* <Text>{inputTitle}</Text> */}
      <TextInput
        style={styles.inputBox}
        autoCorrect={false}
        placeholder={placeholder}
        inputMode={keyboardType}
        autoComplete={autoComplete}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={(text) => setValue(text)}
        placeholderTextColor="#000"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    height: 40,
    // borderWidth: 1,
    width: "100%",
    // marginBottom: 10,
    // backgroundColor: "#fdebe0",
    // backgroundColor: "transparent",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    // borderRadius: 6,
    // marginTop: 10,
    // paddingLeft: 10,
    fontSize: 14,
    // fontWeight:"500",
    fontFamily: "poppinsMedium",
    color: "#00000",
    // paddingHorizontal:4
  },
});

export default InputBox;
