import { globalStyles } from "@/assets/styles/global";
import { BottomImage } from "@/components/BottomImagePlaceHolder";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, SafeAreaView } from "react-native";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import RadioGroup from "react-native-radio-buttons-group";

const DeliveryRegistrationForm = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "male",
    email: "",
    mobile: "",
    address: "",
    licenseNumber: "",
    vehicleType: "",
    vehicleNumber: "",
  });

  const radioButtonsData = [
    { id: "1", label: "MALE", value: "male" },
    { id: "2", label: "FEMALE", value: "female" },
  ];

  const [gender, setGender] = useState("1");

  const handleChange = (field: any, value: any) => {
    setForm({ ...form, [field]: value });
  };

  const handleRadioPress = (radio: any) => {
    setGender(radio);
    setForm({ ...form, gender: radio === "1" ? "male" : "female" });
  };

  const router = useRouter();
  const handleSubmit = () => {
    // Handle form submission logic
    console.log(form);
    router.navigate("/(auth)/email");
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
