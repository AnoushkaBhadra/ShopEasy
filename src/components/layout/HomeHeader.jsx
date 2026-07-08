import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
} from "react-native";

import { COLORS } from "../../theme/colors";
import TYPOGRAPHY from "../../theme/typography";
import { SPACING } from "../../theme/spacing";

export default function HomeHeader() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.logo}>ShopEasy</Text>

        <Text style={styles.subtitle}>
          Find your next favorite product.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom:
      Platform.OS === "ios"
        ? SPACING.xl
        : SPACING.lg,

    paddingTop:
      Platform.OS === "ios"
        ? SPACING.sm
        : 0,
  },

  logo: {
    ...TYPOGRAPHY.logo,
    color: COLORS.primary,

    fontSize:
      Platform.OS === "ios" ? 46 : 44,
  },

  subtitle: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    marginTop: SPACING.xxs,

    letterSpacing:
      Platform.OS === "ios" ? 0.3 : 0,
  },
});