import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="notification" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="index" />
      <Stack.Screen name="qr" />
      <Stack.Screen
        name="rideDetails"
        options={{
          headerShown: true,
          headerTitle: "Job Details",
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="ride"
        options={{
          headerShown: true,
          headerTitle: "Ride Details",
          headerBackTitleVisible: false,
        }}
      />
    </Stack>
  );
}
