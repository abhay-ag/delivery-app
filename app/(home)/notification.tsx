import { BottomImage } from "@/components/BottomImagePlaceHolder";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../config";

// Replace with your actual API base URL

const NotificationItem = ({ hospital, bloodGroup, time }: any) => (
  <View style={styles.notificationItem}>
    <Text style={styles.hospitalText}>{hospital}</Text>
    <Text style={styles.infoText}>Blood Group: {bloodGroup}</Text>
    <View
      style={{
        justifyContent: "space-between",
        flexDirection: "row",
        marginTop: 20,
      }}
    >
      <Text style={styles.infoText}>
        Time : {new Date(time).toLocaleTimeString()}
      </Text>
      <Text style={styles.infoText}>{new Date(time).toLocaleDateString()}</Text>
    </View>
  </View>
);

export const BloodDonationApp = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const response = await axios.get(`${BASE_URL}/api/deliveries/`, {
        headers: { Authorization: `Token ${token}` },
      });

      if (response.data.error) {
        Alert.alert("Error", response.data.message);
        return;
      }

      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);

      Alert.alert(
        "Error",
        "An unexpected error occurred while fetching notifications."
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Image source={require("@/assets/images/bldDrp.png")} />
        <View style={styles.header}>
          <Text style={styles.notificationText}>Notification</Text>
        </View>

        {notifications.map((notification: any) => {
          return (
            <NotificationItem
              key={notification.id}
              hospital={notification.dropoff_location.address}
              bloodGroup={notification.blood_type}
              time={notification.pickup_time}
            />
          );
        })}
      </ScrollView>
      <BottomImage opacity />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollView: {
    padding: 20,
    paddingBottom: 90,
    gap: 8,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  notificationText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  notificationItem: {
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    padding: 15,
    width: "100%",
    marginBottom: 10,
  },
  hospitalText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
  },
});

export default BloodDonationApp;
