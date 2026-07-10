import { EventSubscription } from "expo-modules-core";
import { Pedometer } from "expo-sensors";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
// Import your existing storage utility layer here
import { COLORS } from "@/constants/colors";
import { getAllStats, saveStat } from "../../utils//storage";

export default function App() {
  const [displayedStepCount, setDisplayedStepCount] = useState<number>(0);
  const liveStepsRef = useRef<number>(0);

  useEffect(() => {
    let subscription: EventSubscription | undefined;
    let uiInterval: ReturnType<typeof setInterval> | undefined;

    const startPedometer = async () => {
      // 1. Hydrate state using your custom getAllStats utility
      const savedStats = await getAllStats();
      const initialSteps = savedStats.steps;

      setDisplayedStepCount(initialSteps);
      liveStepsRef.current = initialSteps; // Keep baseline aligned

      const isAvailable = await Pedometer.isAvailableAsync();

      if (isAvailable) {
        // 2. Continually monitor background steps
        subscription = Pedometer.watchStepCount((result) => {
          liveStepsRef.current = result.steps;
        });

        // 3. Update the UI and persist using saveStat every 60 seconds
        uiInterval = setInterval(async () => {
          const currentTotal = liveStepsRef.current;

          setDisplayedStepCount(currentTotal);
          await saveStat("steps", currentTotal); // Uses your custom helper directly
        }, 60000);
      }
    };

    startPedometer();

    return () => {
      if (subscription) subscription.remove();
      if (uiInterval) clearInterval(uiInterval);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.stepText}>Walk! And watch this go up:</Text>
        <Text style={styles.stepCount}>{displayedStepCount}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 16,
    padding: 24,
    width: "100%",
    maxWidth: 320,
    alignItems: "center",
  },
  stepText: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.skeletonText,
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  stepCount: {
    fontSize: 56,
    fontWeight: "800",
    color: COLORS.primary,
  },
});
