import { globalStyles } from "@/assets/styles/global";
import { BottomImage } from "@/components/BottomImagePlaceHolder";
import { Image, StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        router.replace("/(home)/");
      } else {
        router.replace("/(auth)/");
      }
    };

    checkAuth();
  }, [router]);

  return (
    <View style={globalStyles.RootView}>
      <Image source={require("@/assets/images/bldDrp.png")} />
      <Text style={globalStyles.heading}>Blood Donor</Text>
      <Text style={globalStyles.subheading}>Donate Blood, Save Life</Text>
      <BottomImage isBloodVisible />
    </View>
  );
}
