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
import AndroidOpenSettings from "react-native-android-open-settings";
import RNPickerSelect from "react-native-picker-select";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Login from "./Login";
import Home from "../App";
export default function Registration() {
  const [doctors, setDoctors] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [contact, setContact] = useState("");
  const [addMedicalHistory, setAddMedicalHistory] = useState("");
  const [currentDiagnosis, setCurrentDiagnosis] = useState("");
  const [doctorType, setDoctorType] = useState("");
  const [assignedDoctor, setAssignedDoctor] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [date, setDate] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [addMedicalHistoryModal, setAddMedicalHistoryModal] = useState(false);
  const addFingerPrint = async () => {
    AndroidOpenSettings.generalSettings();
  };

  const fetchDoctors = async () => {
    try {
      const response = await fetch(
        "https://patient-management-ebon.vercel.app/doctors"
      );
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  async function sendRegistrationData() {
    try {
      const response = await fetch(
        "https://patient-management-ebon.vercel.app/registration",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: fullName,
            email: email,
            age: age,
            gender: gender,
            contact: contact,
            addMedicalHistory: addMedicalHistory,
            currentDiagnosis: currentDiagnosis,
            doctorType: doctorType,
            assignedDoctor: assignedDoctor,
            roomNumber: roomNumber,
            date: date,
          }),
        }
      );
      if (response.ok) {
        Alert.alert("Registration Successfull.");
      } else {
        Alert.alert("Registration Failed.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleRegistration = () => {
    Alert.alert(
      "Important!!",
      "Your Registration Will Be Successfull If You Add FingerPrint From Password & Security Of Your Settings App.Are You Sure?",
      [
        {
          text: "Yes",
          onPress: () => {
            sendRegistrationData();
            addFingerPrint();
          },
        },
        {
          text: "No",
          onPress: () => {
            Alert.alert("Registration Failed.");
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
    setAddMedicalHistory("");
  };
  const handleAddMedicalHistory = () => {
    Alert.alert("New Medical History Added.");
    setAddMedicalHistoryModal(false);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (value) => {
    setDate(value);
    hideDatePicker();
  };

  const [currentPage, setCurrentPage] = useState("registration");

  const renderPage = () => {
    if (!doctors) {
      return <Text>Loading</Text>;
    }
    switch (currentPage) {
      case "login":
        return <Login />;
      case "home":
        return <Home />;
      case "registration":
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
                    label: "Seletct Gender",
                    value: null,
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
                <Text style={registrationstyles.inputText}>
                  Contact Number:
                </Text>
                <TextInput
                  placeholder="Contact Number"
                  keyboardType="phone-pad"
                  value={contact}
                  style={registrationstyles.text}
                  onChangeText={(value) => {
                    setContact(value);
                  }}
                ></TextInput>
                <Text
                  style={{
                    marginLeft: "10%",
                    marginTop: "15%",
                    fontSize: 20,
                    color: "yellow",
                  }}
                >
                  Add Medical History = &gt;
                </Text>
                <TouchableOpacity
                  style={registrationstyles.historybutton}
                  onPress={() => {
                    setAddMedicalHistoryModal(true);
                  }}
                >
                  <Text style={registrationstyles.historytext}>+</Text>
                </TouchableOpacity>
                <Text style={registrationstyles.inputText}>
                  Select Current Diagnosis:
                </Text>
                <RNPickerSelect
                  placeholder={{
                    label: "Select Current Diagnosis.",
                    value: currentDiagnosis,
                  }}
                  onValueChange={(value) => setCurrentDiagnosis(value)}
                  items={doctors.map((d) => ({
                    label: d.Diagnosis,
                    value: d.Diagnosis,
                  }))}
                  style={{
                    inputAndroid: {
                      width: "90%",
                      alignSelf: "center",
                      color: "white",
                      marginTop: "5%",
                    },
                  }}
                />
                <Text style={registrationstyles.inputText}>
                  Select Doctor Type:
                </Text>

                <RNPickerSelect
                  placeholder={{
                    label: "Select Doctor Type.",
                    value: null,
                  }}
                  onValueChange={(value) => setDoctorType(value)}
                  items={doctors
                    .filter((d) => d.Diagnosis === currentDiagnosis) // Filter doctors by currentDiagnosis
                    .map((d) => ({
                      label: d.Type,
                      value: d.Type,
                    }))} // Map valid doctors to doctor type options
                  style={{
                    inputAndroid: {
                      width: "90%",
                      alignSelf: "center",
                      color: "white",
                      marginTop: "5%",
                    },
                  }}
                />

                <Text style={registrationstyles.inputText}>
                  Select Assigned Doctor:
                </Text>

                <RNPickerSelect
                  placeholder={{
                    label: "Select Assigned Doctor.",
                    value: null,
                  }}
                  onValueChange={(value) => setAssignedDoctor(value)}
                  items={doctors
                    .filter((d) => d.Type === doctorType) // Filter doctors by type
                    .map((d) => ({
                      label: d.Name,
                      value: d.Name,
                    }))} // Map only valid doctors to items
                  style={{
                    inputAndroid: {
                      width: "90%",
                      alignSelf: "center",
                      color: "white",
                      marginTop: "5%",
                    },
                  }}
                />

                <Text style={registrationstyles.inputText}>
                  Select Doctor Room Number:
                </Text>

                <RNPickerSelect
                  placeholder={{
                    label: "Select Room Number",
                    value: null,
                  }}
                  onValueChange={(value) => setRoomNumber(value)}
                  items={doctors
                    .filter((d) => d.Name === assignedDoctor) // Filter doctors by assignedDoctor
                    .map((d) => ({
                      label: d.Room,
                      value: d.Room,
                    }))} // Map valid doctors to room options
                  style={{
                    inputAndroid: {
                      width: "90%",
                      alignSelf: "center",
                      color: "white",
                      marginTop: "5%",
                    },
                  }}
                />

                <TouchableOpacity
                  onPress={showDatePicker}
                  style={registrationstyles.datebutton}
                >
                  <Text style={registrationstyles.date}>
                    Select Date:{date.toString()}
                  </Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
                <TouchableOpacity
                  style={registrationstyles.button}
                  onPress={handleRegistration}
                >
                  <Text style={registrationstyles.buttontext}>
                    Registration
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={registrationstyles.button}
                  onPress={() => setCurrentPage("home")}
                >
                  <Text style={registrationstyles.buttontext}>Go Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={registrationstyles.button}
                  onPress={() => setCurrentPage("login")}
                >
                  <Text style={registrationstyles.buttontext}>
                    Go For Login
                  </Text>
                </TouchableOpacity>
              </ScrollView>
              <Modal
                visible={addMedicalHistoryModal}
                animationType="slide"
                transparent={false}
              >
                <TextInput
                  multiline
                  placeholder="Enter Current Medical History"
                  style={registrationstyles.addhistorymodalinputtext}
                  onChangeText={(value) => {
                    setAddMedicalHistory(value);
                  }}
                />
                <TouchableOpacity
                  onPress={handleAddMedicalHistory}
                  style={registrationstyles.addhistorymodalinputbutton}
                >
                  <Text
                    style={registrationstyles.addhistorymodalinputbuttontext}
                  >
                    Add History
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setAddMedicalHistoryModal(false)}
                  style={registrationstyles.addhistorymodalgobackbutton}
                >
                  <Text
                    style={registrationstyles.addhistorymodalgobackbuttontext}
                  >
                    Go Back
                  </Text>
                </TouchableOpacity>
              </Modal>
            </ImageBackground>
          </View>
        );
    }
  };

  return renderPage();
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
    marginTop: "4%",
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
    width: "60%",
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
    marginTop: "18%",
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
    top: "42%",
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
    width: "90%",
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
