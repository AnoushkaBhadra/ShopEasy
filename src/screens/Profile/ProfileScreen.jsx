import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Image, Button, Alert } from "react-native";

import ImagePickerComponent from "../../components/ImagePicker";
import { getUser } from "../../utils/authStorage";
import { getProfile, updateProfile } from "../../services/profileService";

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
      <View style={{ padding: 20 }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        paddingTop: 50,
      }}
    >
      <Image
        source={
          imageUri
            ? { uri: imageUri }
            : require("../../../assets/avatar-placeholder.png")
        }
        style={{
          width: 150,
          height: 150,
          borderRadius: 75,
          alignSelf: "center",
          marginBottom: 20,
        }}
      />

      {isEditing ? (
        <>
          <ImagePickerComponent onImageSelected={handleImageSelected} />

          <Text>Name</Text>

          <TextInput
            value={name}
            onChangeText={setName}
            style={{
              borderWidth: 1,
              marginBottom: 15,
              padding: 8,
            }}
          />

          <Text>Email</Text>

          <TextInput
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            style={{
              borderWidth: 1,
              marginBottom: 15,
              padding: 8,
            }}
          />

          <Text>Phone</Text>

          <TextInput
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            style={{
              borderWidth: 1,
              marginBottom: 20,
              padding: 8,
            }}
          />

          <Button title="Save Changes" onPress={handleSave} />

          <View style={{ marginTop: 10 }} />

          <Button title="Cancel" onPress={handleCancel} />
        </>
      ) : (
        <>
          <Text
            style={{
              fontSize: 20,
              marginBottom: 10,
              textAlign: "center",
            }}
          >
            {profile.name}
          </Text>

          <Text
            style={{
              marginBottom: 10,
              textAlign: "center",
            }}
          >
            {profile.email}
          </Text>

          <Text
            style={{
              marginBottom: 30,
              textAlign: "center",
            }}
          >
            {profile.phone}
          </Text>

          <Button title="Edit Profile" onPress={() => setIsEditing(true)} />
        </>
      )}
    </View>
  );
}
