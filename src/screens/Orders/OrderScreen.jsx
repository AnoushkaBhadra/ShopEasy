import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import {
  getOrder,
  getOrderItems,
} from "../../services/orderService";

import { getAddress } from "../../services/addressService";
import { COLORS } from "../../theme/colors";
import TYPOGRAPHY from "../../theme/typography";
import { SPACING } from "../../theme/spacing";
import { SHADOW } from "../../theme/shadows";
import { RADIUS } from "../../theme/radius";

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
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Details</Text>
      <Text style={styles.subtitle}>Order #{order.id}</Text>

      <View style={styles.summaryCard}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Status</Text>
          <Text style={styles.status}>{order.status}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Payment</Text>
          <Text style={styles.detailValue}>{order.paymentMethod}</Text>
        </View>
        <View style={[styles.detailRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.total}>₹{order.totalAmount}</Text>
        </View>
      </View>

      <View style={styles.addressCard}>
        <Text style={styles.sectionTitle}>Delivery Address</Text>
        <Text style={styles.addressTitle}>{address.label}</Text>
        <Text style={styles.addressText}>{address.addressLine}</Text>
        <Text style={styles.addressText}>
          {address.city}, {address.state}
        </Text>
      </View>

      <Text style={styles.productsTitle}>Products</Text>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.productName}</Text>
              <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
            </View>
            <Text style={styles.productPrice}>₹{item.price}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xxl,
    backgroundColor: COLORS.background,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.background,
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
  summaryCard: {
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.surface,
    ...SHADOW.card,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SPACING.sm,
  },
  detailLabel: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
  detailValue: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
  },
  status: {
    ...TYPOGRAPHY.label,
    color: COLORS.success,
    textTransform: "capitalize",
  },
  totalRow: {
    paddingTop: SPACING.md,
    marginTop: SPACING.xs,
    marginBottom: 0,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
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
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.surface,
  },
  sectionTitle: {
    ...TYPOGRAPHY.label,
    color: COLORS.primary,
    marginBottom: SPACING.sm,
    textTransform: "uppercase",
    letterSpacing: 0.5,
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
  productsTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  list: {
    paddingBottom: SPACING.xxl,
  },
  productCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: SPACING.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    ...TYPOGRAPHY.title,
    color: COLORS.text,
    marginBottom: SPACING.xxs,
  },
  quantity: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  },
  productPrice: {
    ...TYPOGRAPHY.price,
    color: COLORS.primary,
  },
});
