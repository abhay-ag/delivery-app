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

export default function PasswordScreen() {
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
          />
          <TextInput
            style={globalStyles.input}
            secureTextEntry
            placeholder="confirm password"
          />
          <TouchableOpacity style={globalStyles.button}>
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
