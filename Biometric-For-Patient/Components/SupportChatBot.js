import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

export default function SupportChatBot({ prop: session }) {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);

  const handleSendPrompt = async () => {
    try {
      if (!prompt.trim()) return;

      const route = `https://patient-management-ebon.vercel.app/patient/chat/${session}`;
      const res = await fetch(route, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch response from server");
      }

      const data = await res.json();
      const reply = data.reply;

      setChatHistory([
        ...chatHistory,
        { role: "user", text: prompt },
        { role: "bot", text: reply },
      ]);
      setPrompt("");
      setResponse(reply);
      setError(null);
    } catch (err) {
      console.error("Error sending prompt:", err);
      setError("Failed to fetch response. Please try again.");
    }
  };

  const clearChatHistory = () => {
    setChatHistory([]);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatHistory}>
        {chatHistory.map((message, index) => (
          <Text
            key={index}
            style={[
              styles.message,
              message.role === "user" ? styles.userMessage : styles.botMessage,
            ]}
          >
            {message.text}
          </Text>
        ))}
      </ScrollView>
      <TextInput
        style={styles.input}
        value={prompt}
        onChangeText={setPrompt}
        placeholder="Enter your message..."
      />
      <Button title="Send" onPress={handleSendPrompt} />
      {error && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity style={styles.clearButton} onPress={clearChatHistory}>
        <Text style={styles.clearButtonText}>Clear Chat</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  chatHistory: {
    flex: 1,
    marginBottom: 16,
  },
  message: {
    padding: 8,
    marginVertical: 4,
    borderRadius: 4,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#d1f7d6",
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#e1e4f2",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  error: {
    color: "red",
    marginTop: 8,
  },
  clearButton: {
    marginTop: 16,
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ff6666",
    borderRadius: 4,
  },
  clearButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
