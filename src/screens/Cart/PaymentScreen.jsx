import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Alert,
  ScrollView,
} from "react-native";

import QRScanner from "../../components/QRScanner";

export default function PaymentScreen({ navigation, route }) {
  const selectedAddress = route.params?.selectedAddress;

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [paymentDone, setPaymentDone] = useState(false);

  function handleQRSuccess() {
    Alert.alert("Success", "QR scanned successfully.");
    setPaymentDone(true);
  }

  function handlePlaceOrder() {
    if (paymentMethod === "UPI" && !paymentDone) {
      Alert.alert(
        "Payment Required",
        "Please scan the QR code first."
      );
      return;
    }

    navigation.navigate("Order", {
      selectedAddress,
      paymentMethod,
    });
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