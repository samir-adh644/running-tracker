import { COLORS } from "@/constants/colors";
import { getAllStats, saveStat } from "@/utils/storage";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const RootIndex = () => {
  const { top } = useSafeAreaInsets();

  const [isLoading, setIsLoading] = useState(true);
  const [hasGoal, setHasGoal] = useState(false);
  const [inputGoal, setInputGoal] = useState("");

  useEffect(() => {
    const checkUserGoal = async () => {
      const stats = await getAllStats();
      if (stats.distance > 0) {
        setHasGoal(true);
      }
      setIsLoading(false);
    };
    checkUserGoal();
  }, []);

  const handleSaveGoal = async () => {
    const parsedGoal = parseInt(inputGoal, 10);

    if (isNaN(parsedGoal) || parsedGoal <= 0) {
      alert("Please enter a valid number of steps!");
      return;
    }

    await saveStat("distance", parsedGoal);
    setHasGoal(true);
  };

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (hasGoal) {
    return <Redirect href="./(tabs)/home" />;
  }

  return (
    <View style={[styles.container, { paddingTop: top + 40 }]}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.subtitle}>
          Set your daily step goal to get started:
        </Text>

        <TextInput
          style={styles.input}
          placeholder="e.g., 10000"
          placeholderTextColor={COLORS.skeletonText}
          keyboardType="numeric"
          value={inputGoal}
          onChangeText={setInputGoal}
        />

        <TouchableOpacity style={styles.button} onPress={handleSaveGoal}>
          <Text style={styles.buttonText}>Save & Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.skeletonText,
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#FAFAFA",
    marginBottom: 20,
    color: "#000",
  },
  button: {
    backgroundColor: COLORS.button,
    width: "100%",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default RootIndex;
