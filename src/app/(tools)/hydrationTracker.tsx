import { COLORS } from "@/constants/colors";
import { saveStat } from "@/utils/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
export default function HydrationTracker() {
  const { top } = useSafeAreaInsets();
  const [glasses, setGlasses] = useState(0);

  const loadInitialHydration = async () => {
    try {
      const savedHydration = await AsyncStorage.getItem("hydration");
      if (savedHydration !== null) {
        setGlasses(parseInt(savedHydration, 10));
      }
    } catch (error) {
      console.error("Failed to load local hydration tracking state", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadInitialHydration();
    }, []),
  );

  const handleDrink = async () => {
    const nextCount = glasses + 1;
    setGlasses(nextCount);
    await saveStat("hydration", nextCount);
  };

  const handleReset = () => {
    setGlasses(0);
  };

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <View style={styles.counterContainer}>
        <Text style={styles.countNumber}>{glasses}</Text>
        <Text style={styles.countLabel}>Glasses Drank</Text>
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.waterButton}
        onPress={handleDrink}
      >
        <View style={styles.innerCircle}>
          <Text style={styles.buttonEmoji}>💧</Text>
          <Text style={styles.buttonText}>TAP ME</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.footerContainer}>
        {glasses > 0 && (
          <TouchableOpacity onPress={handleReset}>
            <Text style={styles.resetText}>Reset</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 50,
  },
  counterContainer: {
    alignItems: "center",
  },
  countNumber: {
    fontSize: 84,
    fontWeight: "900",
    color: COLORS.primary,
  },
  countLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#64748B",
    marginTop: -5,
  },
  waterButton: {
    width: width * 0.55,
    height: width * 0.55,
    borderRadius: (width * 0.55) / 2,
    backgroundColor: "#E0F2FE",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  innerCircle: {
    width: width * 0.46,
    height: width * 0.46,
    borderRadius: (width * 0.46) / 2,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: COLORS.card,
  },
  buttonEmoji: {
    fontSize: 36,
    marginBottom: 4,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  footerContainer: {
    height: 30,
    justifyContent: "center",
  },
  resetText: {
    color: "#94A3B8",
    fontSize: 15,
    fontWeight: "600",
  },
});
