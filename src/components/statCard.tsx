import { COLORS } from "@/constants/colors";
import { StyleSheet, Text, View } from "react-native";
import { HeaderText } from "./HeaderText";

type Props = {
  title: string;
  data: number;
};

const Mydata = {
  title: "BMI Index",
  data: 21.5,
  status: "Normal",
};
const { title, data, status } = Mydata;

const statCard = () => {
  return (
    <View style={styles.mainContainer}>
      <HeaderText>{title}</HeaderText>
      <View style={styles.statDesigner}>
        <Text style={styles.dataText}>{data}</Text>
        <Text style={styles.statusText}>Your BMI index is {status}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  statDesigner: {
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 24,
    marginTop: 8,
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  dataText: {
    fontSize: 48,
    fontWeight: "800",
    color: COLORS.primary,
    letterSpacing: -1,
    marginBottom: 6,
  },
  statusText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#34C759",
    backgroundColor: "#E8F9EE",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    overflow: "hidden",
  },
});

export default statCard;
