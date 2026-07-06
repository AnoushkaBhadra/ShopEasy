import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

import { COLORS } from '../../theme/colors';
import { SPACING } from '../../theme/spacing';
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
        backgroundColor: "#fff",
    },

    content: {
        padding: SPACING.lg,
    },

    category: {
        fontSize: 14,
        color: COLORS.gray,
        marginBottom: 8,
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: COLORS.text,
        marginBottom: 10,
    },

    price: {
        fontSize: 22,
        fontWeight: "bold",
        color: COLORS.primary,
        marginBottom: 10,
    },

    rating: {
        fontSize: 16,
        marginBottom: 20,
        color: COLORS.text,
    },

    heading: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 10,
        color: COLORS.text,
    },

    description: {
        fontSize: 15,
        lineHeight: 24,
        color: COLORS.text,
        marginBottom: 30,
    },

    button: {
        backgroundColor: COLORS.primary,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
    },

    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
