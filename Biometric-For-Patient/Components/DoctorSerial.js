import React, { useState, useEffect } from "react";
import { Text, TextInput, View, ScrollView, StyleSheet } from "react-native";

export default function DoctorSerial() {
  const [doctors, setDoctors] = useState(null);

  const [searchDiagnosis, setSearchDiagnosis] = useState("");

  const fetchDoctors = async () => {
    try {
      const response = await fetch(
        `https://patient-management-ebon.vercel.app/patient/doctorList/`
      );
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    if (searchDiagnosis != "") {
      const l = searchDiagnosis.length;
      const getDoctors = doctors.filter((d) => {
        return d.Diagnosis.trim().slice(0, l) == searchDiagnosis.trim();
      });
      setDoctors(getDoctors);
    } else {
      fetchDoctors();
    }
  }, [searchDiagnosis]);

  if (!doctors) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }

  doctors.sort((a, b) => a.Room - b.Room);

  return (
    <ScrollView>
      <TextInput
        placeholder="Search Diagnosis"
        style={styles.searchInput}
        onChangeText={setSearchDiagnosis}
        value={searchDiagnosis}
      />
      {doctors.map((doctor, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.text}>Name: {doctor.Name}</Text>
          <Text style={styles.text}>Type: {doctor.Type}</Text>
          <Text style={styles.text}>Diagnosis: {doctor.Diagnosis}</Text>
          <Text style={styles.text}>Room: {doctor.Room}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "bisque",
    borderRadius: 20,
    borderWidth: 2,
    margin: 10,
    padding: 15,
  },
  text: {
    fontSize: 18,
    marginBottom: 5,
  },
  deleteButton: {
    marginTop: 10,
    marginLeft: "70%",
    backgroundColor: "blue",
    padding: 8,
    borderRadius: 5,
    width: "30%",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 5,
  },
});
