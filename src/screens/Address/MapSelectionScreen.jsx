import React, { useState } from "react";
import { View, Text, Button } from "react-native";

import MapPicker from "../../components/MapPicker";

export default function MapSelectionScreen({ navigation, route }) {
  const [selectedLocation, setSelectedLocation] = useState(null);

  function handleLocationSelected(coords) {
    setSelectedLocation(coords);
  }

  function handleConfirm() {
    if (!selectedLocation) {
      return;
    }

    if (route.params?.onLocationSelected) {
      route.params.onLocationSelected(selectedLocation);
    }

    navigation.goBack();
  }

  return (
    <View style={{ flex: 1 }}>
      <MapPicker
        onLocationSelected={handleLocationSelected}
      />

      {selectedLocation && (
        <View style={{ padding: 15 }}>
          <Text>
            Latitude: {selectedLocation.latitude.toFixed(6)}
          </Text>

          <Text>
            Longitude: {selectedLocation.longitude.toFixed(6)}
          </Text>
        </View>
      )}

      <Button
        title="Confirm Location"
        onPress={handleConfirm}
        disabled={!selectedLocation}
      />

      <Button
        title="Cancel"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}