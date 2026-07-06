
import React from "react";
import {View,Text,FlatList,StyleSheet,} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import ProductCard from "../../components/product/ProductCard";

import { toggleWishlist } from "../../store/slices/wishlistSlice";

import { COLORS } from "../../theme/colors";
import { SPACING } from "../../theme/spacing";

export default function WishlistScreen({ navigation }) {
    const dispatch = useDispatch();

    const wishlist = useSelector(
        state => state.wishlist.items
    );

    if (wishlist.length === 0) {
        return (
            <SafeAreaView style={styles.center}>
                <Text>Your wishlist is empty.</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={wishlist}
                keyExtractor={item => item.id.toString()}
                numColumns={2}
                renderItem={({ item }) => (
                    <ProductCard
                        product={item}
                        isLiked={true}
                        onPress={() =>
                            navigation.navigate(
                                "ProductDetails",
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
        padding: SPACING.md,
    },

    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});