import { React } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from "react-native";
export default function About() {
  return (
    <View style={aboutstyles.container}>
      <ImageBackground
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiUK400bJ4XnsErsiTgUHZz8EXW9ZWp7oDZVbncfPOKwiLYm0xoJJb_2G6vzuYhYohSFE&usqp=CAU",
        }}
        style={aboutstyles.container}
      >
        <ScrollView>
          <Text style={aboutstyles.text}>
            A biometric authentication app for a patient management system in a
            doctor's chamber, developed using React Native for the frontend and
            Node.js with MongoDB for the backend, allows healthcare providers to
            securely authenticate users via Expo Local Authentication. This app
            enhances patient safety by ensuring accurate identification through
            fingerprint or facial recognition, streamlining access to patient
            records, and reducing the risk of medical errors. By leveraging
            biometric technology, the app improves workflow efficiency and
            complies with healthcare regulations, ultimately enhancing the
            overall patient experience.
          </Text>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
const aboutstyles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    height: "100%",
  },
  text: {
    fontSize: 22,
    color: "white",
    margin: "10%",
    lineHeight: 27,
  },
});
