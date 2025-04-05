import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
export default function Serial({ prop: session }) {
  const [patients, setPatients] = useState(null);
  const [searchName, setSearchName] = useState("");

  const fetchPatients = async () => {
    try {
      const response = await fetch(
        `https://patient-management-ebon.vercel.app/admin/patientList/${session}`
      );
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  useEffect(() => {
    if (searchName != "") {
      const l = searchName.length;
      const getPatients = patients.filter((p) => {
        return p.fullName.trim().slice(0, l) == searchName.trim();
      });
      setPatients(getPatients);
    } else {
      fetchPatients();
    }
  }, [searchName]);

  if (!patients) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  } else {
    patients.sort((a, b) => {
      return parseInt(b.date.slice(5, 7)) - parseInt(a.date.slice(5, 7));
    });
    patients.sort((a, b) => {
      return b.date.slice(8, 10) - a.date.slice(8, 10);
    });
  }

  return (
    <ScrollView>
      <TextInput
        placeholder="Search Name"
        style={serialstyle.searchInput}
        onChangeText={setSearchName}
        value={searchName}
      />
      {patients.map((patient, index) => {
        return (
          <View key={index} style={serialstyle.container}>
            <Text style={serialstyle.text}>Name: {patient.fullName}</Text>
            <Text style={serialstyle.text}>Age: {patient.age}</Text>
            <Text style={serialstyle.text}>Gender: {patient.gender}</Text>
            <Text style={serialstyle.text}>Serial Number: {index + 1}</Text>
            <Text style={serialstyle.text}>
              Appointment Date: {patient.date}
            </Text>
            <TouchableOpacity
              style={serialstyle.deletebutton}
              onPress={async () => {
                try {
                  const response = await fetch(
                    `https://patient-management-ebon.vercel.app/patientList/${session}/${patient.id}`,
                    {
                      method: "DELETE",
                    }
                  );
                  const data = await response.json();
                  Alert.alert(data.message);
                } catch (error) {
                  console.error("Error deleting patient:", error);
                } finally {
                  setDeletePatientId(null);
                  setDeletePatientMessage(null);
                }
              }}
            >
              <Text style={serialstyle.buttontext}>Delete</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </ScrollView>
  );
}
const serialstyle = StyleSheet.create({
  container: {
    backgroundColor: "bisque",
    borderRadius: 20,
    borderWidth: 2,
    margin: "5%",
    padding: "8%",
  },
  text: {
    fontSize: 20,
  },
  deletebutton: {
    marginLeft: "80%",
    backgroundColor: "blue",
    padding: 5,
  },
  buttontext: {
    fontSize: 13,
    textAlign: "center",
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
