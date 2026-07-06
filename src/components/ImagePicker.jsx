import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { COLORS } from "../theme/colors";
import TYPOGRAPHY from "../theme/typography";
import { SPACING } from "../theme/spacing";
import { RADIUS } from "../theme/radius";

export default function ImagePickerComponent({ onImageSelected }) {
  async function pickImage() {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("Gallery permission is required.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      if (onImageSelected) {
        onImageSelected(imageUri);
      }
    }
  }

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.pressed,
        ]}
        onPress={pickImage}
      >
        <Text style={styles.buttonText}>Pick Image</Text>
      </Pressable>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.lg,
  },
  button: {
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
  },
  buttonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.primary,
  },
  pressed: {
    opacity: 0.7,
  },
});
