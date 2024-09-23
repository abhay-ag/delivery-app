import { BottomImage } from "@/components/BottomImagePlaceHolder";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";

const NotificationItem = ({ hospital, bloodGroup, time, date }: any) => (
  <View style={styles.notificationItem}>
    <Text style={styles.hospitalText}>{hospital}</Text>
    <Text style={styles.infoText}>{bloodGroup}</Text>
    <Text style={styles.infoText}>
      Time : {time} {date}
    </Text>
  </View>
);

export const BloodDonationApp = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Image source={require("@/assets/images/bldDrp.png")} />
        <View style={styles.header}>
          <Text style={styles.notificationText}>Notification</Text>
        </View>

        <NotificationItem
          hospital="abc Hospital"
          bloodGroup="Blood group+ve"
          time="9:30"
          date="18 AUG 2024"
        />

        <NotificationItem
          hospital="xyz Hospital"
          bloodGroup="Blood group-ve"
          time="9:30"
          date="18 AUG 2024"
        />

        <NotificationItem
          hospital="xyz Hospital"
          bloodGroup="Blood group-ve"
          time="9:30"
          date="18 AUG 2024"
        />
      </ScrollView>
      <BottomImage opacity />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flexGrow: 1,
    alignItems: "center",
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  dropIconContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  notificationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "black",
    marginLeft: 5,
    alignSelf: "flex-start",
    marginTop: 3,
  },
  notificationItem: {
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    padding: 15,
    width: "90%",
    marginBottom: 10,
  },
  hospitalText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
  },
  footer: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFE6E6",
  },
});

export default BloodDonationApp;
