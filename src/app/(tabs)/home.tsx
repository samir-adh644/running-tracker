import { COLORS } from "@/constants/colors";
import { EventSubscription } from "expo-modules-core";
import { Pedometer } from "expo-sensors";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getAllStats, saveStat } from "../../utils//storage";

export default function home() {
  const [displayedStepCount, setDisplayedStepCount] = useState<number>(0);
  const liveStepsRef = useRef<number>(0);

  useEffect(() => {
    let subscription: EventSubscription | undefined;
    let uiInterval: ReturnType<typeof setInterval> | undefined;

    const startPedometer = async () => {
      const savedStats = await getAllStats();
      const initialSteps = savedStats.steps;

      setDisplayedStepCount(initialSteps);
      liveStepsRef.current = initialSteps;

      const isAvailable = await Pedometer.isAvailableAsync();

      if (isAvailable) {
        subscription = Pedometer.watchStepCount((result) => {
          liveStepsRef.current = result.steps;
        });

        uiInterval = setInterval(async () => {
          const currentTotal = liveStepsRef.current;

          setDisplayedStepCount(currentTotal);
          await saveStat("steps", currentTotal);
        }, 30000);
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
