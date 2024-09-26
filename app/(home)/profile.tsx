import { globalStyles } from "@/assets/styles/global";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../config";

const ProfileItem = ({ label, value }: any) => (
  <View style={styles.profileItem}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const UserProfileScreen = () => {
  const [profile, setProfile] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const response = await axios.get(`${BASE_URL}/api/delivery-staff/me/`, {
        headers: { Authorization: `Token ${token}` },
      });
      setProfile(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
      Alert.alert("Error", "Failed to fetch profile information");
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      router.replace("/(auth)/");
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Error", "Failed to logout");
    }
  };

  if (!profile) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>My Profile</Text>

        <View style={styles.imageContainer}>
          <View style={styles.imagePlaceholder}>
            <Icon name="person" size={24} color="#888" />
          </View>
        </View>

        <View style={styles.nameContainer}>
          <Text
            style={styles.name}
          >{`${profile.first_name} ${profile.last_name}`}</Text>
          <Text style={styles.userId}>User ID : {profile.id}</Text>
        </View>

        <View style={styles.infoContainer}>
          <ProfileItem label="Username" value={profile.username} />
          <ProfileItem label="Email" value={profile.email} />
          <ProfileItem label="Phone Number" value={profile.phone_number} />
          <ProfileItem label="Address" value={profile.address} />
        </View>

        <TouchableOpacity
          style={{ ...globalStyles.button, marginTop: 24 }}
          onPress={handleLogout}
        >
          <Text style={{ color: "white" }}>LOGOUT</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  content: {
    padding: 20,
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userId: {
    fontSize: 14,
    color: "#888",
  },
  infoContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 8,
  },
  profileItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "#E0E0E0",
  },
  label: {
    fontSize: 16,
    color: "#333",
  },
  value: {
    fontSize: 16,
    color: "#888",
  },
  logoutButton: {
    backgroundColor: "#D32F2F",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    marginTop: 20,
  },
});

export default UserProfileScreen;
