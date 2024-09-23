import { globalStyles } from "@/assets/styles/global";
import { BottomImage } from "@/components/BottomImagePlaceHolder";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { StyleSheet, View } from "react-native";

export default function EmailScreen() {
  const router = useRouter();
  const [isCodeSent, setIsCodeSent] = useState(false);

  const sendCode = async () => {
    const response = await fetch("YOUR_API_ENDPOINT", { method: "POST" });
    if (response.ok) {
      setIsCodeSent(true);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require("@/assets/images/bldDrp.png")} />
        <Text style={styles.text}>
          Please enter the code you received. The code will expire in 10
          minutes.
        </Text>
        <View style={{ width: "100%", gap: 12 }}>
          <TextInput style={globalStyles.input} placeholder="e-mail here" />
          <TouchableOpacity onPress={sendCode} style={globalStyles.button}>
            <Text style={{ color: "white" }}>Send Code</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: "100%", gap: 12 }}>
          <TextInput style={globalStyles.input} placeholder="XXXXXX" />
          <TouchableOpacity
            onPress={() => {
              router.navigate("/(auth)/password");
            }}
            style={globalStyles.button}
            disabled={!isCodeSent}
          >
            <Text style={{ color: "white" }}>Verify Code</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomImage />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    alignItems: "center",
    gap: 24,
  },
  text: {
    fontWeight: "700",
    fontSize: 18,
    textAlign: "center",
    maxWidth: 250,
  },
});
