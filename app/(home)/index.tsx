import { createDrawerNavigator } from "@react-navigation/drawer";
import { View } from "react-native";
import DeliveryScreen from "./rideDetails";
import UserProfileScreen from "./profile";
import BloodDonationApp from "./notification";

export default function Home() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitle: "",
      }}
      initialRouteName="profile"
    >
      <Drawer.Screen name="Profile" component={UserProfileScreen} />
      <Drawer.Screen name="Notifications" component={BloodDonationApp} />
    </Drawer.Navigator>
  );
}
