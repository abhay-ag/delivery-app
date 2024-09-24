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
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = "http://localhost:8000"; // Replace with your actual API base URL

const NotificationItem = ({ hospital, bloodGroup, time, date }:any) => (
  <View style={styles.notificationItem}>
    <Text style={styles.hospitalText}>{hospital}</Text>
    <Text style={styles.infoText}>{bloodGroup}</Text>
    <Text style={styles.infoText}>
      Time : {time} {date}
    </Text>
  </View>
);

export const BloodDonationApp = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    // try {
    //   const token = await AsyncStorage.getItem('authToken');
    //   const response = await axios.get(`${BASE_URL}/api/notifications/`, {
    //     headers: { Authorization: `Token ${token}` }
    //   });
    //   setNotifications(response.data);
    // } catch (error) {
    //   console.error("Error fetching notifications:", error);
    //   Alert.alert("Error", "Failed to fetch notifications");
    // }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Image source={require("@/assets/images/bldDrp.png")} />
        <View style={styles.header}>
          <Text style={styles.notificationText}>Notification</Text>
        </View>

        {notifications.map((notification:any) => (
          <NotificationItem
            key={notification.id}
            hospital={notification.hospital}
            bloodGroup={notification.bloodGroup}
            time={notification.time}
            date={notification.date}
          />
        ))}
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
    gap: 8,
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
    backgroundColor: "white",
    borderRadius: 12,
    padding: 8,
    marginBottom: 10,
  },
  hospitalText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  infoText: {
    fontSize: 14,
    color: "#666",
  },
});

export default BloodDonationApp;
