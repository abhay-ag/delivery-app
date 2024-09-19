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
});
