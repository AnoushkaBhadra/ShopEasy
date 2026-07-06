import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Pressable,
  StyleSheet,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { useSelector } from "react-redux";

import { getOrders } from "../../services/orderService";
import { COLORS } from "../../theme/colors";
import TYPOGRAPHY from "../../theme/typography";
import { SPACING } from "../../theme/spacing";
import { SHADOW } from "../../theme/shadows";
import { RADIUS } from "../../theme/radius";

export default function OrderHistoryScreen({ navigation }) {
  const user = useSelector((state) => state.auth.user);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      loadOrders();
    }, []),
  );

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
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        onPress={() =>
          navigation.navigate("Order", {
            orderId: item.id,
          })
        }
      >
        <View style={styles.cardHeader}>
          <Text style={styles.orderId}>Order #{item.id}</Text>
          <Text style={styles.status}>{item.status}</Text>
        </View>

        <Text style={styles.date}>
          {new Date(item.orderDate).toLocaleDateString()}
        </Text>

        <View style={styles.divider} />

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Payment</Text>
          <Text style={styles.detailValue}>{item.paymentMethod}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Total</Text>
          <Text style={styles.total}>₹{item.totalAmount}</Text>
        </View>
      </Pressable>
    );
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
      <Text style={styles.title}>My Orders</Text>
      <Text style={styles.subtitle}>
        Review your recent purchases and order status.
      </Text>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderOrder}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No orders found</Text>
            <Text style={styles.emptyText}>
              Your completed orders will appear here.
            </Text>
          </View>
        }
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
  list: {
    paddingBottom: SPACING.lg,
  },
  card: {
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.surface,
    ...SHADOW.card,
  },
  cardPressed: {
    opacity: 0.8,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: SPACING.sm,
  },
  orderId: {
    ...TYPOGRAPHY.title,
    flex: 1,
    color: COLORS.text,
  },
  status: {
    ...TYPOGRAPHY.label,
    color: COLORS.success,
    textTransform: "capitalize",
  },
  date: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  divider: {
    height: 1,
    marginVertical: SPACING.md,
    backgroundColor: COLORS.divider,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SPACING.xs,
  },
  detailLabel: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  },
  detailValue: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.text,
  },
  total: {
    ...TYPOGRAPHY.price,
    color: COLORS.primary,
  },
  emptyState: {
    alignItems: "center",
    paddingTop: SPACING.xxl,
  },
  emptyTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  emptyText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  refreshButton: {
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.lg,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.primary,
    ...SHADOW.button,
  },
  refreshButtonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.surface,
  },
  buttonPressed: {
    backgroundColor: COLORS.primaryDark,
  },
});
