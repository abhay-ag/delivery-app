import { globalStyles } from "@/assets/styles/global";
import { BottomImage } from "@/components/BottomImagePlaceHolder";
import BigButton from "@/components/Button";
import { useRouter } from "expo-router";
import { Image, SafeAreaView, Text } from "react-native";

export default function Setting() {
  const router = useRouter();
  return (
    <SafeAreaView style={globalStyles.RootView}>
      <Image source={require("@/assets/images/bldDrp.png")} />
      <Text style={globalStyles.heading}>Blood Donor</Text>
      <Text style={globalStyles.subheading}>Are you a?</Text>

      <BigButton text="DONOR" />
      <BigButton
        onClick={() => {
          router.push("/(auth)/");
        }}
        text="DELIVERY DRIVER"
      />
      <BottomImage />
    </SafeAreaView>
  );
}
