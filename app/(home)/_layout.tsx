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
      <Stack.Screen name="rideDetails" />
      <Stack.Screen name="ride" />
    </Stack>
  );
}
