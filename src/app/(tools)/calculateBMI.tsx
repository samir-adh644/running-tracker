import { COLORS } from "@/constants/colors";
import { saveStat } from "@/utils/storage";
import { useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function BMICalculator() {
  const { top } = useSafeAreaInsets();
  const [weight, setWeight] = useState("");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [bmi, setBmi] = useState<string | null>(null);
  const [category, setCategory] = useState("");

  const calculateBMI = async () => {
    Keyboard.dismiss();

    const w = parseFloat(weight);
    const f = parseFloat(feet) || 0;
    const i = parseFloat(inches) || 0;

    if (!w || (f === 0 && i === 0)) {
      alert("Please enter valid weight and height values.");
      return;
    }

    const totalMeters = f * 0.3048 + i * 0.0254;

    const bmiValue = w / (totalMeters * totalMeters);
    setBmi(bmiValue.toFixed(1));
    const parsedData = parseFloat(bmiValue.toFixed(1));

    await saveStat("bmi", parsedData);

    if (bmiValue < 18.5) setCategory("Underweight");
    else if (bmiValue >= 18.5 && bmiValue < 25) setCategory("Normal Weight");
    else if (bmiValue >= 25 && bmiValue < 30) setCategory("Overweight");
    else setCategory("Obese");
  };

  const resetFields = () => {
    setWeight("");
    setFeet("");
    setInches("");
    setBmi(null);
    setCategory("");
  };

  return (
    <View style={[{ paddingTop: top }, styles.container]}>
      <Text style={styles.header}>BMI Calculator</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Weight (kg)</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., 70"
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />

        <Text style={styles.label}>Height</Text>
        <View style={styles.row}>
          <View style={styles.flexChild}>
            <TextInput
              style={styles.input}
              placeholder="Feet"
              keyboardType="numeric"
              value={feet}
              onChangeText={setFeet}
            />
          </View>
          <View style={[styles.flexChild, { marginLeft: 15 }]}>
            <TextInput
              style={styles.input}
              placeholder="Inches"
              keyboardType="numeric"
              value={inches}
              onChangeText={setInches}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={calculateBMI}>
          <Text style={styles.buttonText}>Calculate BMI</Text>
        </TouchableOpacity>

        {bmi && (
          <TouchableOpacity style={styles.resetButton} onPress={resetFields}>
            <Text style={styles.resetText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      {bmi && (
        <View style={styles.resultCard}>
          <Text style={styles.resultLabel}>Your BMI is</Text>
          <Text style={styles.resultValue}>{bmi}</Text>
          <Text style={styles.categoryValue}>{category}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  header: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1A1C20",
    textAlign: "center",
    marginBottom: 25,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 24,
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.border || "#E2E8F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4A505A",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: COLORS.border || "#E2E8F0",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#1A1C20",
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  flexChild: {
    flex: 1,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  resetButton: {
    alignItems: "center",
    marginTop: 15,
  },
  resetText: {
    color: COLORS.skeletonText === "gray" ? "#94A3B8" : "#94A3B8",
    fontSize: 14,
    fontWeight: "500",
  },
  resultCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border || "#E2E8F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  resultLabel: {
    fontSize: 14,
    color: "#64748B",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  resultValue: {
    fontSize: 42,
    fontWeight: "800",
    color: "#1E293B",
    marginVertical: 4,
  },
  categoryValue: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 2,
    color: COLORS.primary,
  },
});
