import React, { memo } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Platform,
} from "react-native";

import { COLORS } from "../../theme/colors";
import TYPOGRAPHY from "../../theme/typography";
import { SPACING } from "../../theme/spacing";
import { SHADOW } from "../../theme/shadows";
import { RADIUS } from "../../theme/radius";

import Price from "./Price";
import Rating from "./Rating";
import WishlistButton from "./WishListButton";

function ProductCard({
  product,
  onPress,
  onWishlist,
  isLiked,
}) {
  return (
    <Pressable
      onPress={() => onPress(product)}
      android_ripple={{ color: COLORS.primaryLight }}
      style={({ pressed }) => [
        styles.card,
        Platform.OS === "ios" && pressed && styles.cardPressed,
      ]}
    >
      <Image
        source={{ uri: product.thumbnail }}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text
          style={styles.name}
          numberOfLines={2}
        >
          {product.name}
        </Text>

        <Text
          style={styles.category}
          numberOfLines={1}
        >
          {product.category}
        </Text>

        <View style={styles.footer}>
          <View>
            <Price value={product.price} />
            <Rating value={product.rating} />
          </View>

          <WishlistButton
            liked={isLiked}
            onPress={() => onWishlist(product)}
          />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius:
      Platform.OS === "ios"
        ? RADIUS.xl
        : RADIUS.lg,
    overflow: "hidden",
    margin: SPACING.xs,
    ...SHADOW.card,
  },

  cardPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.98 }],
  },

  image: {
    width: "100%",
    aspectRatio: 1,
    resizeMode: "cover",
    borderBottomLeftRadius:
      Platform.OS === "ios"
        ? RADIUS.md
        : 0,
    borderBottomRightRadius:
      Platform.OS === "ios"
        ? RADIUS.md
        : 0,
  },

  content: {
    padding: SPACING.md,
  },

  name: {
    ...TYPOGRAPHY.title,
    color: COLORS.text,
    marginBottom: SPACING.xs,
    minHeight: Platform.OS === "ios" ? 52 : 48,
  },

  category: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    textTransform: "uppercase",
    marginBottom: SPACING.md,
    letterSpacing:
      Platform.OS === "ios" ? 0.5 : 0.3,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: Platform.OS === "ios" ? 4 : 0,
  },
});

export default memo(ProductCard);