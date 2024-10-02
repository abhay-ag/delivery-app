import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import { globalStyles } from "@/assets/styles/global";
import { useState, useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../config";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

const DetailRow = ({ title, value }: any) => {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subheading}>{value}</Text>
    </View>
  );
};

export default function DeliveryScreen() {
  const { rideId } = useLocalSearchParams();
  const router = useRouter();
  const [userLocation, setUserLocation] = useState<any>(null);
  const [pickupLocation, setPickupLocation] = useState<any>(null);
  const [dropoffLocation, setDropoffLocation] = useState<any>(null);
  const [distance, setDistance] = useState<number>(0);
  const [rideDetails, setRideDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchRideDetails = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("authToken");
      const response = await axios.get(
        `${BASE_URL}/api/deliveries/${rideId}/`,
        {
          headers: { Authorization: `Token ${token}` },
        }
      );

      if (response.data.error) {
        Alert.alert("Error", response.data.message);
        return;
      }

      setRideDetails(response.data);
      setPickupLocation({
        latitude: parseFloat(response.data.pickup_location.lat),
        longitude: parseFloat(response.data.pickup_location.lon),
      });
      setDropoffLocation({
        latitude: parseFloat(response.data.dropoff_location.lat),
        longitude: parseFloat(response.data.dropoff_location.lon),
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching ride details:", error);
      Alert.alert(
        "Error",
        "An unexpected error occurred while fetching ride details."
      );
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchRideDetails();
      getUserLocation();
    }, [rideId])
  );

  const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setUserLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };

  useEffect(() => {
    if (userLocation && pickupLocation && dropoffLocation) {
      const targetLocation =
        rideDetails?.status === "picked_up" ? dropoffLocation : pickupLocation;
      const calculateDistance = () => {
        // Use the Haversine formula to calculate distance
        const R = 6371; // Radius of the Earth in km
        const dLat =
          (targetLocation.latitude - userLocation.latitude) * (Math.PI / 180);
        const dLon =
          (targetLocation.longitude - userLocation.longitude) * (Math.PI / 180);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(userLocation.latitude * (Math.PI / 180)) *
            Math.cos(targetLocation.latitude * (Math.PI / 180)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in km
        setDistance(distance);
      };

      calculateDistance();
    }
  }, [userLocation, pickupLocation, dropoffLocation, rideDetails]);

  const handlePickup = () => {
    handleQrCodeSubmit();
    fetchRideDetails();
  };

  const handleConfirmDelivery = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const response = await axios.post(
        `${BASE_URL}/api/deliveries/${rideId}/confirm_delivery/`,
        {},
        {
          headers: { Authorization: `Token ${token}` },
        }
      );

      if (response.data.error) {
        Alert.alert("Error", response.data.message);
        return;
      }

      Alert.alert("Success", "Delivery confirmed successfully");
      router.navigate({
        pathname: "/ride",
        params: {
          rideId: rideDetails.id,
          pickup_location: rideDetails.pickup_location.address,
          dropoff_location: rideDetails.dropoff_location.address,
        },
      });
    } catch (error) {
      console.error("Error confirming delivery:", error);
      if (axios.isAxiosError(error)) {
        // Handle error similarly to fetchRideDetails
        // ... (implement error handling as above)
      } else {
        Alert.alert(
          "Error",
          "An unexpected error occurred while confirming delivery."
        );
      }
    }
  };

  async function handleQrCodeSubmit() {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const response = await axios.post(
        `${BASE_URL}/api/deliveries/${rideId}/scan_qr/`,
        null,
        { headers: { Authorization: `Token ${token}` } }
      );

      if (response.data.error) {
        Alert.alert("Error", response.data.message);
        return;
      }

      setRideDetails({ ...rideDetails, status: "picked_up" });

      Alert.alert("Success", "QR code scanned successfully", [{ text: "OK" }]);
    } catch (error) {
      console.error("Error scanning QR code:", error);

      Alert.alert(
        "Error",
        "An unexpected error occurred while scanning the QR code."
      );
    }
  }

  return (
    <View style={{ flex: 1 }}>
      {loading && <ActivityIndicator animating={loading} />}
      {!loading && (
        <MapView
          style={{ flex: 1 }}
          region={{
            latitude:
              rideDetails?.status === "picked_up"
                ? pickupLocation?.latitude || 0
                : userLocation?.latitude || 0,
            longitude:
              rideDetails?.status === "picked_up"
                ? pickupLocation?.longitude || 0
                : userLocation?.longitude || 0,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {userLocation && (
            <Marker
              coordinate={userLocation}
              title="Your Location"
              pinColor="blue"
            />
          )}
          {rideDetails?.status === "in_progress" && pickupLocation && (
            <Marker
              coordinate={pickupLocation}
              title="Pickup Location"
              pinColor="red"
            />
          )}
          {rideDetails?.status === "picked_up" && dropoffLocation && (
            <Marker
              coordinate={dropoffLocation}
              title="Dropoff Location"
              pinColor="green"
            />
          )}
          {rideDetails?.status === "in_progress" &&
            userLocation &&
            pickupLocation && (
              <Polyline
                coordinates={[userLocation, pickupLocation]}
                strokeColor="#000"
                strokeWidth={2}
              />
            )}

          {rideDetails?.status === "picked_up" &&
            userLocation &&
            pickupLocation &&
            dropoffLocation && (
              <Polyline
                coordinates={[pickupLocation, dropoffLocation]}
                strokeColor="#000"
                strokeWidth={2}
              />
            )}
        </MapView>
      )}
      {!loading && (
        <View style={styles.container}>
          <ScrollView contentContainerStyle={{ alignItems: "center", gap: 12 }}>
            {rideDetails?.status === "in_progress" && (
              <>
                <DetailRow
                  title="Distance to pickup"
                  value={`${distance.toFixed(2)} km`}
                />
                <DetailRow
                  title="Pickup Location"
                  value={rideDetails.pickup_location.address}
                />
                <DetailRow title="Order No." value={rideDetails.id} />
                <DetailRow title="Blood Group" value={rideDetails.blood_type} />
                <DetailRow
                  title="Blood Units"
                  value={rideDetails.blood_units}
                />
                <TouchableOpacity
                  style={{ ...globalStyles.button, marginTop: 24 }}
                  onPress={handlePickup}
                >
                  <Text style={{ color: "white" }}>Scan QR to Pickup</Text>
                </TouchableOpacity>
              </>
            )}
            {rideDetails?.status === "picked_up" && (
              <>
                <DetailRow
                  title="Distance to dropoff"
                  value={`${distance.toFixed(2)} km`}
                />
                <DetailRow
                  title="Dropoff Location"
                  value={rideDetails.dropoff_location.address}
                />
                <DetailRow title="Order No." value={rideDetails.id} />
                <DetailRow title="Blood Group" value={rideDetails.blood_type} />
                <DetailRow
                  title="Blood Units"
                  value={rideDetails.blood_units}
                />
                <TouchableOpacity
                  style={{ ...globalStyles.button, marginTop: 24 }}
                  onPress={handleConfirmDelivery}
                >
                  <Text style={{ color: "white" }}>Confirm Delivery</Text>
                </TouchableOpacity>
              </>
            )}
          </ScrollView>
        </View>
      )}
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
    height: "50%",
    top: "50%",
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
