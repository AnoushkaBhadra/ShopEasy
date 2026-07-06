import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import {
  createOrder,
  createOrderItems,
} from "../../services/orderService";
import { clearCart } from "../../store/slices/cartSlice";

import QRScanner from "../../components/QRScanner";
import { COLORS } from "../../theme/colors";
import TYPOGRAPHY from "../../theme/typography";
import { SPACING } from "../../theme/spacing";
import { SHADOW } from "../../theme/shadows";
import { RADIUS } from "../../theme/radius";

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

      navigation.replace("Order Confirmation", {
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
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Payment</Text>
      <Text style={styles.subtitle}>
        Choose how you would like to pay.
      </Text>

      <View style={styles.card}>
        <Text style={styles.sectionLabel}>Deliver To</Text>
        <Text style={styles.cardTitle}>{selectedAddress.label}</Text>
        <Text style={styles.bodyText}>{selectedAddress.addressLine}</Text>
        <Text style={styles.bodyText}>
          {selectedAddress.city}, {selectedAddress.state}
        </Text>
        <Text style={styles.bodyText}>{selectedAddress.pincode}</Text>
      </View>

      <Text style={styles.sectionTitle}>Choose Payment Method</Text>

      <Pressable
        style={({ pressed }) => [
          styles.paymentOption,
          paymentMethod === "COD" && styles.selectedOption,
          pressed && styles.pressed,
        ]}
        onPress={() => {
          setPaymentMethod("COD");
          setPaymentDone(false);
        }}
      >
        <Text
          style={[
            styles.paymentOptionText,
            paymentMethod === "COD" && styles.selectedOptionText,
          ]}
        >
          Cash On Delivery
        </Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.paymentOption,
          paymentMethod === "UPI" && styles.selectedOption,
          pressed && styles.pressed,
        ]}
        onPress={() => {
          setPaymentMethod("UPI");
          setPaymentDone(false);
        }}
      >
        <Text
          style={[
            styles.paymentOptionText,
            paymentMethod === "UPI" && styles.selectedOptionText,
          ]}
        >
          UPI
        </Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.paymentOption,
          paymentMethod === "Credit Card" && styles.selectedOption,
          pressed && styles.pressed,
        ]}
        onPress={() => {
          setPaymentMethod("Credit Card");
          setPaymentDone(true);
        }}
      >
        <Text
          style={[
            styles.paymentOptionText,
            paymentMethod === "Credit Card" && styles.selectedOptionText,
          ]}
        >
          Credit Card
        </Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.paymentOption,
          paymentMethod === "Debit Card" && styles.selectedOption,
          pressed && styles.pressed,
        ]}
        onPress={() => {
          setPaymentMethod("Debit Card");
          setPaymentDone(true);
        }}
      >
        <Text
          style={[
            styles.paymentOptionText,
            paymentMethod === "Debit Card" && styles.selectedOptionText,
          ]}
        >
          Debit Card
        </Text>
      </Pressable>

      <Text style={styles.selectedMethod}>
        Selected Payment Method: {paymentMethod}
      </Text>

      {paymentMethod === "UPI" && (
        <>
          <View style={styles.scanner}>
            <QRScanner onQRScanned={handleQRSuccess} />
          </View>

          <Text
            style={[
              styles.paymentStatus,
              paymentDone && styles.paymentSuccess,
            ]}
          >
            {paymentDone
              ? "Payment Completed"
              : "Please scan the QR code to continue."}
          </Text>
        </>
      )}

      <Pressable
        style={({ pressed }) => [
          styles.primaryButton,
          pressed && styles.primaryButtonPressed,
        ]}
        onPress={handlePlaceOrder}
      >
        <Text style={styles.primaryButtonText}>Place Order</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.cancelButton,
          pressed && styles.pressed,
        ]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xxl,
    paddingBottom: SPACING.xxl,
  },
  title: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    marginBottom: SPACING.lg,
  },
  card: {
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.surface,
    ...SHADOW.card,
  },
  sectionLabel: {
    ...TYPOGRAPHY.label,
    color: COLORS.primary,
    marginBottom: SPACING.sm,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  cardTitle: {
    ...TYPOGRAPHY.title,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  bodyText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  paymentOption: {
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
  },
  selectedOption: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  paymentOptionText: {
    ...TYPOGRAPHY.button,
    color: COLORS.text,
  },
  selectedOptionText: {
    color: COLORS.surface,
  },
  selectedMethod: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    marginTop: SPACING.sm,
    marginBottom: SPACING.md,
  },
  scanner: {
    height: 350,
    overflow: "hidden",
    marginVertical: SPACING.md,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.surface,
  },
  paymentStatus: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
    textAlign: "center",
  },
  paymentSuccess: {
    color: COLORS.success,
  },
  primaryButton: {
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    marginTop: SPACING.md,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.primary,
    ...SHADOW.button,
  },
  primaryButtonPressed: {
    backgroundColor: COLORS.primaryDark,
  },
  primaryButtonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.surface,
  },
  cancelButton: {
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    marginTop: SPACING.xs,
  },
  cancelButtonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.textSecondary,
  },
  pressed: {
    opacity: 0.75,
  },
});
