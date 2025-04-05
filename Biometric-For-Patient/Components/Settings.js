import { React, useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  Alert,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import * as LocalAuthentication from "expo-local-authentication";
export default function Settings({ prop: session }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [contact, setContact] = useState("");

  async function sendUpdatedData() {
    let result = await LocalAuthentication.authenticateAsync();
    if (result.success) {
      const response = await fetch(
        `https://patient-management-ebon.vercel.app/update/${session}`,
        {
          method: "PUT",
          body: JSON.stringify({
            fullName,
            email,
            age,
            gender,
            contact,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const jsonData = await response.json();
      Alert.alert(jsonData.message);
    } else {
      Alert.alert("Data Update Failed.");
    }
  }

  const handleUpdate = () => {
    Alert.alert(
      "Warning!!",
      "Your Data Will Be Modified Successfully, If You Press The Yes Button.",
      [
        {
          text: "Yes",
          onPress: () => {
            sendUpdatedData();
            // setEmpty();
          },
        },
        {
          text: "No",
          onPress: () => {
            Alert.alert("Data Update Failed.");
            setEmpty();
          },
        },
      ]
    );
  };
  const setEmpty = () => {
    setFullName("");
    setEmail("");
    setAge("");
    setContact("");
  };

  return (
    <View style={registrationstyles.container}>
      <ImageBackground
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLCwuq0TIGgwBClpekFuf-oVitVHdrP-G4Pg&s",
        }}
        style={registrationstyles.container}
      >
        <ScrollView>
          <Text style={registrationstyles.inputText}>Full Name:</Text>
          <TextInput
            placeholder="Full Name"
            style={registrationstyles.text}
            value={fullName}
            onChangeText={(value) => {
              setFullName(value);
            }}
          ></TextInput>
          <Text style={registrationstyles.inputText}>Email:</Text>
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            style={registrationstyles.text}
            onChangeText={(value) => {
              setEmail(value);
            }}
          ></TextInput>
          <Text style={registrationstyles.inputText}>Age:</Text>
          <TextInput
            placeholder="Age"
            keyboardType="number-pad"
            value={age}
            style={registrationstyles.text}
            onChangeText={(value) => {
              setAge(value);
            }}
          ></TextInput>
          <Text style={registrationstyles.inputText}>Select Gender:</Text>
          <RNPickerSelect
            placeholder={{
              label: "Select Gender.",
              value: gender,
            }}
            onValueChange={(value) => setGender(value)}
            items={[
              {
                label: "Male",
                value: "Male",
              },
              {
                label: "Female",
                value: "Female",
              },
            ]}
            style={{
              inputAndroid: {
                width: "90%",
                alignSelf: "center",
                color: "white",
                marginTop: "1%",
              },
            }}
          />
          <Text style={registrationstyles.inputText}>Contact Number:</Text>
          <TextInput
            placeholder="Contact Number"
            keyboardType="phone-pad"
            value={contact}
            style={registrationstyles.text}
            onChangeText={(value) => {
              setContact(value);
            }}
          ></TextInput>
          <TouchableOpacity
            style={registrationstyles.button}
            onPress={handleUpdate}
          >
            <Text style={registrationstyles.buttontext}>Update</Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
const registrationstyles = StyleSheet.create({
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
  addhistorymodalinputtext: {
    width: "90%",
    height: "50%",
    borderColor: "blue",
    borderRadius: 40,
    borderWidth: 4,
    alignSelf: "center",
    marginTop: "20%",
  },
  datebutton: {
    borderColor: "white",
    borderWidth: 3,
    borderRadius: 20,
    width: "80%",
    alignSelf: "center",
    marginVertical: "5%",
  },
  date: {
    fontSize: 25,
    color: "red",
    textAlign: "center",
  },
  addhistorymodalinputbutton: {
    borderWidth: 5,
    borderRadius: 20,
    borderColor: "orange",
    width: "50%",
    alignSelf: "center",
    marginTop: "10%",
  },
  addhistorymodalgobackbutton: {
    borderWidth: 5,
    borderRadius: 20,
    width: "50%",
    alignSelf: "center",
    marginTop: "10%",
  },
  addhistorymodalinputbuttontext: {
    fontSize: 30,
    textAlign: "center",
  },
  addhistorymodalgobackbuttontext: {
    fontSize: 30,
    textAlign: "center",
    color: "red",
  },
  inputText: {
    fontSize: 20,
    color: "yellow",
    marginTop: "4%",
    textAlign: "center",
  },
  history: {
    backgroundColor: "white",
  },
  historytext: {
    color: "yellow",
    fontSize: 40,
    textAlign: "center",
  },
  historybutton: {
    position: "absolute",
    backgroundColor: "blue",
    width: "17%",
    marginLeft: "75%",
    top: "41%",
  },

  previoushistorymodal: {
    backgroundColor: "green",
    width: "40%",
    alignSelf: "center",
    borderRadius: 50,
    marginVertical: "10%",
  },
  previoushistorymodaltext: {
    fontSize: 30,
    textAlign: "center",
    padding: "2%",
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
