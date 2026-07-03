import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";

import { COLORS } from "../../theme/colors";
import TYPOGRAPHY from "../../theme/typography";
import { SPACING } from "../../theme/spacing";

export default function HomeHeader({
    onProfilePress,
}) {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.logo}>ShopEasy</Text>
                <Text style={styles.subtitle}>
                    Find your next favorite product.
                </Text>
            </View>

            <Pressable
                onPress={onProfilePress}
                style={({ pressed }) => [
                    styles.profileButton,
                    pressed && styles.pressed,
                ]}
            >
                <Feather
                    name="user"
                    size={22}
                    color={COLORS.text}
                />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: SPACING.lg,
    },

    logo: {
        ...TYPOGRAPHY.logo,
        color: COLORS.primary,
    },

    subtitle: {
        ...TYPOGRAPHY.bodySmall,
        color: COLORS.textSecondary,
        marginTop: SPACING.xxs,
    },

    profileButton: {
        width: 42,
        height: 42,
        borderWidth: 1,
        borderColor: COLORS.border,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.surface,
    },

    pressed: {
        opacity: 0.7,
    },
});