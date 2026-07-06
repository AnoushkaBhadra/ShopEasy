import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  ActivityIndicator,
} from "react-native";

import { getOrder } from "../../services/orderService";
import { getAddress } from "../../services/addressService";

export default function OrderConfirmationScreen({
  navigation,
  route,
}) {
  const orderId = route.params?.orderId;

  const [order, setOrder] = useState(null);
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrder();
  }, []);

  async function loadOrder() {
    try {
      const orderData = await getOrder(orderId);

      setOrder(orderData);

      const addressData = await getAddress(
        orderData.addressId
      );

      setAddress(addressData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!order || !address) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Unable to load order.</Text>
      </View>
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
      <Text
        style={{
          fontSize: 24,
          marginBottom: 20,
        }}
      >
        Order Placed Successfully!
      </Text>

      <Text>Order ID</Text>
      <Text>{order.id}</Text>

      <View style={{ height: 15 }} />

      <Text>Order Date</Text>
      <Text>{order.orderDate}</Text>

      <View style={{ height: 15 }} />

      <Text>Status</Text>
      <Text>{order.status}</Text>

      <View style={{ height: 15 }} />

      <Text>Payment Method</Text>
      <Text>{order.paymentMethod}</Text>

      <View style={{ height: 15 }} />

      <Text>Payment Status</Text>
      <Text>{order.paymentStatus}</Text>

      <View style={{ height: 15 }} />

      <Text>Total Amount</Text>
      <Text>₹{order.totalAmount}</Text>

      <View style={{ height: 25 }} />

      <Text
        style={{
          fontWeight: "bold",
        }}
      >
        Delivery Address
      </Text>

      <Text>{address.label}</Text>

      <Text>{address.addressLine}</Text>

      <Text>
        {address.city}, {address.state}
      </Text>

      <Text>{address.pincode}</Text>

      <View style={{ height: 40 }} />

      <Button
        title="Continue Shopping"
        onPress={() =>
          navigation.navigate("AppTabs")
        }
      />
    </View>
  );
}