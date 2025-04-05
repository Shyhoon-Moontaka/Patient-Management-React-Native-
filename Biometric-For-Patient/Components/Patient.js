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
import { Session } from "./Login";
import Home from "../App";
import DoctorSerial from "./DoctorSerial";

const Drawer = createDrawerNavigator();

export default function Patient({ prop: session }) {
  const [currentPage, setCurrentPage] = useState("patient");

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home />;
      default:
        return (
          <NavigationContainer>
            <Drawer.Navigator
              initialRouteName="Profile"
              screenOptions={{
                drawerActiveTintColor: "green",
                drawerItemStyle: {
                  backgroundColor: "orange",
                  marginVertical: 20,
                },
                drawerStyle: {
                  backgroundColor: "gray",
                },
              }}
            >
              <Drawer.Screen name="Profile">
                {() => <Profile prop={session} />}
              </Drawer.Screen>
              <Drawer.Screen name="About" component={About} />

              <>
                <Drawer.Screen name="List of Patients">
                  {() => <Serial />}
                </Drawer.Screen>
                <Drawer.Screen name="List of Doctors">
                  {() => <DoctorSerial />}
                </Drawer.Screen>
              </>

              <>
                <Drawer.Screen name="Settings">
                  {() => <Settings prop={session} />}
                </Drawer.Screen>
                <Drawer.Screen name="Logout">
                  {() => <Logout prop={setCurrentPage} />}
                </Drawer.Screen>
              </>

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
