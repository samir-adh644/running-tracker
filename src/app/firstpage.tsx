import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";
import { useProfile } from "./profile-context";

// Small helper so every field matches the "label above value" look in the design
const FloatingInput = ({
  placeholder,
  value,
  onChangeText,
  keyboardType,
  suffix,
  maxLength,
  style,
}: {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: "default" | "number-pad" | "decimal-pad";
  suffix?: string;
  maxLength?: number;
  style?: any;
}) => {
  return (
    <View style={[styles.fieldBox, style]}>
      <View style={styles.fieldBoxHeader}>
        <ThemedText style={styles.fieldPlaceholder}>{placeholder}</ThemedText>
        {suffix ? (
          <ThemedText style={styles.fieldSuffix}>{suffix}</ThemedText>
        ) : null}
      </View>
      <TextInput
        style={styles.fieldValue}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType ?? "default"}
        maxLength={maxLength}
      />
    </View>
  );
};

type FirstPageProps = {
  onNext?: () => void;
};

const FirstPage = ({ onNext }: FirstPageProps) => {
  const { data, updateField } = useProfile();
  const [heightFtOpen, setHeightFtOpen] = useState(false);
  const [heightInOpen, setHeightInOpen] = useState(false);

  const handleNext = () => {
    if (!data.name.trim()) {
      Alert.alert("Missing name", "Please enter your full name.");
      return;
    }
    if (
      isNaN(Number(data.heightFt)) ||
      isNaN(Number(data.heightIn)) ||
      isNaN(Number(data.weight)) ||
      isNaN(Number(data.stepGoal))
    ) {
      Alert.alert("Invalid input", "Please check your numbers and try again.");
      return;
    }
    onNext?.();
  };

  return (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <ThemedText type="subtitle" style={styles.title}>
        Keep You Fit
      </ThemedText>
      <ThemedText style={styles.subtitle}>
        Tell us about yourself to personalize your plan.
      </ThemedText>

      <View style={styles.progressRow}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: "33%" }]} />
        </View>
        <ThemedText style={styles.progressLabel}>Step 1/3</ThemedText>
      </View>

      <ThemedView style={styles.card}>
        <ThemedText type="smallBold" style={styles.sectionLabel}>
          Full Name
        </ThemedText>
        <FloatingInput
          placeholder="Enter your full name"
          value={data.name}
          onChangeText={(text) => updateField("name", text)}
        />

        <ThemedText type="smallBold" style={[styles.sectionLabel, styles.sectionSpacing]}>
          Your Details
        </ThemedText>

        <View style={styles.detailRow}>
          <View style={styles.detailColumn}>
            <ThemedText style={styles.detailLabel}>Height</ThemedText>
            <View style={styles.heightRow}>
              <Pressable
                style={styles.heightBox}
                onPress={() => setHeightFtOpen((prev) => !prev)}
              >
                <ThemedText style={styles.heightBoxLabel}>Feet ft</ThemedText>
                <TextInput
                  style={styles.heightBoxValue}
                  value={data.heightFt}
                  onChangeText={(text) => updateField("heightFt", text)}
                  keyboardType="number-pad"
                  maxLength={1}
                />
              </Pressable>
              <Pressable
                style={styles.heightBox}
                onPress={() => setHeightInOpen((prev) => !prev)}
              >
                <ThemedText style={styles.heightBoxLabel}>Inches in</ThemedText>
                <TextInput
                  style={styles.heightBoxValue}
                  value={data.heightIn}
                  onChangeText={(text) => updateField("heightIn", text)}
                  keyboardType="number-pad"
                  maxLength={2}
                />
              </Pressable>
            </View>
            <ThemedText style={styles.detailHint}>in fts &amp; inches</ThemedText>
          </View>

          <View style={styles.detailColumn}>
            <ThemedText style={styles.detailLabel}>Weight</ThemedText>
            <FloatingInput
              placeholder="Enter your weight"
              value={data.weight}
              onChangeText={(text) => updateField("weight", text)}
              keyboardType="decimal-pad"
              suffix="kgs"
            />
          </View>
        </View>

        <ThemedText type="smallBold" style={[styles.sectionLabel, styles.sectionSpacing]}>
          Daily Step Goal
        </ThemedText>
        <ThemedText style={styles.detailHint}>
          How many steps you want to cover daily?
        </ThemedText>
        <FloatingInput
          placeholder="Enter step goal"
          value={data.stepGoal}
          onChangeText={(text) => updateField("stepGoal", text)}
          keyboardType="number-pad"
          suffix="STEPS"
          style={styles.stepGoalBox}
        />
      </ThemedView>

      <Pressable style={styles.button} onPress={handleNext}>
        <ThemedText type="smallBold" style={styles.buttonText}>
          NEXT
        </ThemedText>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#eef7fa",
  },
  container: {
    padding: Spacing.four,
    paddingBottom: Spacing.four * 3,
  },
  title: {
    textAlign: "center",
    marginBottom: Spacing.one,
  },
  subtitle: {
    textAlign: "center",
    color: "#4b5563",
    marginBottom: Spacing.four,
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.three,
    marginBottom: Spacing.five,
  },
  progressTrack: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#dbeafe",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#2e9199",
    borderRadius: 3,
  },
  progressLabel: {
    color: "#374151",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: Spacing.five,
    marginBottom: Spacing.four,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  sectionLabel: {
    color: "#111827",
    marginBottom: Spacing.two,
  },
  sectionSpacing: {
    marginTop: Spacing.four,
  },
  fieldBox: {
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  fieldBoxHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  fieldPlaceholder: {
    fontSize: 12,
    color: "#9ca3af",
  },
  fieldSuffix: {
    fontSize: 12,
    color: "#9ca3af",
  },
  fieldValue: {
    fontSize: 18,
    color: "#111827",
    paddingVertical: 2,
  },
  detailRow: {
    flexDirection: "row",
    gap: Spacing.four,
  },
  detailColumn: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 15,
    color: "#111827",
    marginBottom: Spacing.two,
  },
  detailHint: {
    fontSize: 12,
    color: "#9ca3af",
    marginTop: Spacing.one,
  },
  heightRow: {
    flexDirection: "row",
    gap: Spacing.two,
  },
  heightBox: {
    backgroundColor: "#f8fafc",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.two,
    flex: 1,
  },
  heightBoxLabel: {
    fontSize: 10,
    color: "#9ca3af",
  },
  heightBoxValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    paddingVertical: 0,
  },
  stepGoalBox: {
    marginTop: Spacing.two,
  },
  button: {
    marginTop: Spacing.four,
    backgroundColor: "#2e9199",
    borderRadius: 16,
    paddingVertical: Spacing.four,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
  },
});

export default FirstPage;