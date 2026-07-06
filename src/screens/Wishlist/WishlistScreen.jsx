
import React from "react";
import {View,Text,FlatList,StyleSheet,} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import ProductCard from "../../components/product/ProductCard";

import { toggleWishlist } from "../../store/slices/wishlistSlice";

import { COLORS } from "../../theme/colors";
import { SPACING } from "../../theme/spacing";
import TYPOGRAPHY from "../../theme/typography";

export default function WishlistScreen({ navigation }) {
    const dispatch = useDispatch();

    const wishlist = useSelector(
        state => state.wishlist.items
    );

    if (wishlist.length === 0) {
        return (
            <SafeAreaView style={styles.center}>
                <Text style={styles.emptyTitle}>Your wishlist is empty</Text>
                <Text style={styles.emptyText}>
                    Save products here to find them again quickly.
                </Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Wishlist</Text>
            <FlatList
                data={wishlist}
                keyExtractor={item => item.id.toString()}
                numColumns={2}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <ProductCard
                        product={item}
                        isLiked={true}
                        onPress={() =>
                            navigation.navigate(
                                "Product Details",
                                { product: item }
                            )
                        }
                        onWishlist={() =>
                            dispatch(toggleWishlist(item))
                        }
                    />
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingHorizontal: SPACING.lg,
    },

    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: SPACING.lg,
        backgroundColor: COLORS.background,
    },

    title: {
        ...TYPOGRAPHY.h1,
        color: COLORS.text,
        marginTop: SPACING.md,
        marginBottom: SPACING.lg,
    },

    list: {
        paddingBottom: SPACING.xxl,
    },

    emptyTitle: {
        ...TYPOGRAPHY.h2,
        color: COLORS.text,
        marginBottom: SPACING.sm,
        textAlign: "center",
    },

    emptyText: {
        ...TYPOGRAPHY.body,
        color: COLORS.textSecondary,
        textAlign: "center",
    },
});
