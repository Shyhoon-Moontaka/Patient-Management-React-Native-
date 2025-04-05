import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import About from "./About";
import Settings from "./Settings";
import Serial from "./Serial";
import Profile from "./Profile";
import PrivacyPolicy from "./Privacy-Policy";
import Logout from "./Logout";
import SupportChatBot from "./SupportChatBot";
import Home from "../App";
import AddDoctors from "./Doctors";
import DoctorSerial from "./DoctorSerial";
import Dashboard from "./Dashboard";

const Drawer = createDrawerNavigator();

export default function Admin({ prop: session }) {
  const [currentPage, setCurrentPage] = useState("admin");

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home />;
      default:
        return (
          <NavigationContainer>
            <Drawer.Navigator
              initialRouteName="Dashboard"
              screenOptions={{
                drawerActiveTintColor: "green",
                drawerItemStyle: {
                  backgroundColor: "orange",
                  marginVertical: "4%",
                },
                drawerStyle: {
                  backgroundColor: "gray",
                },
              }}
            >
              <Drawer.Screen name="Dashboard">
                {() => <Dashboard prop={session} />}
              </Drawer.Screen>
              <Drawer.Screen name="About" component={About} />
              <Drawer.Screen name="List of Patients">
                {() => <Serial prop={session} />}
              </Drawer.Screen>
              <Drawer.Screen name="List of Doctors">
                {() => <DoctorSerial prop={session} />}
              </Drawer.Screen>
              <Drawer.Screen name="Profile">
                {() => <Profile prop={session} />}
              </Drawer.Screen>
              <Drawer.Screen name="Settings">
                {() => <Settings prop={session} />}
              </Drawer.Screen>
              <Drawer.Screen name="Add Doctor">
                {() => <AddDoctors prop={session} />}
              </Drawer.Screen>
              <Drawer.Screen name="Logout">
                {() => <Logout prop={setCurrentPage} />}
              </Drawer.Screen>
              <Drawer.Screen name="Support Chatbot">
                {() => <SupportChatBot prop={session} />}
              </Drawer.Screen>
              <Drawer.Screen name="Privacy Policy" component={PrivacyPolicy} />
            </Drawer.Navigator>
          </NavigationContainer>
        );
    }
  };

  return renderPage();
}
