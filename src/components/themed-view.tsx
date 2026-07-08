import { StyleSheet, View, ViewProps } from "react-native";

type ThemedViewProps = ViewProps & {
  type?: "backgroundElement";
};

export function ThemedView({ type, style, ...props }: ThemedViewProps) {
  return (
    <View
      {...props}
      style={[
        type === "backgroundElement" ? styles.backgroundElement : null,
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  backgroundElement: {
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
  },
});
