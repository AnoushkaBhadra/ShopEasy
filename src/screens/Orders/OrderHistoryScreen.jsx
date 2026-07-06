import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  ActivityIndicator,
  Pressable,
} from "react-native";

import { useSelector } from "react-redux";

import { getOrders } from "../../services/orderService";

export default function OrderHistoryScreen({ navigation }) {
  const user = useSelector((state) => state.auth.user);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      const data = await getOrders(user.id);

      setOrders(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function renderOrder({ item }) {
    return (
      <Pressable
        style={{
          borderWidth: 1,
          padding: 15,
          marginBottom: 15,
        }}
        onPress={() =>
          navigation.navigate("Order", {
            orderId: item.id,
          })
        }
      >
        <Text>Order ID : {item.id}</Text>

        <Text>
          Date :{" "}
          {new Date(item.orderDate).toLocaleDateString()}
        </Text>

        <Text>Status : {item.status}</Text>

        <Text>Total : ₹{item.totalAmount}</Text>

        <Text>
          Payment : {item.paymentMethod}
        </Text>
      </Pressable>
    );
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
        My Orders
      </Text>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderOrder}
        ListEmptyComponent={
          <Text>No Orders Found.</Text>
        }
      />

      <Button
        title="Refresh"
        onPress={loadOrders}
      />
    </View>
  );
}