import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const home = () => {
  const { top } = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: top }}>
      <Text>home</Text>
    </View>
  );
};

export default home;
