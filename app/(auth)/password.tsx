import { globalStyles } from "@/assets/styles/global";
import { BottomImage } from "@/components/BottomImagePlaceHolder";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { StyleSheet, View } from "react-native";
import { useState } from "react";

export default function PasswordScreen() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
    } else {
      setError("");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require("@/assets/images/bldDrp.png")} />
        <Text style={styles.text}>Please create a strong password</Text>
        <View style={{ width: "100%", gap: 12 }}>
          <TextInput
            style={globalStyles.input}
            secureTextEntry
            placeholder="password"
            value={password} // Bind password state
            onChangeText={setPassword} // Update password state
          />
          <TextInput
            style={globalStyles.input}
            secureTextEntry
            placeholder="confirm password"
            value={confirmPassword} // Bind confirm password state
            onChangeText={setConfirmPassword} // Update confirm password state
          />
          {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
          <TouchableOpacity style={globalStyles.button} onPress={handleSubmit}>
            <Text style={{ color: "white" }}>Submit</Text>
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
