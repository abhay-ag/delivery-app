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
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from "@env";

interface FormState {
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  address: string;
  gender: string;
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
  });

  const radioButtonsData: RadioButtonProps[] = [
    { id: "1", label: "MALE", value: "male" },
    { id: "2", label: "FEMALE", value: "female" },
  ];

  const handleChange = (name: keyof FormState, value: string): void => {
    setForm({ ...form, [name]: value });
  };

  const handleRegister = async (): Promise<void> => {
    try {
      const response = await axios.post(`${BASE_URL}/api/register/`, form);
      if (response.data && response.data.token) {
        await AsyncStorage.setItem('authToken', response.data.token);
        router.navigate("/(home)/");
      } else {
        Alert.alert("Registration Failed", "An error occurred during registration");
      }
    } catch (error) {
      console.error("Registration error:", error);
      Alert.alert("Registration Failed", "An error occurred during registration");
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
          value={form.firstName}
          onChangeText={(value) => handleChange("firstName", value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Last Name*</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="Input text"
          value={form.lastName}
          onChangeText={(value) => handleChange("lastName", value)}
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
          value={form.mobile}
          onChangeText={(value) => handleChange("mobile", value)}
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

      <TouchableOpacity style={globalStyles.button} onPress={handleSubmit}>
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

export default DeliveryRegistrationForm;
