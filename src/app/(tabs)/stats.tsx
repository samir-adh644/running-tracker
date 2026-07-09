import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const stats = () => {
  const { top } = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: top + 16 }}>
      <ScrollView>
        <View></View>
      </ScrollView>
    </View>
  );
};

export default stats;
