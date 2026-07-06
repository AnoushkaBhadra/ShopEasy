import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

import MapPicker from "../../components/MapPicker";
import { useDispatch } from "react-redux";
import { setLocation } from "../../store/slices/locationSlice";
import { COLORS } from "../../theme/colors";
import TYPOGRAPHY from "../../theme/typography";
import { SPACING } from "../../theme/spacing";
import { SHADOW } from "../../theme/shadows";
import { RADIUS } from "../../theme/radius";

export default function MapSelectionScreen({ navigation }) {
  const dispatch = useDispatch();

  const [selectedLocation, setSelectedLocation] = useState(null);

  function handleLocationSelected(coords) {
    setSelectedLocation(coords);
  }

  function handleConfirm() {
    if (!selectedLocation) {
      return;
    }
    console.log("SETTING LOCATION", selectedLocation);
    dispatch(
      setLocation({
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
      })
    );

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.map}>
        <MapPicker onLocationSelected={handleLocationSelected} />
      </View>

      {selectedLocation && (
        <View style={styles.coordinates}>
          <Text style={styles.coordinateText}>
            Latitude: {selectedLocation.latitude.toFixed(6)}
          </Text>

          <Text style={styles.coordinateText}>
            Longitude: {selectedLocation.longitude.toFixed(6)}
          </Text>
        </View>
      )}

      <Pressable
        onPress={handleConfirm}
        disabled={!selectedLocation}
        style={({ pressed }) => [
          styles.primaryButton,
          !selectedLocation && styles.disabledButton,
          pressed && selectedLocation && styles.primaryButtonPressed,
        ]}
      >
        <Text style={styles.primaryButtonText}>Confirm Location</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.cancelButton,
          pressed && styles.pressed,
        ]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.lg,
    backgroundColor: COLORS.background,
  },
  map: {
    flex: 1,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.surface,
    ...SHADOW.card,
  },
  coordinates: {
    marginTop: SPACING.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
  },
  coordinateText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  },
  primaryButton: {
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    marginTop: SPACING.md,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.primary,
    ...SHADOW.button,
  },
  primaryButtonPressed: {
    backgroundColor: COLORS.primaryDark,
  },
  disabledButton: {
    backgroundColor: COLORS.disabled,
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
