import React from "react";
import { View, Text, StyleSheet } from "react-native";

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
});