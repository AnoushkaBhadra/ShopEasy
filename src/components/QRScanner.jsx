import React, { useState } from "react";
import { View, Button } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

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
      <View style={{ paddingTop: 50 }}>
        <Button title="Grant Camera Permission" onPress={requestPermission} />
      </View>
    );
  }

  if (showCamera) {
    return (
      <CameraView
        style={{
          width: "100%",
          height: 350,
        }}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={handleQRcodeScanned}
      />
    );
  }

  return (
    <View style={{ paddingTop: 50 }}>
      <Button title="Scan QR" onPress={() => setShowCamera(true)} />
    </View>
  );
}
