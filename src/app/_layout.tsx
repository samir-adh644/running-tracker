import { Stack } from "expo-router";
import { ProfileProvider } from "./profile-context";

export default function RootLayout() {
  return (
  <ProfileProvider>
    <Stack screenOptions={{ headerShown: false }} />
  </ProfileProvider>
);
}
