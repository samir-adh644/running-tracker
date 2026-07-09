import { COLORS } from "@/constants/colors";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const remainder = () => {
  const { top } = useSafeAreaInsets();
  return (
    <View style={[styles.mainCont, { paddingTop: top }]}>
      <View style={styles.cardCont}>
        <Text style={styles.innerText}>Coming Soon!!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainCont: {
    flex: 1,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.background,
  },
  innerText: {
    fontSize: 30,
    alignSelf: "center",
    textAlign: "center",
  },
  cardCont: {
    backgroundColor: COLORS.card,
    width: 250,
    height: 250,
    justifyContent: "center",
    borderWidth: 4,
    borderColor: COLORS.primary,
    borderRadius: 10,
  },
});

export default remainder;
