import { COLORS } from "@/constants/colors";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "../../components/themed-text";
import { ThemedView } from "../../components/themed-view";
import { Spacing } from "../../constants/theme";

type ProfileData = {
  name: string;
  heightFt: string;
  heightIn: string;
  weight: string;
  age: string;
};

const Profile = () => {
  const { top } = useSafeAreaInsets();
  const [isEditing, setIsEditing] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState("Sep 12, 2023");

  const [data, setData] = useState<ProfileData>({
    name: "Alex Johnson",
    heightFt: "5",
    heightIn: "9",
    weight: "74.5",
    age: "32",
  });

  const updateField = (key: keyof ProfileData, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const handlePickPhoto = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Permission needed",
        "Please allow photo library access to update your picture.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.length) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const formatToday = () => {
    const today = new Date();
    return today.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleButtonPress = () => {
    if (isEditing) {
      // Basic validation before "saving"
      if (!data.name.trim()) {
        Alert.alert("Missing name", "Full name can't be empty.");
        return;
      }
      if (
        isNaN(Number(data.heightFt)) ||
        isNaN(Number(data.heightIn)) ||
        isNaN(Number(data.weight)) ||
        isNaN(Number(data.age))
      ) {
        Alert.alert("Invalid input", "Please enter valid numbers.");
        return;
      }

      setLastUpdated(formatToday());
    }
    setIsEditing((prev) => !prev);
  };

  return (
    <ScrollView
      style={[styles.scrollContainer, { paddingTop: top }]}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <ThemedText type="subtitle" style={styles.title}>
        Your Profile
      </ThemedText>

      <ThemedView style={styles.card}>
        <Pressable onPress={handlePickPhoto} style={styles.avatarWrapper}>
          {photoUri ? (
            <Image source={{ uri: photoUri }} style={styles.avatarImage} />
          ) : (
            <ThemedText type="subtitle" style={styles.avatarText}>
              {data.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </ThemedText>
          )}
        </Pressable>
        <Pressable onPress={handlePickPhoto}>
          <ThemedText style={styles.avatarLabel}>
            {photoUri ? "Change Photo" : "Update Photo"}
          </ThemedText>
        </Pressable>
      </ThemedView>

      <ThemedView style={styles.card}>
        <ThemedText type="smallBold" style={styles.sectionLabel}>
          Full Name
        </ThemedText>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={data.name}
            onChangeText={(text) => updateField("name", text)}
            placeholder="Full name"
            autoCapitalize="words"
          />
        ) : (
          <ThemedText style={styles.sectionValue}>{data.name}</ThemedText>
        )}
      </ThemedView>

      <ThemedView style={styles.card}>
        <ThemedText type="smallBold" style={styles.sectionLabel}>
          Personal Metrics
        </ThemedText>
        <View style={styles.metricRow}>
          <ThemedView style={styles.metricCard}>
            <ThemedText style={styles.metricLabel}>Height</ThemedText>
            {isEditing ? (
              <View style={styles.heightRow}>
                <TextInput
                  style={styles.heightInput}
                  value={data.heightFt}
                  onChangeText={(text) => updateField("heightFt", text)}
                  keyboardType="number-pad"
                  maxLength={1}
                />
                <ThemedText style={styles.unitLabel}>ft</ThemedText>
                <TextInput
                  style={styles.heightInput}
                  value={data.heightIn}
                  onChangeText={(text) => updateField("heightIn", text)}
                  keyboardType="number-pad"
                  maxLength={2}
                />
                <ThemedText style={styles.unitLabel}>in</ThemedText>
              </View>
            ) : (
              <ThemedText style={styles.metricValue}>
                {data.heightFt}'{data.heightIn}"
              </ThemedText>
            )}
          </ThemedView>

          <ThemedView style={styles.metricCard}>
            <ThemedText style={styles.metricLabel}>Weight</ThemedText>
            {isEditing ? (
              <View style={styles.heightRow}>
                <TextInput
                  style={styles.weightInput}
                  value={data.weight}
                  onChangeText={(text) => updateField("weight", text)}
                  keyboardType="decimal-pad"
                />
                <ThemedText style={styles.unitLabel}>kgs</ThemedText>
              </View>
            ) : (
              <ThemedText style={styles.metricValue}>
                {data.weight} kgs
              </ThemedText>
            )}
          </ThemedView>
        </View>
      </ThemedView>

      <View style={styles.summaryRow}>
        <ThemedView style={[styles.card, styles.summaryCard]}>
          <ThemedText type="smallBold" style={styles.sectionLabel}>
            Age
          </ThemedText>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={data.age}
              onChangeText={(text) => updateField("age", text)}
              keyboardType="number-pad"
              maxLength={3}
            />
          ) : (
            <ThemedText style={styles.sectionValue}>{data.age} yrs</ThemedText>
          )}
        </ThemedView>
        <ThemedView style={[styles.card, styles.summaryCard]}>
          <ThemedText type="smallBold" style={styles.sectionLabel}>
            Last updated
          </ThemedText>
          <ThemedText style={styles.sectionValue}>{lastUpdated}</ThemedText>
        </ThemedView>
      </View>

      <Pressable style={styles.button} onPress={handleButtonPress}>
        <ThemedText type="smallBold" style={styles.buttonText}>
          {isEditing ? "SAVE CHANGES" : "EDIT INFORMATION"}
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
    marginBottom: Spacing.six,
    textAlign: "center",
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
  avatarWrapper: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#dbeafe",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: Spacing.three,
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  avatarText: {
    fontSize: 28,
  },
  avatarLabel: {
    textAlign: "center",
    color: COLORS.primary,
  },
  sectionLabel: {
    color: "#111827",
    marginBottom: Spacing.two,
  },
  sectionValue: {
    fontSize: 18,
    color: "#111827",
  },
  input: {
    fontSize: 18,
    color: "#111827",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    backgroundColor: "#f8fafc",
  },
  metricRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: Spacing.three,
  },
  metricCard: {
    flex: 1,
    backgroundColor: "#f8fafc",
    borderRadius: 14,
    padding: Spacing.four,
    alignItems: "center",
  },
  metricLabel: {
    color: "#6b7280",
    marginBottom: Spacing.one,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  heightRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  heightInput: {
    width: 36,
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    textAlign: "center",
    paddingVertical: 2,
    backgroundColor: "#ffffff",
  },
  weightInput: {
    width: 60,
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    textAlign: "center",
    paddingVertical: 2,
    backgroundColor: "#ffffff",
  },
  unitLabel: {
    fontSize: 12,
    color: "#6b7280",
  },
  summaryRow: {
    flexDirection: "row",
    gap: Spacing.three,
  },
  summaryCard: {
    flex: 1,
  },
  button: {
    marginTop: Spacing.four,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    paddingVertical: Spacing.four,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
  },
});

export default Profile;
