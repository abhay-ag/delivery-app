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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#EEEFF0" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require("@/assets/images/bldDrp.png")} />
        <Text style={styles.heading}>Register as a Delivery Staff</Text>
        <View style={styles.inner}>
          <TextInput
            style={globalStyles.input}
            placeholder="Username"
            value={form.username}
            onChangeText={(value) => handleChange("username", value)}
          />
          <TextInput
            style={globalStyles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={form.password}
            onChangeText={(value) => handleChange("password", value)}
          />
          <TextInput
            style={globalStyles.input}
            placeholder="Email"
            value={form.email}
            onChangeText={(value) => handleChange("email", value)}
          />
          <TextInput
            style={globalStyles.input}
            placeholder="First Name"
            value={form.first_name}
            onChangeText={(value) => handleChange("first_name", value)}
          />
          <TextInput
            style={globalStyles.input}
            placeholder="Last Name"
            value={form.last_name}
            onChangeText={(value) => handleChange("last_name", value)}
          />
          <TextInput
            style={globalStyles.input}
            placeholder="Phone Number"
            value={form.phone_number}
            onChangeText={(value) => handleChange("phone_number", value)}
          />
          <TextInput
            style={globalStyles.input}
            placeholder="Address"
            value={form.address}
            onChangeText={(value) => handleChange("address", value)}
          />
          <RadioGroup
            radioButtons={radioButtonsData}
            onPress={(radioButtonsArray:any) => {
              const selectedButton = radioButtonsArray.find((button:any) => button.selected);
              if (selectedButton) {
                handleChange("gender", selectedButton.value);
              }
            }}
            layout="row"
          />
        </View>
        <TouchableOpacity
          style={globalStyles.button}
          onPress={handleRegister}
        >
          <Text style={{ color: "white", fontWeight: "500" }}>REGISTER</Text>
        </TouchableOpacity>
        <View style={styles.cta}>
          <Text>Already have an account?</Text>
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
