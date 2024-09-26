import { globalStyles } from "@/assets/styles/global";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView from "react-native-maps";

export default function Ride() {
  const {rideId, pickup_location, dropoff_location} = useLocalSearchParams<any>();
  const router = useRouter();
  return (
    <View style={{ flex: 1 }}>
      <MapView style={{ flex: 1 }} />
      <View
        style={{
          position: "absolute",
          top: 200,
          width: "100%",
          height: "100%",
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          backgroundColor: "#eeeff0",
          padding: 24,
        }}
      >
        <ScrollView contentContainerStyle={{ gap: 12 }}>
          <View style={styles.row}>
            <Text style={styles.title}>Pickup:</Text>
            <Text style={styles.subheading}>
              { pickup_location}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>Drop off:</Text>
            <Text style={styles.subheading}>
              {dropoff_location}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>Order ID:</Text>
            <Text style={styles.subheading}>{rideId}</Text>
          </View>

          <TouchableOpacity
            style={globalStyles.button}
            onPress={() => {
              router.replace("/(home)/");
            }}
          >
            <Text style={{ color: "white" }}>Go to home</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 36,
    borderBottomColor: "#e0e0e0",
    borderBottomWidth: 1,
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
