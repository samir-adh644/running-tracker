import { COLORS } from "@/constants/colors";
import { StyleSheet, Text, View } from "react-native";
import { HeaderText } from "./HeaderText";

type Props = {
  title: string;
  value: string;
  message?: string;
  isAlert?: boolean;
};

export const StatCard = ({ title, value, message, isAlert = false }: Props) => {
  return (
    <View style={styles.mainContainer}>
      <HeaderText>{title}</HeaderText>
      <View style={styles.statDesigner}>
        <Text style={styles.dataText}>{value}</Text>

        {message && (
          <Text
            style={[
              styles.statusText,
              {
                color: isAlert ? "#FF3B30" : "#34C759",
                backgroundColor: isAlert ? "#FFEBEB" : "#E8F9EE",
              },
            ]}
          >
            {message}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: { paddingBottom: 15 },
  statDesigner: {
    marginTop: 8,
    height: 100,
    backgroundColor: COLORS.card,
    borderRadius: 10,
    padding: 10,
  },
  dataText: { fontSize: 24, fontWeight: "600" },
  statusText: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 6,
    overflow: "hidden",
    alignSelf: "flex-start",
    fontSize: 14,
    fontWeight: "500",
  },
});

export default StatCard;
