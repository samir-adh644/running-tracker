import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const index = () => {
  const { top } = useSafeAreaInsets();
  return (
    <View>
      <Text>index</Text>
    </View>
  );
};

export default index;
