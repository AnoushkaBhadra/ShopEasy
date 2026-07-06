import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";

import CartItem from "../../components/cart/CartItem";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../../store/slices/cartSlice";

import { COLORS } from "../../theme/colors";
import TYPOGRAPHY from "../../theme/typography";
import { SPACING } from "../../theme/spacing";
import { SHADOW } from "../../theme/shadows";

export default function CartScreen({ navigation }) {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const subtotal = useSelector((state) => state.cart.total);

  const delivery = cartItems.length > 0 ? 99 : 0;
  const total = subtotal + delivery;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Shopping Cart</Text>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onIncrease={() =>
              dispatch(increaseQuantity(item.id))
            }
            onDecrease={() =>
              dispatch(decreaseQuantity(item.id))
            }
            onRemove={() =>
              dispatch(removeFromCart(item.id))
            }
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>
              Your cart is empty
            </Text>

            <Text style={styles.emptyText}>
              Browse products and add items to your cart.
            </Text>
          </View>
        }
      />

      {cartItems.length > 0 && (
        <View style={styles.summary}>
          <View style={styles.row}>
            <Text style={styles.label}>Subtotal</Text>
            <Text style={styles.value}>₹{subtotal}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Delivery</Text>
            <Text style={styles.value}>₹{delivery}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.total}>₹{total}</Text>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.checkoutButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() =>
              navigation.navigate("Saved Addresses", {
                selectionMode: true,
              })
            }
          >
            <Text style={styles.checkoutText}>
              Proceed to Checkout
            </Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.lg,
  },

  title: {
    ...TYPOGRAPHY.h1,
    color: COLORS.text,
    marginTop: SPACING.md,
    marginBottom: SPACING.lg,
  },

  list: {
    paddingBottom: SPACING.lg,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },

  emptyTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },

  emptyText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    textAlign: "center",
  },

  summary: {
    borderTopWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.md,
    ...SHADOW.card,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SPACING.sm,
  },

  label: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },

  value: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginVertical: SPACING.md,
  },

  totalLabel: {
    ...TYPOGRAPHY.title,
    color: COLORS.text,
  },

  total: {
    ...TYPOGRAPHY.price,
    color: COLORS.primary,
  },

  checkoutButton: {
    height: 50,
    marginTop: SPACING.lg,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOW.button,
  },

  buttonPressed: {
    backgroundColor: COLORS.primaryDark,
  },

  checkoutText: {
    ...TYPOGRAPHY.button,
    color: COLORS.surface,
  },
});