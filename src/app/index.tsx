import { Redirect } from "expo-router";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const index = () => {
  const { top } = useSafeAreaInsets();
  const data = true;

  if (data) {
    return <Redirect href="/(tabs)/home" />;
  }

  return (
    <View
      style={{
        paddingTop: top,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>index form page</Text>
    </View>
  );
};

export default index;
