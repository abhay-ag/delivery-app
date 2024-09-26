import React, { useState, useEffect } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { BASE_URL } from "../config";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function QRCodeScanner() {
  const [hasPermission, setHasPermission] = useState<any>(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState("");
  const router = useRouter();
  const { rideId } = useLocalSearchParams();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }: any) => {
    setScanned(true);
    setScannedData(data);
    try {
      const token = await AsyncStorage.getItem("authToken");
      const response = await axios.post(
        `${BASE_URL}/api/deliveries/${rideId}/scan_qr/`,
        { qr_data: data },
        { headers: { Authorization: `Token ${token}` } }
      );
      
      if (response.data.error) {
        Alert.alert("Error", response.data.message);
        setScanned(false);
        return;
      }
      
      Alert.alert("Success", "QR code scanned successfully", [
        { text: "OK", onPress: () => navigateBack() }
      ]);
    } catch (error) {
      console.error("Error scanning QR code:", error);
      
        Alert.alert("Error", "An unexpected error occurred while scanning the QR code.");
      setScanned(false);
    }
  };

  const navigateBack = () => {
    router.back();
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && (
        <Button title="Tap to Scan Again" onPress={() => setScanned(false)} />
      )}

      {scannedData ? (
        <View style={styles.result}>
          <Text>Scanned Data: {scannedData}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  result: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
});
