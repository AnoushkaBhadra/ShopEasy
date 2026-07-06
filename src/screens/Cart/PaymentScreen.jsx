import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import {
  createOrder,
  createOrderItems,
} from "../../services/orderService";
import { clearCart } from "../../store/slices/cartSlice";

import QRScanner from "../../components/QRScanner";

export default function PaymentScreen({ navigation, route }) {
  const dispatch = useDispatch();

  const selectedAddress = route.params?.selectedAddress;

  const user = useSelector((state) => state.auth.user);
  const cart = useSelector((state) => state.cart);

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [paymentDone, setPaymentDone] = useState(false);

  function handleQRSuccess() {
    Alert.alert("Success", "QR scanned successfully.");
    setPaymentDone(true);
  }

  async function handlePlaceOrder() {
    if (paymentMethod === "UPI" && !paymentDone) {
      Alert.alert(
        "Payment Required",
        "Please scan the QR code first."
      );
      return;
    }

    try {
      // Create Order
      const orderData = {
        userId: user.id,
        addressId: selectedAddress.id,
        orderDate: new Date().toISOString(),
        status: "pending",
        totalAmount: cart.total,
        paymentMethod,
        paymentStatus:
          paymentMethod === "COD"
            ? "pending"
            : "completed",
      };

      const newOrder = await createOrder(orderData);

      // Create Order Items
      const orderItems = cart.items.map((item) => ({
        orderId: newOrder.id,
        productId: item.id,
        productName: item.name,
        price: item.price,
        quantity: item.quantity,
      }));

      await createOrderItems(orderItems);

      // Clear Redux Cart
      dispatch(clearCart());

      navigation.navigate("Order Confirmation", {
  orderId: newOrder.id,
});
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Order Error",
        "Unable to place order."
      );
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        paddingTop: 50,
        paddingBottom: 40,
      }}
      showsVerticalScrollIndicator={false}
    >
      <Text
        style={{
          fontSize: 22,
          marginBottom: 20,
        }}
      >
        Payment
      </Text>

      <Text>Deliver To</Text>

      <Text>{selectedAddress.label}</Text>

      <Text>{selectedAddress.addressLine}</Text>

      <Text>
        {selectedAddress.city}, {selectedAddress.state}
      </Text>

      <Text>{selectedAddress.pincode}</Text>

      <View style={{ height: 30 }} />

      <Text>Choose Payment Method</Text>

      <View style={{ height: 10 }} />

      <Button
        title="Cash On Delivery"
        onPress={() => {
          setPaymentMethod("COD");
          setPaymentDone(false);
        }}
      />

      <View style={{ height: 10 }} />

      <Button
        title="UPI"
        onPress={() => {
          setPaymentMethod("UPI");
          setPaymentDone(false);
        }}
      />

      <View style={{ height: 10 }} />

      <Button
        title="Credit Card"
        onPress={() => {
          setPaymentMethod("Credit Card");
          setPaymentDone(true);
        }}
      />

      <View style={{ height: 10 }} />

      <Button
        title="Debit Card"
        onPress={() => {
          setPaymentMethod("Debit Card");
          setPaymentDone(true);
        }}
      />

      <View style={{ height: 30 }} />

      <Text>
        Selected Payment Method: {paymentMethod}
      </Text>

      <View style={{ height: 20 }} />

      {paymentMethod === "UPI" && (
        <>
          <View
            style={{
              height: 350,
              marginVertical: 20,
            }}
          >
            <QRScanner onQRScanned={handleQRSuccess} />
          </View>

          <Text>
            {paymentDone
              ? "Payment Completed"
              : "Please scan the QR code to continue."}
          </Text>

          <View style={{ height: 20 }} />
        </>
      )}

      <Button
        title="Place Order"
        onPress={handlePlaceOrder}
      />

      <View style={{ height: 10 }} />

      <Button
        title="Cancel"
        onPress={() => navigation.goBack()}
      />
    </ScrollView>
  );
}