import { globalStyles } from "@/assets/styles/global";
import { BottomImage } from "@/components/BottomImagePlaceHolder";
import Input from "@/components/Input";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Auth() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#EEEFF0" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require("@/assets/images/bldDrp.png")} />
        <Text style={styles.heading}>Log into your account!</Text>
        <View style={styles.inner}>
          <Input placeholder="Email Address" />
          <Input placeholder="Password" secureTextEntry={true} />
        </View>
        <TouchableOpacity style={globalStyles.button}>
          <Text style={{ color: "white", fontWeight: "500" }}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Forgot your password?</Text>
        </TouchableOpacity>
        <View style={styles.cta}>
          <Text>Don't have an account?</Text>
          <TouchableOpacity>
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
