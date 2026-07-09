import { ComponentProps } from "react";
import { StyleSheet, Text } from "react-native";
type Props = ComponentProps<typeof Text>;

export const HeaderText = ({ style, ...props }: Props) => {
  return <Text style={[styles.text, style]} {...props} />;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
