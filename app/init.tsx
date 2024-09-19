import { globalStyles } from "@/assets/styles/global";
import { BottomImage } from "@/components/BottomImagePlaceHolder";
import BigButton from "@/components/Button";
import { Image, SafeAreaView, Text } from "react-native";

export default function Setting() {
  return (
    <SafeAreaView style={globalStyles.RootView}>
      <Image source={require("@/assets/images/bldDrp.png")} />
      <Text style={globalStyles.heading}>Blood Donor</Text>
      <Text style={globalStyles.subheading}>Are you a?</Text>

      <BigButton text="DONOR" />
      <BigButton text="DELIVERY DRIVER" />
      <BottomImage />
    </SafeAreaView>
  );
}
