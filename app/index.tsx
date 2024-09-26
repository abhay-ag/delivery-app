import { globalStyles } from "@/assets/styles/global";
import { BottomImage } from "@/components/BottomImagePlaceHolder";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={globalStyles.RootView}>
      <Image source={require("@/assets/images/bldDrp.png")} />
      <Text style={globalStyles.heading}>Blood Donor</Text>
      <Text style={globalStyles.subheading}>Donate Blood, Save Life</Text>
      <BottomImage isBloodVisible />
    </View>
  );
}
