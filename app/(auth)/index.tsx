import { globalStyles } from "@/assets/styles/global";
import { BottomImage } from "@/components/BottomImagePlaceHolder";
import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../config";
import Icon from "react-native-vector-icons/AntDesign";

export default function Auth() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login/`, {
        email,
        password,
      });

      if (response.data && response.data.token) {
        // Store the token securely
        await AsyncStorage.setItem("authToken", response.data.token);
        router.navigate("/(home)/");
      } else {
        Alert.alert("Login Failed", "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Login Failed", "An error occurred during login");
    }
  };

  const [secure, setSecure] = useState(true);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#EEEFF0" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require("@/assets/images/bldDrp.png")} />
        <Text style={styles.heading}>Log into your account!</Text>
        <View style={styles.inner}>
          <TextInput
            style={globalStyles.input}
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
          />
          <View
            style={{
              flexDirection: "row",
              gap: 4,
              alignItems: "center",
              ...globalStyles.input,
            }}
          >
            <TextInput
              style={{ flex: 1 }}
              placeholder="Password"
              secureTextEntry={secure}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => {
                setSecure(!secure);
              }}
            >
              <Icon name="eye" size={24} />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={globalStyles.button} onPress={handleLogin}>
          <Text style={{ color: "white", fontWeight: "500" }}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Forgot your password?</Text>
        </TouchableOpacity>
        <View style={styles.cta}>
          <Text>Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              router.navigate("/(auth)/register");
            }}
          >
            <Text style={{ color: "red" }}>REGISTER NOW</Text>
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
  },
  heading: {
    fontSize: 32,
    fontWeight: "500",
  },
  inner: {
    gap: 12,
    width: "100%",
    marginTop: 56,
  },
  cta: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    marginTop: 120,
  },
});
