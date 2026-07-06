import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  Pressable,
  StyleSheet,
} from "react-native";

import { getOrder } from "../../services/orderService";
import { getAddress } from "../../services/addressService";

import { COLORS } from "../../theme/colors";
import TYPOGRAPHY from "../../theme/typography";
import { SPACING } from "../../theme/spacing";
import { SHADOW } from "../../theme/shadows";
import { RADIUS } from "../../theme/radius";

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
      <View style={styles.centered}>
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
        />
      </View>
    );
  }

  if (!order || !address) {
    return (
      <View style={styles.centered}>
        <Text style={styles.message}>
          Unable to load order.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.successMark}>
        <Text style={styles.successMarkText}>✓</Text>
      </View>

      <Text style={styles.title}>
        Order Placed Successfully!
      </Text>

      <Text style={styles.subtitle}>
        Your order has been received and is being prepared.
      </Text>

      <View style={styles.card}>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Order ID</Text>
          <Text style={styles.value}>{order.id}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Order Date</Text>
          <Text style={styles.value}>
            {new Date(order.orderDate).toLocaleString()}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Status</Text>
          <Text style={styles.status}>
            {order.status}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>
            Payment Method
          </Text>
          <Text style={styles.value}>
            {order.paymentMethod}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>
            Payment Status
          </Text>
          <Text style={styles.value}>
            {order.paymentStatus}
          </Text>
        </View>

        <View
          style={[
            styles.detailRow,
            styles.totalRow,
          ]}
        >
          <Text style={styles.totalLabel}>
            Total Amount
          </Text>

          <Text style={styles.total}>
            ₹{order.totalAmount}
          </Text>
        </View>
      </View>

      <View style={styles.addressCard}>
        <Text style={styles.sectionTitle}>
          Delivery Address
        </Text>

        <Text style={styles.addressTitle}>
          {address.label}
        </Text>

        <Text style={styles.addressText}>
          {address.addressLine}
        </Text>

        <Text style={styles.addressText}>
          {address.city}, {address.state}
        </Text>

        <Text style={styles.addressText}>
          {address.pincode}
        </Text>

        <Text style={styles.addressText}>
          {address.country}
        </Text>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [
              {
                name: "AppTabs",
              },
            ],
          })
        }
      >
        <Text style={styles.buttonText}>
          Continue Shopping
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xxl,
    paddingBottom: SPACING.xxl,
    backgroundColor: COLORS.background,
    flexGrow: 1,
  },

  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },

  message: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },

  successMark: {
    width: 60,
    height: 60,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.success,
    marginBottom: SPACING.md,
  },

  successMarkText: {
    ...TYPOGRAPHY.h2,
    color: COLORS.surface,
  },

  title: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text,
    textAlign: "center",
    marginBottom: SPACING.sm,
  },

  subtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: SPACING.xl,
  },

  card: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    ...SHADOW.card,
  },

  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SPACING.sm,
    gap: SPACING.md,
  },

  label: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  },

  value: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.text,
    flex: 1,
    textAlign: "right",
  },

  status: {
    ...TYPOGRAPHY.label,
    color: COLORS.success,
    textTransform: "capitalize",
  },

  totalRow: {
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
    paddingTop: SPACING.md,
    marginTop: SPACING.sm,
  },

  totalLabel: {
    ...TYPOGRAPHY.title,
    color: COLORS.text,
  },

  total: {
    ...TYPOGRAPHY.price,
    color: COLORS.primary,
  },

  addressCard: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
    ...SHADOW.card,
  },

  sectionTitle: {
    ...TYPOGRAPHY.label,
    color: COLORS.primary,
    marginBottom: SPACING.sm,
    textTransform: "uppercase",
  },

  addressTitle: {
    ...TYPOGRAPHY.title,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },

  addressText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },

  button: {
    height: 50,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOW.button,
  },

  buttonPressed: {
    backgroundColor: COLORS.primaryDark,
  },

  buttonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.surface,
  },
});