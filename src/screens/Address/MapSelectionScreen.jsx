import React, { useState } from "react";
import { View, Text, Button } from "react-native";

import MapPicker from "../../components/MapPicker";
import { useDispatch } from "react-redux";
import { setLocation } from "../../store/slices/locationSlice";

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

    dispatch(
      setLocation({
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
      })
    );

    navigation.goBack();
  }

  return (
    <View style={{ flex: 1 }}>
      <MapPicker onLocationSelected={handleLocationSelected} />

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