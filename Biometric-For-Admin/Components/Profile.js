import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
export default function Profile({ prop: session }) {
  const [profileData, setProfileData] = useState(null);
  const [state, setState] = useState(true);
  const [error, setError] = useState(null);
  setTimeout(() => {
    setState(!state);
  }, 1000);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (!session) {
          setError("Session is missing. Please log in again.");
          return;
        }

        const response = await fetch(
          "https://patient-management-ebon.vercel.app/admin/profile",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ session }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.error || "Failed to fetch profile data.");
          return;
        }

        const jsonData = await response.json();
        setProfileData(jsonData);
      } catch (err) {
        setError("An error occurred while fetching profile data.");
        console.error(err);
      }
    };

    fetchProfileData();
  }, [state]);

  if (error) {
    return (
      <View style={profilestyle.container}>
        <Text style={profilestyle.text}>{error}</Text>
      </View>
    );
  }

  if (!profileData) {
    return (
      <View style={profilestyle.container}>
        <Text style={profilestyle.text}>Loading profile data...</Text>
      </View>
    );
  }

  return (
    <View style={profilestyle.container}>
      <ScrollView>
        <Text style={profilestyle.text}>Full Name: {profileData.fullName}</Text>
        <Text style={profilestyle.text}>Email: {profileData.email}</Text>
        <Text style={profilestyle.text}>Password: {profileData.password}</Text>
        <Text style={profilestyle.text}>Age: {profileData.age}</Text>
        <Text style={profilestyle.text}>Gender: {profileData.gender}</Text>
        <Text style={profilestyle.text}>
          Contact Number: {profileData.contact}
        </Text>
      </ScrollView>
    </View>
  );
}

const profilestyle = StyleSheet.create({
  container: {
    height: "100%",
  },
  viewhistory: {
    marginTop: "10%",
  },
  text: {
    fontSize: 20,
    color: "blue",
    marginTop: "3%",
    marginLeft: "7%",
  },
  historytext: {
    fontSize: 20,
    color: "blue",
    marginTop: "3%",
    marginLeft: "20%",
  },
});
