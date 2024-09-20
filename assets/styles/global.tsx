import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  RootView: {
    backgroundColor: "#eeeff0",
    flex: 1,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
  },
  heading: {
    fontSize: 36,
    textAlign: "center",
    fontWeight: "500",
  },
  subheading: {
    fontSize: 20,
    fontWeight: "900",
  },
  button: {
    width: "100%",
    height: 48,
    display: "flex",
    alignItems: "center",
    backgroundColor: "#B64245",
    justifyContent: "center",
    borderRadius: 4,
  },
  input: {
    width: "100%",
    height: 48,
    borderRadius: 8,
    padding: 8,
    backgroundColor: "white",
    borderWidth: 0.25,
    borderColor: "#999",
  },
});
