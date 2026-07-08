import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";

export function WebBadge() {
  return (
    <View style={styles.badge}>
      <ThemedText type="smallBold">Web</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#e5e7eb",
    marginTop: 16,
  },
});
