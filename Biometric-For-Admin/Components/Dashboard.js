import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";

export default function Dashboard({ prop: session }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://patient-management-ebon.vercel.app/admin/dashboard",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ session }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : error ? (
        <Text style={styles.text}>Error: {error}</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.text}>Admin Dashboard</Text>
          <Text style={styles.text}>Total Users: {stats?.users}</Text>
          <Text style={styles.text}>Total Patients: {stats?.patients}</Text>
          <Text style={styles.text}>Total Doctors: {stats?.doctors}</Text>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 16,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
    color: "white",
    marginVertical: "10%",
    textAlign: "center",
  },
});
