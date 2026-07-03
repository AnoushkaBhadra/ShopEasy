import React from "react";
import { ScrollView, StyleSheet } from "react-native";

import { SPACING } from "../../theme/spacing";
import CategoryChip from "./CategoryChip";

export default function CategoryList({
    categories,
    selected,
    onSelect,
}) {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            {categories.map((category) => (
                <CategoryChip
                    key={category}
                    title={category}
                    selected={selected === category}
                    onPress={() => onSelect(category)}
                />
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: SPACING.sm,
        paddingRight: SPACING.lg,
    },
});