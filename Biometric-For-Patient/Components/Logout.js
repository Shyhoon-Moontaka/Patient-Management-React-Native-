import { React, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Alert,
  TouchableOpacity,
} from "react-native";
import Home from "../App";
export default function Logout({ prop: setCurrentPage }) {
  const handleLogout = () => {
    Alert.alert("Logged out", "Are you Sure?", [
      {
        text: "Yes",
        onPress: () => {
          setCurrentPage("home");
          AsyncStorage.clear();
        },
      },
      {
        text: "No",
      },
    ]);
  };

  return (
    <View style={logoutstyle.container}>
      <ImageBackground
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV1fvjdz4AwEhkolClWsx2ud0x3iPVYviEqw&s",
        }}
      >
        <Text style={logoutstyle.text}>You are Logged In.</Text>
        <TouchableOpacity style={logoutstyle.button} onPress={handleLogout}>
          <Text style={logoutstyle.buttontext}>LogOut</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}
const logoutstyle = StyleSheet.create({
  container: {
    backgroundColor: "black",
    height: "100%",
  },
  button: {
    borderColor: "green",
    borderWidth: 10,
    borderRadius: 200,
    width: 250,
    height: 250,
    alignSelf: "center",
    marginTop: 150,
    backgroundColor: "yellow",
  },
  buttontext: {
    position: "absolute",
    left: 18,
    top: 75,
    fontSize: 60,
  },
  text: {
    fontSize: 40,
    textAlign: "center",
    marginTop: 80,
    color: "white",
  },
});
