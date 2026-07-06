import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";

import ImagePickerComponent from "../../components/ImagePicker";
import { getUser } from "../../utils/authStorage";
import { getProfile, updateProfile } from "../../services/profileService";
import { COLORS } from "../../theme/colors";
import TYPOGRAPHY from "../../theme/typography";
import { SPACING } from "../../theme/spacing";
import { SHADOW } from "../../theme/shadows";
import { RADIUS } from "../../theme/radius";

export default function ProfileScreen() {
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [imageUri, setImageUri] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const user = await getUser();

      if (!user) {
        return;
      }

      const profileData = await getProfile(user.id);

      setProfile(profileData);
      setName(profileData.name);
      setEmail(profileData.email);
      setPhone(profileData.phone);
      setImageUri(profileData.profileImage);
    } catch (error) {
      console.log(error);
    }
  }

  function handleImageSelected(uri) {
    setImageUri(uri);
  }

  async function handleSave() {
    try {
      const updatedProfile = await updateProfile(profile.id, {
        name,
        email,
        phone,
        profileImage: imageUri,
      });

      setProfile(updatedProfile);
      setIsEditing(false);
      Alert.alert("Success", "Profile updated successfully.");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to update profile.");
    }
  }

  function handleCancel() {
    setName(profile.name);
    setEmail(profile.email);
    setPhone(profile.phone);
    setImageUri(profile.profileImage);
    setIsEditing(false);
  }

  if (!profile) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Profile</Text>

      <Image
        source={
          imageUri
            ? { uri: imageUri }
            : require("../../../assets/avatar-placeholder.png")
        }
        style={styles.avatar}
      />

      {isEditing ? (
        <View style={styles.card}>
          <ImagePickerComponent onImageSelected={handleImageSelected} />

          <Text style={styles.label}>Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            style={styles.input}
            placeholderTextColor={COLORS.textTertiary}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.input}
            placeholderTextColor={COLORS.textTertiary}
          />

          <Text style={styles.label}>Phone</Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            style={styles.input}
            placeholderTextColor={COLORS.textTertiary}
          />

          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.primaryButtonPressed,
            ]}
            onPress={handleSave}
          >
            <Text style={styles.primaryButtonText}>Save Changes</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.cancelButton,
              pressed && styles.pressed,
            ]}
            onPress={handleCancel}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.profileName}>{profile.name}</Text>
          <Text style={styles.profileDetail}>{profile.email}</Text>
          <Text style={styles.profileDetail}>{profile.phone}</Text>

          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.primaryButtonPressed,
            ]}
            onPress={() => setIsEditing(true)}
          >
            <Text style={styles.primaryButtonText}>Edit Profile</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.xxl,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.background,
  },
  loadingText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
  title: {
    ...TYPOGRAPHY.h1,
    color: COLORS.text,
    marginBottom: SPACING.lg,
  },
  avatar: {
    width: 132,
    height: 132,
    alignSelf: "center",
    marginBottom: SPACING.lg,
    borderWidth: 4,
    borderColor: COLORS.surface,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.surface,
    ...SHADOW.card,
  },
  card: {
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.surface,
    ...SHADOW.card,
  },
  profileName: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text,
    textAlign: "center",
    marginBottom: SPACING.xs,
  },
  profileDetail: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: SPACING.xs,
  },
  label: {
    ...TYPOGRAPHY.label,
    color: COLORS.text,
    marginBottom: SPACING.xs,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  input: {
    height: 48,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
    color: COLORS.text,
    ...TYPOGRAPHY.body,
  },
  primaryButton: {
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    marginTop: SPACING.lg,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.primary,
    ...SHADOW.button,
  },
  primaryButtonPressed: {
    backgroundColor: COLORS.primaryDark,
  },
  primaryButtonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.surface,
  },
  cancelButton: {
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    marginTop: SPACING.xs,
  },
  cancelButtonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.textSecondary,
  },
  pressed: {
    opacity: 0.7,
  },
});
