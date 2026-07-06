import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

import { COLORS } from '../../theme/colors';
import TYPOGRAPHY from '../../theme/typography';
import { SPACING } from '../../theme/spacing';
import { SHADOW } from '../../theme/shadows';
import { RADIUS } from '../../theme/radius';
import { addToCart } from '../../store/slices/cartSlice';



export default function ProductDetailsScreen({ route }) {
    const { product } = route.params;

    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart(product));
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image
                    source={{ uri: product.thumbnail }}
                    style={styles.image}
                    resizeMode="contain"
                />

                <View style={styles.content}>
                    <Text style={styles.category}>
                        {product.category}
                    </Text>

                    <Text style={styles.title}>
                        {product.title}
                    </Text>

                    <Text style={styles.price}>
                        ₹{product.price}
                    </Text>

                    <Text style={styles.rating}>
                        ⭐ {product.rating}
                    </Text>

                    <Text style={styles.heading}>
                        Description
                    </Text>

                    <Text style={styles.description}>
                        {product.description}
                    </Text>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleAddToCart}
                    >
                        <Text style={styles.buttonText}>
                            Add to Cart
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    image: {
        width: "100%",
        height: 320,
        backgroundColor: COLORS.surface,
    },

    content: {
        padding: SPACING.lg,
        backgroundColor: COLORS.background,
    },

    category: {
        ...TYPOGRAPHY.label,
        color: COLORS.primary,
        marginBottom: SPACING.xs,
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },

    title: {
        ...TYPOGRAPHY.h2,
        color: COLORS.text,
        marginBottom: SPACING.sm,
    },

    price: {
        ...TYPOGRAPHY.price,
        color: COLORS.primary,
        marginBottom: SPACING.sm,
    },

    rating: {
        ...TYPOGRAPHY.body,
        marginBottom: SPACING.lg,
        color: COLORS.text,
    },

    heading: {
        ...TYPOGRAPHY.h3,
        marginBottom: SPACING.sm,
        color: COLORS.text,
    },

    description: {
        ...TYPOGRAPHY.body,
        color: COLORS.textSecondary,
        marginBottom: SPACING.xl,
    },

    button: {
        height: 48,
        backgroundColor: COLORS.primary,
        borderRadius: RADIUS.md,
        justifyContent: "center",
        alignItems: "center",
        ...SHADOW.button,
    },

    buttonText: {
        ...TYPOGRAPHY.button,
        color: COLORS.surface,
    },
});
