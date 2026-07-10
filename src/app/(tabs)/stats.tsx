import { getAllStats } from "@/utils/storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import StatCard from "../../components/statCard";

const stats = () => {
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

  return (
    <View style={[{ paddingTop: top + 16 }, styles.mainContainer]}>
      <Text style={{ fontSize: 30, textAlign: "center", fontWeight: "bold" }}>
        Your Stats
      </Text>
      <ScrollView style={styles.statHolders}>
        <StatCard
          title={"Steps Counter"}
          value={stats.steps.toString()}
          status="None"
        />
        <StatCard
          title={"BMI Index"}
          value={stats.bmi.toString()}
          status={
            stats.bmi >= 18.5 && stats.bmi <= 24.9 ? "Normal" : "Not Normal"
          }
        />
        <StatCard
          title={"Hydration"}
          value={stats.hydration.toString()}
          status={stats.hydration > 6 ? "Normal" : "Not Normal"}
        />
        <StatCard
          title="Distance Travelled"
          value={(stats.steps * 0.72).toString()}
          status="None"
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: { paddingBottom: 30 },
  statHolders: {},
});

export default stats;
