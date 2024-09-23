import { globalStyles } from "@/assets/styles/global";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ gap: 24, padding: 12 }}>
        <RideItem />
        <RideItem />
      </ScrollView>
    </SafeAreaView>
  );
}

function RideItem({}: any) {
  const router = useRouter();
  return (
    <View style={{ gap: 12 }}>
      <View style={styles.rideItem}>
        <View style={styles.row}>
          <Text style={styles.title}>Pickup</Text>
          <Text style={styles.subtitle}>Hello</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Dropoff</Text>
          <Text style={styles.subtitle}>Hello</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Total Distance</Text>
          <Text style={styles.subtitle}>Hello</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          router.navigate("/(home)/ride");
        }}
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
