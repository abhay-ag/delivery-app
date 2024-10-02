import { globalStyles } from "@/assets/styles/global";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Alert,
  RefreshControl,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../config";

export default function HomeScreen() {
  const [deliveries, setDeliveries] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    try {
      setRefresh(true);
      const token = await AsyncStorage.getItem("authToken");
      const response = await axios.get(`${BASE_URL}/api/deliveries/`, {
        headers: { Authorization: `Token ${token}` },
      });

      if (response.data.error) {
        Alert.alert("Error", response.data.message);
        return;
      }

      setDeliveries(response.data);
    } catch (error) {
      console.error("Error fetching deliveries:", error);
      if (axios.isAxiosError(error)) {
        Alert.alert(
          "Error",
          "An unexpected error occurred while fetching deliveries."
        );
      }
    } finally {
      setRefresh(false);
    }
  };

  const acceptJob = async (deliveryId: any) => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const response = await axios.post(
        `${BASE_URL}/api/deliveries/${deliveryId}/accept_job/`,
        {},
        { headers: { Authorization: `Token ${token}` } }
      );

      if (response.data.error) {
        Alert.alert("Error", response.data.message);
        return;
      }

      router.navigate({
        pathname: "/(home)/rideDetails",
        params: { rideId: deliveryId },
      });
    } catch (error) {
      console.error("Error accepting job:", error);
      if (axios.isAxiosError(error)) {
        // Handle error similarly to rideDetails.tsx
        // ... (implement error handling as above)
      } else {
        Alert.alert(
          "Error",
          "An unexpected error occurred while accepting the job."
        );
      }
    }
  };
  const [refreshing, setRefresh] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ gap: 24, padding: 12 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchDeliveries} />
        }
      >
        {deliveries.filter((e: any) => e.status === "pending").length === 0 && (
          <Text>No Jobs Available</Text>
        )}
        {deliveries.map((delivery: any) => {
          return delivery.status === "pending" ? (
            <RideItem
              key={delivery.id}
              delivery={delivery}
              onAccept={() => acceptJob(delivery.id)}
            />
          ) : null;
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

function RideItem({ delivery, onAccept }: any) {
  return (
    <View style={{ gap: 12 }}>
      <View style={styles.rideItem}>
        <View style={styles.row}>
          <Text style={styles.title}>Pickup</Text>
          <Text style={styles.subtitle}>
            {delivery.pickup_location.address}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Dropoff</Text>
          <Text style={styles.subtitle}>
            {delivery.dropoff_location.address}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Blood Type</Text>
          <Text style={styles.subtitle}>{delivery.blood_type}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Units</Text>
          <Text style={styles.subtitle}>{delivery.blood_units}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Time & Date</Text>
          <Text style={styles.subtitle}>
            {new Date(delivery.created_at).toLocaleTimeString()} &{" "}
            {new Date(delivery.created_at).toLocaleDateString()}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={onAccept}
        style={{ ...globalStyles.button, borderRadius: 12 }}
      >
        <Text style={{ color: "white", fontWeight: "500" }}>Accept job</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rideItem: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    width: "100%",
    gap: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
});
