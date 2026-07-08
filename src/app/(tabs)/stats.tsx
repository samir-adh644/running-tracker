import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const stats = () => {
  const { top } = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: top }}>
      <Text>stats</Text>
    </View>
  );
};

export default stats;
