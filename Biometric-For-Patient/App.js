import React, { useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Login from "./Components/Login";
import Registration from "./Components/Registration";

export default function Home() {
  const [currentPage, setCurrentPage] = useState("home");

  const renderPage = () => {
    switch (currentPage) {
      case "login":
        return <Login />;
      case "registration":
        return <Registration />;
      default:
        return (
          <View style={homestyles.container}>
            <Text style={homestyles.title}>
              Biometric Authentication App for Patient Management System.
            </Text>
            <TouchableOpacity
              onPress={() => setCurrentPage("login")}
              style={homestyles.loginbutton}
            >
              <Text style={{ fontSize: 20 }}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setCurrentPage("registration")}
              style={homestyles.registrationbutton}
            >
              <Text style={{ fontSize: 20 }}>Registration</Text>
            </TouchableOpacity>
            <Text style={homestyles.footer}>Powered By Shyhoon</Text>
          </View>
        );
    }
  };

  return renderPage();
}

const homestyles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    height: "100%",
  },
  title: {
    fontSize: 25,
    marginVertical: "26%",
    textAlign: "center",
    lineHeight: 60,
    color: "yellow",
    padding: "2%",
  },
  footer: {
    fontSize: 20,
    textAlign: "center",
    color: "red",
    marginTop: "30%",
  },
  loginbutton: {
    backgroundColor: "white",
    padding: "3%",
    margin: "5%",
    marginBottom: "12%",
    alignItems: "center",
  },
  registrationbutton: {
    backgroundColor: "white",
    padding: "3%",
    margin: "5%",
    alignItems: "center",
  },
});
