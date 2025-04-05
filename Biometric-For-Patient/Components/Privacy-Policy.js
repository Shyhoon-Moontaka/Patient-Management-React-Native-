import { React, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from "react-native";
export default function PrivacyPolicy() {
  return (
    <View style={privacypolicystyles.container}>
      <ImageBackground
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO7AmjTpEGJjsKs0Jpgqw5oC-7FGGSkP37ng&s",
        }}
        style={privacypolicystyles.container}
      >
        <ScrollView>
          <Text style={privacypolicystyles.text}>
            This privacy policy outlines how our biometric authentication app
            for patient management collects, uses, and protects personal
            information. We prioritize user privacy by implementing secure data
            handling practices in compliance with healthcare regulations.
            Biometric data, such as fingerprints or facial recognition, is
            stored securely and used solely for authentication purposes. We do
            not share personal information with third parties without consent,
            and users have the right to access and delete their data at any
            time. Your trust is important to us, and we are committed to
            safeguarding your privacy.
          </Text>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
const privacypolicystyles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    height: "100%",
  },
  text: {
    fontSize: 22,
    color: "white",
    margin: "10%",
    lineHeight: 28,
  },
});
