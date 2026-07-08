import * as Linking from "expo-linking";
import React from "react";
import { Pressable } from "react-native";

type ExternalLinkProps = {
  href: string;
  children: React.ReactNode;
  asChild?: boolean;
};

export function ExternalLink({
  href,
  children,
  asChild = false,
}: ExternalLinkProps) {
  const handlePress = () => {
    void Linking.openURL(href);
  };

  if (asChild) {
    return <Pressable onPress={handlePress}>{children}</Pressable>;
  }

  return <Pressable onPress={handlePress}>{children}</Pressable>;
}
