import { StyleSheet, Text, TextProps } from "react-native";

type ThemedTextProps = TextProps & {
  type?: "subtitle" | "small" | "code" | "smallBold" | "link" | "linkPrimary";
  themeColor?: "textSecondary";
};

export function ThemedText({
  type = "small",
  style,
  themeColor,
  ...props
}: ThemedTextProps) {
  return (
    <Text
      {...props}
      style={[
        styles.base,
        typeStyles[type],
        themeColor === "textSecondary" ? styles.textSecondary : null,
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    color: "#111827",
  },
  textSecondary: {
    color: "#6b7280",
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  small: {
    fontSize: 14,
  },
  code: {
    fontFamily: "monospace",
    fontSize: 13,
  },
  smallBold: {
    fontSize: 14,
    fontWeight: "700",
  },
  link: {
    color: "#2563eb",
    fontWeight: "600",
  },
  linkPrimary: {
    color: "#2563eb",
    fontWeight: "600",
  },
});

const typeStyles: Record<NonNullable<ThemedTextProps["type"]>, object> = {
  subtitle: styles.subtitle,
  small: styles.small,
  code: styles.code,
  smallBold: styles.smallBold,
  link: styles.link,
  linkPrimary: styles.linkPrimary,
};
