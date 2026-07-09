import React from "react";
import { Alert } from "react-native";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

import ProfileScreen from "./ProfileScreen";
import { getUser } from "../../utils/authStorage";
import {
  getProfile,
  updateProfile,
} from "../../services/profileService";

jest.mock("../../utils/authStorage", () => ({
  getUser: jest.fn(),
}));

jest.mock("../../services/profileService", () => ({
  getProfile: jest.fn(),
  updateProfile: jest.fn(),
}));

jest.mock("../../components/ImagePicker", () => ({
  __esModule: true,
  default: ({ onImageSelected }) => {
    const React = require("react");
    const { Pressable, Text } = require("react-native");

    return React.createElement(
      Pressable,
      { onPress: () => onImageSelected("file:///avatar.png") },
      React.createElement(Text, null, "Mock Image Picker")
    );
  },
}));

describe("ProfileScreen", () => {
  const user = {
    id: 10,
    name: "Test User",
    email: "test@example.com",
  };
  const profile = {
    id: 10,
    name: "Test User",
    email: "test@example.com",
    phone: "9876543210",
    profileImage: "https://example.com/avatar.png",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Alert, "alert").mockImplementation(jest.fn());
  });

  afterEach(() => {
    Alert.alert.mockRestore();
  });

  it("renders a loading state before profile data is loaded", async () => {
    // Verifies the screen starts in a loading state.
    getUser.mockReturnValue(new Promise(() => {}));

    const { getByText } = await render(<ProfileScreen />);

    expect(getByText("Loading...")).toBeTruthy();
  });

  it("loads and renders profile data", async () => {
    // Verifies stored user data is used to fetch and show the profile.
    getUser.mockResolvedValueOnce(user);
    getProfile.mockResolvedValueOnce(profile);

    const { findByText } = await render(<ProfileScreen />);

    expect(await findByText("Profile")).toBeTruthy();
    expect(await findByText(profile.name)).toBeTruthy();
    expect(await findByText(profile.email)).toBeTruthy();
    expect(await findByText(profile.phone)).toBeTruthy();
  });

  it("enters edit mode and updates profile data", async () => {
    // Verifies editing fields and saving calls the profile service.
    getUser.mockResolvedValueOnce(user);
    getProfile.mockResolvedValueOnce(profile);
    updateProfile.mockResolvedValueOnce({
      ...profile,
      name: "Updated User",
      profileImage: "file:///avatar.png",
    });

    const { findByText, getByDisplayValue, getByText } = await render(
      <ProfileScreen />
    );

    await fireEvent.press(await findByText("Edit Profile"));
    await fireEvent.changeText(getByDisplayValue(profile.name), "Updated User");
    await fireEvent.press(getByText("Mock Image Picker"));
    await fireEvent.press(getByText("Save Changes"));

    await waitFor(() => {
      expect(updateProfile).toHaveBeenCalledWith(profile.id, {
        name: "Updated User",
        email: profile.email,
        phone: profile.phone,
        profileImage: "file:///avatar.png",
      });
      expect(Alert.alert).toHaveBeenCalledWith(
        "Success",
        "Profile updated successfully."
      );
    });
  });

  it("restores original profile values when canceling edit mode", async () => {
    // Verifies cancel discards local edits.
    getUser.mockResolvedValueOnce(user);
    getProfile.mockResolvedValueOnce(profile);

    const { findByText, getByDisplayValue, getByText, queryByText } =
      await render(<ProfileScreen />);

    await fireEvent.press(await findByText("Edit Profile"));
    await fireEvent.changeText(getByDisplayValue(profile.name), "Temporary");
    await fireEvent.press(getByText("Cancel"));

    await waitFor(() => {
      expect(queryByText("Save Changes")).toBeNull();
      expect(getByText(profile.name)).toBeTruthy();
    });
  });

  it("alerts when profile update fails", async () => {
    // Verifies update failures are surfaced to the user.
    getUser.mockResolvedValueOnce(user);
    getProfile.mockResolvedValueOnce(profile);
    updateProfile.mockRejectedValueOnce(new Error("Update failed"));

    const { findByText, getByText } = await render(<ProfileScreen />);

    await fireEvent.press(await findByText("Edit Profile"));
    await fireEvent.press(getByText("Save Changes"));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Error",
        "Failed to update profile."
      );
    });
  });
});
