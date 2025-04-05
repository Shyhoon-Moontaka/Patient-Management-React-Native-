import { React, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function AddDoctors({ prop: session }) {
  const [Name, setName] = useState(null);
  const [Type, setType] = useState(null);
  const [Diagnosis, setDiagnosis] = useState(null);
  const [Room, setRoom] = useState(null);

  const DoctorController = async () => {
    const response = await fetch(
      `https://patient-management-ebon.vercel.app/admin/doctor/registration/${session}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Name,
          Type,
          Diagnosis,
          Room,
        }),
      }
    );
    if (response.ok) {
      Alert.alert("Doctor Added Successfully. Thanks!");
    } else {
      Alert.alert("Doctor Not Added. Sorry!!");
    }
  };

  const handleAddDoctor = () => {
    Alert.alert("Reminder!", "Are You Sure?", [
      {
        text: "Yes",
        onPress: () => {
          if (Name && Type && Diagnosis && Room) {
            DoctorController();
            setEmpty();
          } else {
            setEmpty();
            Alert.alert("Doctor Not Added.");
          }
        },
      },
      {
        text: "No",
        onPress: () => {
          Alert.alert("Doctor Not Added.");
          setEmpty();
        },
      },
    ]);
  };
  const setEmpty = () => {
    setName(null);
    setType(null);
    setDiagnosis(null);
    setRoom(null);
  };

  return (
    <View style={doctorstyle.container}>
      <ImageBackground
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLCwuq0TIGgwBClpekFuf-oVitVHdrP-G4Pg&s",
        }}
        style={doctorstyle.container}
      >
        <ScrollView>
          <Text style={doctorstyle.inputText}>Doctor Name:</Text>
          <TextInput
            placeholder="Enter Doctor Name"
            style={doctorstyle.text}
            value={Name}
            onChangeText={(value) => {
              setName(value);
            }}
          ></TextInput>
          <Text style={doctorstyle.inputText}>Doctor Type</Text>
          <TextInput
            placeholder="Enter Doctor Type"
            value={Type}
            style={doctorstyle.text}
            onChangeText={(value) => {
              setType(value);
            }}
          ></TextInput>
          <Text style={doctorstyle.inputText}>Doctor Diagnosis</Text>
          <TextInput
            placeholder="Enter Doctor Diagnosis"
            value={Diagnosis}
            style={doctorstyle.text}
            onChangeText={(value) => {
              setDiagnosis(value);
            }}
          ></TextInput>

          <Text style={doctorstyle.inputText}>Doctor Room</Text>
          <TextInput
            placeholder="Enter Doctor Room"
            keyboardType="number-pad"
            value={Room}
            style={doctorstyle.text}
            onChangeText={(value) => {
              setRoom(value);
            }}
          ></TextInput>

          <TouchableOpacity
            style={doctorstyle.button}
            onPress={handleAddDoctor}
          >
            <Text style={doctorstyle.buttontext}>Add Doctor</Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
const doctorstyle = StyleSheet.create({
  container: {
    backgroundColor: "black",
    height: "100%",
  },
  text: {
    textAlign: "center",
    borderWidth: 5,
    borderColor: "white",
    borderRadius: 30,
    width: "90%",
    color: "white",
    marginBottom: "4%",
    alignSelf: "center",
  },
  inputText: {
    fontSize: 20,
    color: "yellow",
    marginTop: "4%",
    textAlign: "center",
  },
  button: {
    alignSelf: "center",
    alignItems: "center",
    width: 200,
    borderRadius: 50,
    borderColor: "yellow",
    borderWidth: 5,
    marginVertical: "10%",
  },
  buttontext: {
    fontSize: 30,
    color: "white",
  },
});
const profilestyle = StyleSheet.create({
  container: {
    backgroundColor: "black",
    height: "100%",
  },
  text: {
    fontSize: 20,
    color: "white",
    marginTop: 30,
    textAlign: "center",
  },
});
