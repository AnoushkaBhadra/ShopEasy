import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";

import { COLORS } from "../../theme/colors";
import TYPOGRAPHY from "../../theme/typography";
import { SPACING } from "../../theme/spacing";

export default function CategoryChip({title,selected,onPress,
}) {
    console.log("Chip: ", title, typeof title);
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
                //style= {{fontSize: 18, color: "red", fontWeight: "bold"}}
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
        ...TYPOGRAPHY.body,
        color: "black",
    },

    selectedText: {
        color: COLORS.surface,
    },

    pressed: {
        opacity: 0.8,
    },
});

// import React from "react";
// import { Pressable, Text } from "react-native";

// export default function CategoryChip({ title, onPress }) {
//     return (
//         <Pressable onPress={onPress}>
//             <Text>HELLO</Text>
//         </Pressable>
//     );
// }