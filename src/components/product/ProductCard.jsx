import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";

import { COLORS } from "../../theme/colors";
import TYPOGRAPHY from "../../theme/typography";
import { SPACING } from "../../theme/spacing";
import { SHADOW } from "../../theme/shadows";

import Price from "./Price";
import Rating from "./Rating";
import WishlistButton from "./WishListButton";

export default function ProductCard({product, onPress, onWishList}) {
    return (
        <Pressable
            onPress={() => onPress(product)}
            style={({ pressed }) => [
                styles.card,
                pressed && styles.cardPressed,
            ]}
        >
            <Image
                source={{ uri: product.image }}
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
                        liked={product.liked}
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
        margin: SPACING.xs,
        ...SHADOW.card,
    },

    cardPressed: {
        opacity: 0.9,
    },

    image: {
        width: "100%",
        aspectRatio: 1,
        resizeMode: "cover",
    },

    content: {
        padding: SPACING.md,
    },

    name: {
        ...TYPOGRAPHY.title,
        color: COLORS.text,
        marginBottom: SPACING.xs,
        minHeight: 48,
    },

    category: {
        ...TYPOGRAPHY.caption,
        color: COLORS.textSecondary,
        textTransform: "uppercase",
        marginBottom: SPACING.md,
    },

    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
    },
});