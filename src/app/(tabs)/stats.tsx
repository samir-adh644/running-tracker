import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import StatCard from "../../components/statCard";

const stats = () => {
  const { top } = useSafeAreaInsets();
  return (
    <View style={[{ paddingTop: top + 16 }, styles.mainContainer]}>
      <Text style={{ fontSize: 30, textAlign: "center", fontWeight: "bold" }}>
        Your Stats
      </Text>
      <ScrollView style={styles.statHolders}>
        <StatCard />
        <StatCard />
        <StatCard />
        <StatCard />
        <StatCard />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},
  statHolders: {},
});

export default stats;
