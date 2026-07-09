import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

import QRScanner from "./QRScanner";

jest.mock("expo-camera", () => ({
  CameraView: jest.fn(({ onBarcodeScanned }) => {
    const { Pressable, Text } = require("react-native");
    return (
      <Pressable testID="camera-view" onPress={onBarcodeScanned}>
        <Text>Mock Camera</Text>
      </Pressable>
    );
  }),
  useCameraPermissions: jest.fn(),
}));

describe("QRScanner", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders nothing while camera permission state is loading", async () => {
    // Verifies the component waits for permission state before rendering UI.
    useCameraPermissions.mockReturnValue([null, jest.fn()]);

    const { queryByText } = await render(
      <QRScanner onQRScanned={jest.fn()} />
    );

    await waitFor(() => {
      expect(queryByText("Grant Camera Permission")).toBeNull();
      expect(queryByText("Scan QR")).toBeNull();
    });
  });

  it("renders a permission button when camera permission is not granted", async () => {
    // Verifies users can request camera access when permission is missing.
    useCameraPermissions.mockReturnValue([{ granted: false }, jest.fn()]);

    const { getByText } = await render(
      <QRScanner onQRScanned={jest.fn()} />
    );

    await waitFor(() => {
      expect(getByText("Grant Camera Permission")).toBeTruthy();
    });
  });

  it("requests camera permission when the permission button is pressed", async () => {
    // Verifies the Expo permission request callback is invoked.
    const requestPermission = jest.fn();
    useCameraPermissions.mockReturnValue([
      { granted: false },
      requestPermission,
    ]);

    const { getByText } = await render(
      <QRScanner onQRScanned={jest.fn()} />
    );

    await fireEvent.press(getByText("Grant Camera Permission"));

    expect(requestPermission).toHaveBeenCalledTimes(1);
  });

  it("renders a scan button when camera permission is granted", async () => {
    // Verifies users can start QR scanning after permission is granted.
    useCameraPermissions.mockReturnValue([{ granted: true }, jest.fn()]);

    const { getByText } = await render(
      <QRScanner onQRScanned={jest.fn()} />
    );

    await waitFor(() => {
      expect(getByText("Scan QR")).toBeTruthy();
    });
  });

  it("shows CameraView with QR settings when scan is started", async () => {
    // Verifies pressing Scan QR opens the camera scanner view.
    useCameraPermissions.mockReturnValue([{ granted: true }, jest.fn()]);

    const { getByText, getByTestId } = await render(
      <QRScanner onQRScanned={jest.fn()} />
    );

    await fireEvent.press(getByText("Scan QR"));

    await waitFor(() => {
      expect(getByTestId("camera-view")).toBeTruthy();
      expect(CameraView).toHaveBeenCalled();
      expect(CameraView.mock.calls[0][0]).toEqual(
        expect.objectContaining({
          barcodeScannerSettings: {
            barcodeTypes: ["qr"],
          },
          onBarcodeScanned: expect.any(Function),
        })
      );
    });
  });

  it("calls onQRScanned and hides the camera when a QR code is scanned", async () => {
    // Verifies a successful scan notifies the parent and returns to button UI.
    useCameraPermissions.mockReturnValue([{ granted: true }, jest.fn()]);

    const onQRScanned = jest.fn();
    const { getByText, getByTestId, queryByTestId } = await render(
      <QRScanner onQRScanned={onQRScanned} />
    );

    await fireEvent.press(getByText("Scan QR"));
    await fireEvent.press(getByTestId("camera-view"));

    expect(onQRScanned).toHaveBeenCalledTimes(1);
    expect(onQRScanned).toHaveBeenCalledWith(true);
    await waitFor(() => {
      expect(queryByTestId("camera-view")).toBeNull();
      expect(getByText("Scan QR")).toBeTruthy();
    });
  });

  it("handles a QR scan when no callback is provided", async () => {
    // Verifies scanning is safe when onQRScanned is omitted.
    useCameraPermissions.mockReturnValue([{ granted: true }, jest.fn()]);

    const { getByText, getByTestId, queryByTestId } = await render(
      <QRScanner />
    );

    await fireEvent.press(getByText("Scan QR"));
    await fireEvent.press(getByTestId("camera-view"));

    await waitFor(() => {
      expect(queryByTestId("camera-view")).toBeNull();
    });
  });
});
