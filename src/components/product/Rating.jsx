import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import TYPOGRAPHY from "../../theme/typography";
import { COLORS } from "../../theme/colors";
import { SPACING } from "../../theme/spacing";

export default function Rating({
  value,
  size = Platform.OS === "ios" ? 18 : 16,
}) {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="star"
        size={size}
        color={COLORS.warning}
      />

      <Text style={styles.rating}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },

  rating: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    marginLeft: SPACING.xxs,

    ...Platform.select({
      ios: {
        letterSpacing: 0.2,
      },
      android: {
        letterSpacing: 0,
      },
    }),
  },
});