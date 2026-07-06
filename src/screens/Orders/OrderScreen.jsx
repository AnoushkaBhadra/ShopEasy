import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";

import {
  getOrder,
  getOrderItems,
} from "../../services/orderService";

import { getAddress } from "../../services/addressService";

export default function OrderScreen({ route }) {
  const orderId = route.params?.orderId;

  const [order, setOrder] = useState(null);
  const [address, setAddress] = useState(null);
  const [items, setItems] = useState([]);
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

      const orderItems = await getOrderItems(orderId);
      setItems(orderItems);
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
        Order Details
      </Text>

      <Text>Order ID : {order.id}</Text>

      <Text>Status : {order.status}</Text>

      <Text>Payment : {order.paymentMethod}</Text>

      <Text>Total : ₹{order.totalAmount}</Text>

      <View style={{ height: 20 }} />

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

      <View style={{ height: 20 }} />

      <Text
        style={{
          fontWeight: "bold",
          marginBottom: 10,
        }}
      >
        Products
      </Text>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              borderWidth: 1,
              padding: 10,
              marginBottom: 10,
            }}
          >
            <Text>{item.productName}</Text>

            <Text>₹{item.price}</Text>

            <Text>Quantity : {item.quantity}</Text>
          </View>
        )}
      />
    </View>
  );
}