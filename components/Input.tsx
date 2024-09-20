import { StyleSheet, TextInput } from "react-native";

export default function Input({ placeholder, secureTextEntry }: any) {
  return (
    <TextInput
      style={styles.input}
      secureTextEntry={secureTextEntry}
      placeholder={placeholder}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 48,
    borderRadius: 8,
    padding: 8,
    backgroundColor: "white",
  },
});
