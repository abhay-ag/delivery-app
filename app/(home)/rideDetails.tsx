import { SafeAreaView, ScrollView, Text, TouchableOpacity } from "react-native";
import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { globalStyles } from "@/assets/styles/global";
import { useState } from "react";
import { useRoute } from "@react-navigation/native";

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
