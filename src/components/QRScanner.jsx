import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { COLORS } from "../theme/colors";
import TYPOGRAPHY from "../theme/typography";
import { SPACING } from "../theme/spacing";
import { SHADOW } from "../theme/shadows";
import { RADIUS } from "../theme/radius";

export default function QRScanner({ onQRScanned }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);

  function handleQRcodeScanned() {
    setShowCamera(false);

    if (onQRScanned) {
      onQRScanned(true);
    }
  }

  if (!permission) {
    return null;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={requestPermission}
        >
          <Text style={styles.buttonText}>Grant Camera Permission</Text>
        </Pressable>
      </View>
    );
  }

  if (showCamera) {
    return (
      <CameraView
        style={styles.camera}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={handleQRcodeScanned}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={() => setShowCamera(true)}
      >
        <Text style={styles.buttonText}>Scan QR</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.surface,
  },
  camera: {
    width: "100%",
    height: 350,
    borderRadius: RADIUS.lg,
  },
  button: {
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.primary,
    ...SHADOW.button,
  },
  buttonPressed: {
    backgroundColor: COLORS.primaryDark,
  },
  buttonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.surface,
  },
});
