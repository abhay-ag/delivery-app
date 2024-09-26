import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      const checkAuth = async () => {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          router.replace("/(home)/");
        } else {
          router.replace("/init");
        }
      };
      checkAuth();
    }, 2000);
  }, [router]);
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="init" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(home)" options={{ headerShown: false }} />
    </Stack>
  );
}
