import { globalStyles } from "@/assets/styles/global";
import { BottomImage } from "@/components/BottomImagePlaceHolder";
import { useRouter } from "expo-router";
import React, { useState } from "react";
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
import RadioGroup, { RadioButtonProps } from "react-native-radio-buttons-group";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../config";

interface FormState {
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  address: string;
  gender: string;
  licenseNumber: string;
  vehicleType: string;
  vehicleNumber: string;
  dob: string;
}

const DeliveryRegistrationForm = (): JSX.Element => {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    username: "",
    password: "",
    email: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    address: "",
    gender: "male",
    licenseNumber: "",
    vehicleType: "",
    vehicleNumber: "",
    dob: "",
  });

  const radioButtonsData: RadioButtonProps[] = [
    { id: "1", label: "MALE", value: "male" },
    { id: "2", label: "FEMALE", value: "female" },
  ];

  const [gender, setGender] = useState("1");

  const handleRadioPress = (radio: any) => {
    setGender(radio);
    setForm({ ...form, gender: radio === "1" ? "male" : "female" });
  };

  const handleChange = (name: keyof FormState, value: string): void => {
    setForm({ ...form, [name]: value });
  };

  const handleRegister = async (): Promise<void> => {
    try {
      const response = await axios.post(`${BASE_URL}/api/register/`, form);
      if (response.data && response.data.token) {
        await AsyncStorage.setItem("authToken", response.data.token);
        router.navigate("/(home)/");
      } else {
        Alert.alert(
          "Registration Failed",
          "An error occurred during registration"
        );
      }
    } catch (error) {
      console.error("Registration error:", error);
      Alert.alert(
        "Registration Failed",
        "An error occurred during registration"
      );
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#EEEFF0" }}>
      <ScrollView
        automaticallyAdjustKeyboardInsets
        contentContainerStyle={styles.container}
      >
        <Image source={require("@/assets/images/bldDrp.png")} />
        <View style={styles.inputContainer}>
          <Text style={styles.label}>First Name*</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Input text"
            value={form.first_name}
            onChangeText={(value) => handleChange("first_name", value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Last Name*</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Input text"
            value={form.last_name}
            onChangeText={(value) => handleChange("last_name", value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Date of Birth*</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Input text"
            value={form.dob}
            onChangeText={(value) => handleChange("dob", value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Gender*</Text>
          <RadioGroup
            radioButtons={radioButtonsData}
            selectedId={gender}
            onPress={handleRadioPress}
            layout="row"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>E-Mail*</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Input text"
            keyboardType="email-address"
            value={form.email}
            onChangeText={(value) => handleChange("email", value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Mobile Number*</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Input text"
            keyboardType="phone-pad"
            value={form.phone_number}
            onChangeText={(value) => handleChange("phone_number", value)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Residential Address*</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Input text"
            value={form.address}
            onChangeText={(value) => handleChange("address", value)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>License Number*</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Input text"
            value={form.licenseNumber}
            onChangeText={(value) => handleChange("licenseNumber", value)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Vehicle Type*</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Input text"
            value={form.vehicleType}
            onChangeText={(value) => handleChange("vehicleType", value)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Vehicle Number*</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Input text"
            value={form.vehicleNumber}
            onChangeText={(value) => handleChange("vehicleNumber", value)}
          />
        </View>

        <Text style={styles.mandatory}>*These fields are mandatory</Text>

        <TouchableOpacity style={globalStyles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Proceed</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            gap: 4,
            alignItems: "center",
          }}
        >
          <Text>Already registered?</Text>
          <TouchableOpacity
            onPress={() => {
              router.navigate("/(auth)/");
            }}
          >
            <Text style={{ color: "red" }}>LOGIN HERE</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomImage />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    alignItems: "center",
    gap: 24,
    paddingBottom: 80,
  },
  label: {
    alignSelf: "flex-start",
    marginBottom: 5,
    fontSize: 14,
    color: "gray",
  },
  mandatory: {
    fontSize: 12,
    color: "gray",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "500",
  },
  inputContainer: {
    display: "flex",
    gap: 4,
    width: "100%",
  },
});

export default DeliveryRegistrationForm;
