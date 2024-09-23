import { globalStyles } from "@/assets/styles/global";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const ProfileItem = ({ label, value }: any) => (
  <View style={styles.profileItem}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const UserProfileScreen = () => {
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
          <Text style={styles.name}>abc</Text>
          <Text style={styles.userId}>User ID : 12345abc</Text>
        </View>

        <View style={styles.infoContainer}>
          <ProfileItem label="Current city" value="Chandigarh road, Mohali" />
          <ProfileItem label="Contact No." value="1234567890" />
          <ProfileItem label="Email" value="abcd1@gmail.com" />
          <ProfileItem label="Age" value="23 year" />
          <ProfileItem label="Weight" value="50 kg" />
          <ProfileItem label="Blood Group" value="A +ve" />
        </View>

        <TouchableOpacity style={{ ...globalStyles.button, marginTop: 24 }}>
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
