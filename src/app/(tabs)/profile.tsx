import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const profile = () => {
  const { top } = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: top }}>
      <Text>profile</Text>
    </View>
  );
};

export default profile;
