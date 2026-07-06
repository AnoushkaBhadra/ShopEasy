import React from "react";
import { View, Text, Button } from "react-native";

export default function OrderConfirmationScreen({
  navigation,
  route,
}) {
  const { selectedAddress, paymentMethod } =
    route.params;

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        paddingTop: 50,
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontSize: 24,
          marginBottom: 20,
        }}
      >
        Order Placed Successfully!
      </Text>

      <Text
        style={{
          marginBottom: 20,
        }}
      >
        Thank you for shopping with ShopEasy.
      </Text>

      <Text
        style={{
          fontWeight: "bold",
        }}
      >
        Delivery Address
      </Text>

      <Text>{selectedAddress.label}</Text>

      <Text>{selectedAddress.addressLine}</Text>

      <Text>
        {selectedAddress.city}, {selectedAddress.state}
      </Text>

      <Text>{selectedAddress.pincode}</Text>

      <View style={{ height: 20 }} />

      <Text
        style={{
          fontWeight: "bold",
        }}
      >
        Payment Method
      </Text>

      <Text>{paymentMethod}</Text>

      <View style={{ height: 40 }} />

      <Button
        title="Continue Shopping"
        onPress={() =>
          navigation.navigate("AppTabs", {
            screen: "Home",
          })
        }
      />
    </View>
  );
}