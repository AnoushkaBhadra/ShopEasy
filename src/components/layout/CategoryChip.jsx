import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

import { COLORS } from "../../theme/colors";
import TYPOGRAPHY from "../../theme/typography";
import { SPACING } from "../../theme/spacing";

export default function CategoryChip({
    title,
    selected,
    onPress,
}) {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.chip,
                selected && styles.selectedChip,
                pressed && styles.pressed,
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
        paddingVertical: SPACING.sm,
        paddingHorizontal: SPACING.lg,
        borderWidth: 1,
        borderColor: COLORS.border,
        backgroundColor: COLORS.surface,
        marginRight: SPACING.sm,
    },

    selectedChip: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },

    text: {
        ...TYPOGRAPHY.bodySmall,
        color: COLORS.text,
    },

    selectedText: {
        color: COLORS.surface,
    },

    pressed: {
        opacity: 0.8,
    },
});