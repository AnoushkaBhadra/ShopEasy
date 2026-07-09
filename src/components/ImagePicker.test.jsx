import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import * as ExpoImagePicker from "expo-image-picker";

import ImagePickerComponent from "./ImagePicker";

jest.mock("expo-image-picker", () => ({
  requestMediaLibraryPermissionsAsync: jest.fn(),
  launchImageLibraryAsync: jest.fn(),
}));

describe("ImagePickerComponent", () => {
  const originalAlert = global.alert;

  beforeEach(() => {
    jest.clearAllMocks();
    global.alert = jest.fn();
  });

  afterAll(() => {
    global.alert = originalAlert;
  });

  it("renders the image picker button", async () => {
    // Verifies the picker action is available to the user.
    const { getByText } = await render(
      <ImagePickerComponent onImageSelected={jest.fn()} />
    );

    await waitFor(() => {
      expect(getByText("Pick Image")).toBeTruthy();
    });
  });

  it("alerts and does not open the picker when gallery permission is denied", async () => {
    // Verifies denied permissions stop the image selection flow.
    ExpoImagePicker.requestMediaLibraryPermissionsAsync.mockResolvedValueOnce({
      granted: false,
    });

    const onImageSelected = jest.fn();
    const { getByText } = await render(
      <ImagePickerComponent onImageSelected={onImageSelected} />
    );

    await fireEvent.press(getByText("Pick Image"));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        "Gallery permission is required."
      );
    });
    expect(ExpoImagePicker.launchImageLibraryAsync).not.toHaveBeenCalled();
    expect(onImageSelected).not.toHaveBeenCalled();
  });

  it("opens the picker with the expected options when permission is granted", async () => {
    // Verifies the native image picker is configured consistently.
    ExpoImagePicker.requestMediaLibraryPermissionsAsync.mockResolvedValueOnce({
      granted: true,
    });
    ExpoImagePicker.launchImageLibraryAsync.mockResolvedValueOnce({
      canceled: true,
    });

    const { getByText } = await render(
      <ImagePickerComponent onImageSelected={jest.fn()} />
    );

    await fireEvent.press(getByText("Pick Image"));

    await waitFor(() => {
      expect(ExpoImagePicker.launchImageLibraryAsync).toHaveBeenCalledWith({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
    });
  });

  it("calls onImageSelected with the selected image uri", async () => {
    // Verifies a successful picker result is forwarded to the parent.
    const imageUri = "file:///profile.png";
    ExpoImagePicker.requestMediaLibraryPermissionsAsync.mockResolvedValueOnce({
      granted: true,
    });
    ExpoImagePicker.launchImageLibraryAsync.mockResolvedValueOnce({
      canceled: false,
      assets: [{ uri: imageUri }],
    });

    const onImageSelected = jest.fn();
    const { getByText } = await render(
      <ImagePickerComponent onImageSelected={onImageSelected} />
    );

    await fireEvent.press(getByText("Pick Image"));

    await waitFor(() => {
      expect(onImageSelected).toHaveBeenCalledWith(imageUri);
    });
  });

  it("does not call onImageSelected when image selection is canceled", async () => {
    // Verifies canceled picker results do not update the parent.
    ExpoImagePicker.requestMediaLibraryPermissionsAsync.mockResolvedValueOnce({
      granted: true,
    });
    ExpoImagePicker.launchImageLibraryAsync.mockResolvedValueOnce({
      canceled: true,
    });

    const onImageSelected = jest.fn();
    const { getByText } = await render(
      <ImagePickerComponent onImageSelected={onImageSelected} />
    );

    await fireEvent.press(getByText("Pick Image"));

    await waitFor(() => {
      expect(ExpoImagePicker.launchImageLibraryAsync).toHaveBeenCalled();
    });
    expect(onImageSelected).not.toHaveBeenCalled();
  });

  it("handles a selected image when no callback is provided", async () => {
    // Verifies the component is safe when onImageSelected is omitted.
    ExpoImagePicker.requestMediaLibraryPermissionsAsync.mockResolvedValueOnce({
      granted: true,
    });
    ExpoImagePicker.launchImageLibraryAsync.mockResolvedValueOnce({
      canceled: false,
      assets: [{ uri: "file:///profile.png" }],
    });

    const { getByText } = await render(<ImagePickerComponent />);

    await fireEvent.press(getByText("Pick Image"));

    await waitFor(() => {
      expect(ExpoImagePicker.launchImageLibraryAsync).toHaveBeenCalled();
    });
  });
});
