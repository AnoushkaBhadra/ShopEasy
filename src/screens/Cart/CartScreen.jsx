import React from 'react'; 
import { View, Text, FlatList, StyleSheet, Pressable} from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CartItem from '../../components/cart/CartItem';

import { COLORS } from '../../theme/colors';
import TYPOGRAPHY from '../../theme/typography';
import { SPACING } from '../../theme/spacing';
import { SHADOW } from '../../theme/shadows';

export default function CartScreen({navigation}) {
  const [cartItems, setCartItems] = useState([
    {
            id: 1,
            name: "Wireless Headphones",
            category: "Electronics",
            price: 2999,
            quantity: 1,
            image: "https://picsum.photos/300?1",
        },
        {
            id: 2,
            name: "Smart Watch",
            category: "Electronics",
            price: 4999,
            quantity: 2,
            image: "https://picsum.photos/300?2",
        },
  ])

  const increaseQuantity = (item) => {
        setCartItems((prev) =>
            prev.map((product) =>
                product.id === item.id
                    ? { ...product, quantity: product.quantity + 1 }
                    : product
            )
        );
    };

    const decreaseQuantity = (item) => {
        setCartItems((prev) =>
            prev.map((product) =>
                product.id === item.id && product.quantity > 1
                    ? { ...product, quantity: product.quantity - 1 }
                    : product
            )
        );
    };

    const removeItem = (item) => {
        setCartItems((prev) =>
            prev.filter((product) => product.id !== item.id)
        );
    };

    const subtotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const delivery = subtotal > 0 ? 99 : 0;

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
                        onIncrease={increaseQuantity}
                        onDecrease={decreaseQuantity}
                        onRemove={removeItem}
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
                            navigation.navigate("Address Selection")
                        }
                    >
                        <Text style={styles.checkoutText}>
                            Proceed to Checkout
                        </Text>
                    </Pressable>
                </View>
            )}
        </SafeAreaView>
  )
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