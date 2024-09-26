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
  Alert,
  View,
  StyleSheet,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../config";

export default function EmailScreen() {
  const router = useRouter();
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const sendCode = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/send-code/`, {
        email,
      });
      if (response.data) {
        setIsCodeSent(true);
        Alert.alert("Success", "Verification code sent to your email.");
      }
    } catch (error) {
      console.error("Error sending code:", error);
      Alert.alert("Error", "Failed to send verification code");
    }
  };

  const verifyCode = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/verify-code/`, {
        email,
        code,
      });
      if (response.data && response.data.token) {
        await AsyncStorage.setItem("authToken", response.data.token);
        router.navigate("/(home)/");
      } else {
        Alert.alert("Verification Failed", "Invalid code");
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      Alert.alert(
        "Verification Failed",
        "An error occurred during verification"
      );
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
          <TextInput
            style={globalStyles.input}
            placeholder="XXXXXX"
            value={code}
            onChangeText={setCode}
          />
          <TouchableOpacity
            onPress={verifyCode}
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
    fontSize: 16,
    textAlign: "center",
    marginVertical: 20,
  },
});
