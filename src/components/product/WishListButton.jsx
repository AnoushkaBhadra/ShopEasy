import React from "react";
import {
  Pressable,
  Platform,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { COLORS } from "../../theme/colors";
import { RADIUS } from "../../theme/radius";

export default function WishlistButton({
  liked = false,
  onPress,
}) {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{
        color: COLORS.primaryLight,
        radius: 20,
      }}
      style={({ pressed }) => [
        styles.button,
        Platform.OS === "ios" &&
          pressed &&
          styles.pressed,
      ]}
    >
      <MaterialCommunityIcons
        name={liked ? "heart" : "heart-outline"}
        size={Platform.OS === "ios" ? 24 : 22}
        color={COLORS.primary}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 6,
    borderRadius: RADIUS.pill,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },

  pressed: {
    opacity: 0.6,
  },
});