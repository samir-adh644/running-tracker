import { HeaderText } from "@/components/HeaderText";
import { COLORS } from "@/constants/colors";
import { useRouter } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const tools = () => {
  const { top } = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={[styles.mainContainer, { paddingTop: top + 16 }]}>
      <View style={styles.toolCard}>
        <HeaderText style={styles.cardHeader}>BMI Calculator</HeaderText>
        <Text style={styles.cardDescription}>Calculate your BMI.</Text>
        <TouchableOpacity
          style={styles.proceedButton}
          onPress={() => {
            router.navigate("/(tools)/calculateBMI");
          }}
        >
          <Text style={styles.proceedText}>Proceed</Text>
          <ChevronRight size={22} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.toolCard}>
        <HeaderText style={styles.cardHeader}>Hydration Tracker</HeaderText>
        <Text style={styles.cardDescription}>Track your hydration.</Text>
        <TouchableOpacity
          style={styles.proceedButton}
          onPress={() => {
            router.navigate("/(tools)/hydrationTracker");
          }}
        >
          <Text style={styles.proceedText}>Proceed</Text>
          <ChevronRight size={22} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.toolCard}>
        <HeaderText style={styles.cardHeader}>Remainder</HeaderText>
        <Text style={styles.cardDescription}>Set Remainder for workout.</Text>
        <TouchableOpacity
          style={styles.proceedButton}
          onPress={() => {
            router.navigate("/(tools)/remainder");
          }}
        >
          <Text style={styles.proceedText}>Proceed</Text>
          <ChevronRight size={22} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
    gap: 16,
  },
  toolCard: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 16,
  },
  proceedButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F8FAFC",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  proceedText: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.primary,
  },
});

export default tools;
