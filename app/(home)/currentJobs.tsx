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

export default function InProgressJobs() {
  const [deliveries, setDeliveries] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    try {
      setRefresh(true);
      const token = await AsyncStorage.getItem("authToken");
      const response = await axios.get(
        `${BASE_URL}/api/deliveries/accepted_deliveries/`,
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      console.log(response.data);
      setDeliveries(response.data);
      setRefresh(false);
    } catch (error) {
      console.error("Error fetching deliveries:", error);
      setRefresh(false);
      Alert.alert("Error", "Failed to fetch deliveries");
    }
  };

  const acceptJob = async (deliveryId: any) => {
    router.navigate({
      pathname: "/(home)/rideDetails",
      params: { rideId: deliveryId },
    });
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
        {deliveries.length > 0 ? (
          deliveries.map((delivery: any) => (
            <RideItem
              key={delivery.id}
              delivery={delivery}
              onAccept={() => acceptJob(delivery.id)}
            />
          ))
        ) : (
          <Text>No Jobs Available</Text>
        )}
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
      </View>
      <TouchableOpacity
        onPress={onAccept}
        style={{ ...globalStyles.button, borderRadius: 12 }}
      >
        <Text style={{ color: "white", fontWeight: "500" }}>Go to job</Text>
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
