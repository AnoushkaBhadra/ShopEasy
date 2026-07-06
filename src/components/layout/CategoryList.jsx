import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";

import { SPACING } from "../../theme/spacing";
import CategoryChip from "./CategoryChip";

export default function CategoryList({
    categories = [],
    selected,
    onSelect,
}) {
    return (
        <View style={styles.wrapper}>
            <ScrollView
                horizontal
        
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.container}
                scrollEventThrottle={16}
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: SPACING.sm,
        paddingRight: SPACING.lg,
    },
    wrapper: {
        marginVertical: SPACING.sm
    }
});