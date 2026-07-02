import React from "react";
import { View, Button } from "react-native";
import * as ImagePicker from "expo-image-picker";

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
    <View style={{ paddingTop: 50 }}>
      <Button
        title="Pick Image"
        onPress={pickImage}
      />
    </View>
  );

}