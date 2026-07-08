import React from "react";
import {
  Text,
  Pressable,
  StyleSheet,
  Platform,
} from "react-native";

import { COLORS } from "../../theme/colors";
import TYPOGRAPHY from "../../theme/typography";
import { SPACING } from "../../theme/spacing";
import { RADIUS } from "../../theme/radius";

export default function CategoryChip({
  title,
  selected,
  onPress,
}) {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{
        color: COLORS.primaryLight,
      }}
      style={({ pressed }) => [
        styles.chip,
        selected && styles.selectedChip,
        Platform.OS === "ios" &&
          pressed &&
          styles.pressed,
      ]}
    >
      <Text
        style={[
          styles.text,
          selected && styles.selectedText,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical:
      Platform.OS === "ios"
        ? SPACING.md
        : SPACING.sm,

    paddingHorizontal:
      Platform.OS === "ios"
        ? SPACING.xl
        : SPACING.lg,

    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,

    marginRight: SPACING.sm,

    borderRadius:
      Platform.OS === "ios"
        ? RADIUS.xl
        : RADIUS.pill,

    overflow: "hidden",
  },

  selectedChip: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  text: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,

    letterSpacing:
      Platform.OS === "ios" ? 0.2 : 0,
  },

  selectedText: {
    color: COLORS.surface,
  },

  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.97 }],
  },
});