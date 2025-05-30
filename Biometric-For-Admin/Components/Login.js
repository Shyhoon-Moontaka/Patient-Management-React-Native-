import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import Home from "../App";
import Registration from "./Registration";
import Admin from "./Admin";
export default function Login() {
  const [currentPage, setCurrentPage] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [session, setSession] = useState(null);

  const setEmpty = () => {
    setEmail("");
    setPassword("");
  };

  const sendLoginData = async () => {
    const response = await fetch(
      "https://patient-management-ebon.vercel.app/admin/login",
      {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: { "Content-Type": "application/json" },
      }
    );
    const jsonData = await response.json();

    if (response.ok) {
      setSession(jsonData.session);
      Alert.alert("Login Successfully!");
      setCurrentPage("admin");
      setEmpty();
    } else {
      Alert.alert("Authentication Failed");
      setEmpty();
    }
  };

  const handleLogin = async () => {
    let result = await LocalAuthentication.authenticateAsync();
    if (result.success) {
      sendLoginData();
    } else {
      Alert.alert("Authentication Failed");
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home />;
      case "registration":
        return <Registration />;
      case "admin":
        return <Admin prop={session} />;
      default:
        return (
          <ImageBackground
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH-4iYjGk5IdOrjYYrQctn5vRHe_8YrABu1g&s",
            }}
            style={loginstyle.container}
          >
            <ScrollView>
              <Text style={loginstyle.inputText}>Email:</Text>
              <TextInput
                placeholder="Enter Your Email"
                value={email}
                keyboardType="email-address"
                style={loginstyle.text}
                onChangeText={(value) => setEmail(value)}
              />
              <Text style={loginstyle.inputText}>Password:</Text>
              <TextInput
                placeholder="Enter Your Password."
                value={password}
                keyboardType="visible-password"
                style={loginstyle.text}
                onChangeText={(value) => setPassword(value)}
              />
              <TouchableOpacity style={loginstyle.button} onPress={handleLogin}>
                <Text style={loginstyle.buttontext}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  loginstyle.button,
                  { backgroundColor: "blue", marginTop: 20 },
                ]}
                onPress={() => setCurrentPage("home")}
              >
                <Text style={loginstyle.buttontext}>Go to Home</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  loginstyle.button,
                  { backgroundColor: "blue", marginTop: 20 },
                ]}
                onPress={() => setCurrentPage("registration")}
              >
                <Text style={loginstyle.buttontext}>Go For Registration</Text>
              </TouchableOpacity>
            </ScrollView>
          </ImageBackground>
        );
    }
  };

  return renderPage();
}

const loginstyle = StyleSheet.create({
  container: {
    backgroundColor: "black",
    height: "100%",
  },
  text: {
    width: "90%",
    borderWidth: 5,
    borderRadius: 30,
    borderColor: "white",
    marginVertical: "1%",
    alignSelf: "center",
    textAlign: "center",
    fontSize: 25,
    color: "black",
  },
  inputText: {
    marginTop: "24%",
    textAlign: "center",
    fontSize: 25,
  },
  button: {
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "red",
    width: "90%%",
    borderRadius: 50,
    marginTop: "20%",
  },
  buttontext: {
    fontSize: 25,
    margin: "4%",
    color: "white",
  },
});
