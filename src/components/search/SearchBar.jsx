import React from "react";
import { View, TextInput, StyleSheet,} from "react-native";
import { Feather } from "@expo/vector-icons";

import { COLORS } from "../../theme/colors";
import TYPOGRAPHY from "../../theme/typography";
import { SPACING } from "../../theme/spacing";
import { RADIUS } from "../../theme/radius";

export default function SearchBar({value,onChangeText,placeholder = "Search products...",
}) {
    return (
        <View style={styles.container}>
            <Feather
                name="search"
                size={20}
                color={COLORS.textSecondary}
            />

            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={COLORS.textSecondary}
                style={styles.input}
                returnKeyType="search"
                autoCorrect={false}
                clearButtonMode="while-editing"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 48,
        flexDirection: "row",
        alignItems: "center",

        backgroundColor: COLORS.surface,

        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: RADIUS.md,

        paddingHorizontal: SPACING.md,
    },

    input: {
        flex: 1,
        marginLeft: SPACING.sm,
        color: COLORS.text,
        ...TYPOGRAPHY.body,
    },
});
