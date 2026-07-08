import React from "react";
import { Text, StyleSheet, Platform } from "react-native";

import TYPOGRAPHY from "../../theme/typography";
import { COLORS } from "../../theme/colors";

export default function Price({
  value,
  style,
  currency = "₹",
}) {
  const formattedPrice = new Intl.NumberFormat("en-IN").format(value);

  return (
    <Text style={[styles.price, style]}>
      {currency} {formattedPrice}
    </Text>
  );
}

const styles = StyleSheet.create({
  price: {
    color: COLORS.primary,
    ...TYPOGRAPHY.price,

    ...Platform.select({
      ios: {
        letterSpacing: 0.3,
      },
      android: {
        letterSpacing: 0,
      },
    }),
  },
});