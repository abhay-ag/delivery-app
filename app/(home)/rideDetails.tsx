import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { globalStyles } from "@/assets/styles/global";
import { useState } from "react";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../config";
import { useRouter } from "expo-router";

const DetailRow = ({ title, value }: any) => {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subheading}>{value}</Text>
    </View>
  );
};

export default function DeliveryScreen() {
  const route = useRoute<any>();
  const { rideId } = route.params;
  const [top, setTop] = useState<any>(350);
  const [step, setStep] = useState<any>(0);

  const pickUp = () => {
    setTop("70%");
    setStep(1);
  };

  const router = useRouter();

  const confirmDelivery = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      await axios.post(
        `${BASE_URL}/api/deliveries/${rideId}/confirm_delivery/`,
        {},
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      Alert.alert("Success", "Delivery confirmed");
      // Navigate back to the home screen or update the UI as needed
      router.navigate("/(home)/");
    } catch (error) {
      console.error("Error confirming delivery:", error);
      Alert.alert("Error", "Failed to confirm delivery");
    }
  };

  const reportIssue = async (description: string) => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      await axios.post(
        `${BASE_URL}/api/delivery-issues/`,
        {
          delivery: rideId,
          description: description,
        },
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      Alert.alert("Success", "Issue reported successfully");
    } catch (error) {
      console.error("Error reporting issue:", error);
      Alert.alert("Error", "Failed to report issue");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView style={{ flex: 1 }} />
      <View style={{ ...styles.container, top: top }}>
        <ScrollView contentContainerStyle={{ alignItems: "center", gap: 12 }}>
          {step === 0 ? (
            <>
              <DetailRow title="Pick Up" value="123456" />
              <DetailRow title="Order No." value="123456" />
              <DetailRow title="Distance from pickup" value="123456" />
              <DetailRow title="Blood Group" value="123456" />
              <DetailRow title="Blood Units" value="123456" />
              <TouchableOpacity
                style={{ ...globalStyles.button, marginTop: 24 }}
                onPress={pickUp}
              >
                <Text style={{ color: "white" }}>Pick Up</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <DetailRow title="Pick Up" value="123456" />
            </>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: 36,
    borderBottomColor: "#e0e0e0",
    borderBottomWidth: 1,
  },
  container: {
    position: "absolute",
    height: "100%",
    borderTopRightRadius: 48,
    borderTopLeftRadius: 48,
    width: "100%",
    padding: 24,
    backgroundColor: "#eeeff0",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subheading: {
    fontSize: 14,
    color: "#666",
  },
});
