import React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "../../theme/colors";
import TYPOGRAPHY from "../../theme/typography";
import { SPACING } from "../../theme/spacing";
import { SHADOW } from "../../theme/shadows";
import { RADIUS } from "../../theme/radius";

export default function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.thumbnail }} style={styles.image} />

      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>

        <Text style={styles.category}>{item.category}</Text>

        <Text style={styles.price}>₹{item.price}</Text>

        <View style={styles.quantityRow}>
          <Pressable
            style={styles.quantityButton}
            android_ripple={{ color: COLORS.primaryLight }}
            onPress={() => onDecrease(item)}
          >
            <Ionicons
              name="remove"
              size={18}
              color={COLORS.primaryDark}
            />
          </Pressable>

          <Text style={styles.quantity}>{item.quantity}</Text>

          <Pressable
            style={styles.quantityButton}
            android_ripple={{ color: COLORS.primaryLight }}
            onPress={() => onIncrease(item)}
          >
            <Ionicons
              name="add"
              size={18}
              color={COLORS.primaryDark}
            />
          </Pressable>
        </View>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.deleteButton,
          Platform.OS === "ios" &&
            pressed && { opacity: 0.6 },
        ]}
        android_ripple={{ color: "#f3d2d2" }}
        onPress={() => onRemove(item)}
      >
        <Ionicons
          name="trash-outline"
          size={22}
          color={COLORS.error}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: Platform.OS === "ios" ? RADIUS.xl : RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOW.card,
  },

  image: {
    width: Platform.OS === "ios" ? 100 : 90,
    height: Platform.OS === "ios" ? 100 : 90,
    resizeMode: "contain",
    backgroundColor: COLORS.background,
    borderRadius: Platform.OS === "ios" ? RADIUS.lg : RADIUS.md,
  },

  details: {
    flex: 1,
    marginLeft: SPACING.md,
    justifyContent: "space-between",
  },

  name: {
    ...TYPOGRAPHY.title,
    color: COLORS.text,
  },

  category: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    textTransform: "uppercase",
    marginTop: SPACING.xxs,
  },

  price: {
    ...TYPOGRAPHY.price,
    color: COLORS.primary,
    marginTop: SPACING.sm,
  },

  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SPACING.md,
  },

  quantityButton: {
    width: Platform.OS === "ios" ? 38 : 34,
    height: Platform.OS === "ios" ? 38 : 34,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: Platform.OS === "ios" ? RADIUS.md : RADIUS.sm,
    overflow: "hidden",
  },

  quantity: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
    marginHorizontal: SPACING.md,
    minWidth: 20,
    textAlign: "center",
  },

  deleteButton: {
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: SPACING.sm,
    borderRadius: RADIUS.pill,
    overflow: "hidden",
  },
});