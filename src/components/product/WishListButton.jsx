import React from "react";
import { Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { COLORS } from "../../theme/colors";

export default function WishlistButton({
    liked = false,
    onPress,
}) {
    return (
        <Pressable onPress={onPress}>
            <MaterialCommunityIcons
                name={liked ? "heart" : "heart-outline"}
                size={22}
                color={COLORS.primary}
            />
        </Pressable>
    );
}