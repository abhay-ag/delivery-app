import { createDrawerNavigator } from "@react-navigation/drawer";
import { Button, View } from "react-native";
import DeliveryScreen from "./rideDetails";
import UserProfileScreen from "./profile";
import BloodDonationApp from "./notification";
import HomeScreen from "./home";
import QRCodeScanner from "./qr";
import InProgressJobs from "./currentJobs";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/AntDesign";

export default function Home() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        headerTitle: "",
        headerRight: () => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Notifications");
            }}
            style={{ paddingHorizontal: 10 }}
          >
            <Icon name="bells" size={20} />
          </TouchableOpacity>
        ),
      })}
      initialRouteName="home"
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="In Progress" component={InProgressJobs} />
      <Drawer.Screen name="Profile" component={UserProfileScreen} />
      <Drawer.Screen name="Notifications" component={BloodDonationApp} />
    </Drawer.Navigator>
  );
}
