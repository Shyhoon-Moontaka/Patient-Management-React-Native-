import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
export default function Profile({ prop: session }) {
  const [profileData, setProfileData] = useState(null); // Use null initially
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
          "https://patient-management-ebon.vercel.app/profile",
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
        <Text style={profilestyle.text}>Age: {profileData.age}</Text>
        <Text style={profilestyle.text}>Gender: {profileData.gender}</Text>
        <Text style={profilestyle.text}>
          Contact Number: {profileData.contact}
        </Text>
        {profileData.previousMedicalHistory.map((history) => {
          return (
            <View key={history._id} style={profilestyle.viewhistory}>
              <Text style={profilestyle.historytext}>
                Medical History: {history.addMedicalHistory}
              </Text>
              <Text style={profilestyle.historytext}>
                Current Diagnosis: {history.currentDiagnosis}
              </Text>
              <Text style={profilestyle.historytext}>
                Doctor Type: {history.doctorType}
              </Text>
              <Text style={profilestyle.historytext}>
                Assigned Doctor(s): {history.assignedDoctor}
              </Text>
              <Text style={profilestyle.historytext}>
                Room Number: {history.roomNumber}
              </Text>
              <Text style={profilestyle.historytext}>
                Serial Number: {history.serialNumber}
              </Text>
              <Text style={profilestyle.historytext}>
                Appointment Date: {history.date}
              </Text>
            </View>
          );
        })}
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
