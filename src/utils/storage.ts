import AsyncStorage from "@react-native-async-storage/async-storage";

export type StatKey = "bmi" | "hydration" | "steps" | "distance";

export const saveStat = async (key: StatKey, value: number) => {
  try {
    await AsyncStorage.setItem(key, value.toString());
  } catch (error) {
    console.error(`Failed to save separate stat [${key}]:`, error);
  }
};

export const getAllStats = async () => {
  try {
    const keys: StatKey[] = ["bmi", "hydration", "steps", "distance"];

    const pairs = await AsyncStorage.multiGet(keys);

    const statsObject = pairs.reduce(
      (acc, [key, value]) => {
        acc[key as StatKey] = value ? parseFloat(value) : 0;
        return acc;
      },
      {} as Record<StatKey, number>,
    );

    return statsObject;
  } catch (error) {
    console.error("Failed to fetch multiGet stats:", error);
    return { bmi: 0, hydration: 0, steps: 0, distance: 0 };
  }
};
