import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  Alert,
  Pressable,
} from "react-native";

import { getUser } from "../../utils/authStorage";
import {
  getAddresses,
  deleteAddress,
} from "../../services/addressService";

export default function SavedAddressScreen({
  navigation,
  route,
}) {
  const selectionMode = route.params?.selectionMode || false;

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    loadAddresses();
  }, []);

  async function loadAddresses() {
    try {
      const user = await getUser();

      if (!user) return;

      const data = await getAddresses(user.id);

      setAddresses(data);

      if (selectionMode) {
        const defaultAddress = data.find(
          (item) => item.isDefault
        );

        if (defaultAddress) {
          setSelectedAddress(defaultAddress);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(id) {
    Alert.alert(
      "Delete Address",
      "Are you sure you want to delete this address?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteAddress(id);
              loadAddresses();
            } catch (error) {
              console.log(error);
            }
          },
        },
      ]
    );
  }

  function renderItem({ item }) {
    const selected =
      selectedAddress?.id === item.id;

    return (
      <Pressable
        onPress={() => {
          if (selectionMode) {
            setSelectedAddress(item);
          }
        }}
        style={{
          borderWidth: selected ? 2 : 1,
          borderColor: selected ? "blue" : "black",
          padding: 10,
          marginBottom: 15,
        }}
      >
        <Text>{item.label}</Text>

        <Text>{item.addressLine}</Text>

        <Text>
          {item.city}, {item.state}
        </Text>

        <Text>{item.pincode}</Text>

        <Text>{item.country}</Text>

        <Text>Latitude : {item.latitude}</Text>

        <Text>Longitude : {item.longitude}</Text>

        <Text>
          Default :
          {item.isDefault ? " Yes" : " No"}
        </Text>

        {!selectionMode && (
          <>
            <View style={{ marginTop: 10 }} />

            <Button
              title="Edit"
              onPress={() =>
                navigation.navigate("AddressForm", {
                  addressId: item.id,
                })
              }
            />

            <View style={{ height: 10 }} />

            <Button
              title="Delete"
              onPress={() =>
                handleDelete(item.id)
              }
            />
          </>
        )}
      </Pressable>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        paddingTop: 50,
      }}
    >
      <Button
        title="Add Address"
        onPress={() =>
          navigation.navigate("AddressForm")
        }
      />

      <View style={{ height: 20 }} />

      <FlatList
        data={addresses}
        keyExtractor={(item) =>
          item.id.toString()
        }
        renderItem={renderItem}
      />

      {selectionMode && (
        <>
          <Button
            title="Proceed to Payment"
            disabled={!selectedAddress}
            onPress={() =>
              navigation.navigate("Payment", {
                selectedAddress,
              })
            }
          />
        </>
      )}
    </View>
  );
}