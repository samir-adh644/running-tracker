import { getAllStats } from "@/utils/storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import StatCard from "../../components/statCard";

const StatsScreen = () => {
  const { top } = useSafeAreaInsets();

  const [stats, setStats] = useState({
    bmi: 0,
    hydration: 0,
    steps: 0,
    distance: 0,
  });

  const loadStats = async () => {
    const currentStats = await getAllStats();
    console.log("Fetched Separate Stats:", currentStats);
    setStats(currentStats);
  };

  useFocusEffect(
    useCallback(() => {
      loadStats();
    }, []),
  );

  const isBmiNormal = stats.bmi >= 18.5 && stats.bmi <= 24.9;
  const isHydrationGood = stats.hydration >= 6;

  return (
    <View style={[{ paddingTop: top + 16 }, styles.mainContainer]}>
      <Text
        style={{
          fontSize: 30,
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: 16,
        }}
      >
        Your Stats
      </Text>

      <ScrollView style={styles.statHolders}>
        <StatCard
          title={"Steps Counter"}
          value={stats.steps.toLocaleString()}
          message={
            stats.steps > stats.distance
              ? "Great job walking today!"
              : `You are ${(stats.distance - stats.steps).toLocaleString()} away from your daily goal`
          }
          isAlert={stats.steps <= stats.distance}
        />

        <StatCard
          title={"BMI Index"}
          value={stats.bmi.toFixed(1)}
          message={
            isBmiNormal
              ? "Your BMI index is Normal"
              : "Your BMI index is outside the normal range"
          }
          isAlert={!isBmiNormal}
        />

        <StatCard
          title={"Hydration"}
          value={`${stats.hydration} Glasses`}
          message={
            isHydrationGood
              ? "You are hydrated well!"
              : "You drank very less water today"
          }
          isAlert={!isHydrationGood}
        />

        <StatCard
          title="Distance Travelled"
          value={`${(stats.steps * 0.00072).toFixed(2)} km`}
          message="Keep walking!"
          isAlert={false}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: { paddingBottom: 30, flex: 1, paddingHorizontal: 20, gap: 20 },
  statHolders: {},
});

export default StatsScreen;
