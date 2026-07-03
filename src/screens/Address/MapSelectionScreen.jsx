import React from "react";
import { Alert } from "react-native";

import MapPicker from "../../components/MapPicker";

export default function MapSelectionScreen() {
  function handleLocationSelected(coords) {
    Alert.alert(
      "Location Selected",
      `Latitude: ${coords.latitude.toFixed(6)}
       Longitude: ${coords.longitude.toFixed(6)}`,
    );

    // Navigation back to AddressFormScreen
    // will be added after Stack Navigator is available.
  }

  return <MapPicker onLocationSelected={handleLocationSelected} />;
}
