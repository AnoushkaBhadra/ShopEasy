import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { COLORS } from "../../theme/colors";
import { SPACING } from "../../theme/spacing";
import TYPOGRAPHY from "../../theme/typography";

const renderStars = (rating) => {
  return "★".repeat(rating) + "☆".repeat(5 - rating);
};

export default function ReviewCard({ review }) {
  const formattedDate = new Date(review.reviewDate).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );

  return (
    <View style={styles.container}>
      <Text style={styles.rating}>{renderStars(review.rating)}</Text>

      <Text style={styles.review}>{review.review}</Text>

      <View style={styles.footer}>
        <Text style={styles.user}>
          {review.userName || `User #${review.userId}`}
        </Text>

        <Text style={styles.date}>{formattedDate}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    marginVertical: SPACING.sm,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  rating: {
    fontSize: 18,
    color: "#F4B400",
    marginBottom: SPACING.sm,
  },

  review: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
    lineHeight: 22,
    marginBottom: SPACING.md,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  user: {
    ...TYPOGRAPHY.caption,
    fontWeight: "600",
    color: COLORS.textSecondary,
  },

  date: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
});