import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import {
  getAddress,
  addAddress,
  updateAddress,
} from "../../services/addressService";

import {
  clearLocation,
} from "../../store/slices/locationSlice";

export default function AddressFormScreen({ navigation, route }) {
  const dispatch = useDispatch();

  const addressId = route.params?.addressId;

  const user = useSelector((state) => state.auth.user);

  const location = useSelector(
    (state) => state.location
  );

  const [label, setLabel] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [country, setCountry] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [isDefault, setIsDefault] = useState(false);

  useEffect(() => {
    dispatch(clearLocation());

    if (addressId) {
      loadAddress();
    }
  }, []);

  useEffect(() => {
    if (
      location.latitude !== null &&
      location.longitude !== null
    ) {
      setLatitude(String(location.latitude));
      setLongitude(String(location.longitude));
    }
  }, [location]);

  async function loadAddress() {
    try {
      const address = await getAddress(addressId);

      setLabel(address.label);
      setAddressLine(address.addressLine);
      setCity(address.city);
      setState(address.state);
      setPincode(address.pincode);
      setCountry(address.country);
      setLatitude(String(address.latitude));
      setLongitude(String(address.longitude));
      setIsDefault(address.isDefault);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSave() {
    try {
      if (!user) {
        Alert.alert("Error", "User not found.");
        return;
      }

      const addressData = {
        userId: user.id,
        label,
        addressLine,
        city,
        state,
        pincode,
        country,
        latitude: Number(latitude),
        longitude: Number(longitude),
        isDefault,
      };

      if (addressId) {
        await updateAddress(addressId, addressData);

        Alert.alert("Success", "Address updated.");
      } else {
        await addAddress(addressData);

        Alert.alert("Success", "Address added.");
      }

      dispatch(clearLocation());

      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          paddingTop: 50,
          paddingBottom: 40,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <Text>Label</Text>

        <TextInput
          value={label}
          onChangeText={setLabel}
          style={{
            borderWidth: 1,
            marginBottom: 15,
            padding: 8,
          }}
        />

        <Text>Address Line</Text>

        <TextInput
          value={addressLine}
          onChangeText={setAddressLine}
          style={{
            borderWidth: 1,
            marginBottom: 15,
            padding: 8,
          }}
        />

        <Text>City</Text>

        <TextInput
          value={city}
          onChangeText={setCity}
          style={{
            borderWidth: 1,
            marginBottom: 15,
            padding: 8,
          }}
        />

        <Text>State</Text>

        <TextInput
          value={state}
          onChangeText={setState}
          style={{
            borderWidth: 1,
            marginBottom: 15,
            padding: 8,
          }}
        />

        <Text>Pincode</Text>

        <TextInput
          value={pincode}
          onChangeText={setPincode}
          keyboardType="numeric"
          style={{
            borderWidth: 1,
            marginBottom: 15,
            padding: 8,
          }}
        />

        <Text>Country</Text>

        <TextInput
          value={country}
          onChangeText={setCountry}
          style={{
            borderWidth: 1,
            marginBottom: 15,
            padding: 8,
          }}
        />

        <Text>Latitude</Text>

        <TextInput
          value={latitude}
          editable={false}
          style={{
            borderWidth: 1,
            marginBottom: 15,
            padding: 8,
          }}
        />

        <Text>Longitude</Text>

        <TextInput
          value={longitude}
          editable={false}
          style={{
            borderWidth: 1,
            marginBottom: 20,
            padding: 8,
          }}
        />

        <Button
          title="Pick Location on Map"
          onPress={() =>
            navigation.navigate("MapSelection")
          }
        />

        <View style={{ height: 15 }} />

        <Button
          title={
            addressId
              ? "Update Address"
              : "Save Address"
          }
          onPress={handleSave}
        />

        <View style={{ height: 10 }} />

        <Button
          title={
            isDefault
              ? "Default Address"
              : "Set as Default"
          }
          onPress={() => setIsDefault(!isDefault)}
        />

        <View style={{ height: 10 }} />

        <Button
          title="Cancel"
          onPress={() => {
            dispatch(clearLocation());
            navigation.goBack();
          }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}