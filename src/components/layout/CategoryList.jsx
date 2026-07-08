import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
} from "react-native";

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
  wrapper: {
    marginVertical:
      Platform.OS === "ios"
        ? SPACING.md
        : SPACING.sm,
  },

  container: {
    paddingVertical:
      Platform.OS === "ios"
        ? SPACING.md
        : SPACING.sm,

    paddingRight: SPACING.lg,
    paddingLeft: SPACING.xs,
  },
});