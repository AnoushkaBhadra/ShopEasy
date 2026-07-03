import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


import { COLORS } from "../../theme/colors";
import { SPACING } from "../../theme/spacing";

import HomeHeader from "../../components/layout/HomeHeader";
import SearchBar from "../../components/search/SearchBar";
import CategoryList from "../../components/layout/CategoryList";
import ProductCard from "../../components/product/ProductCard";

export default function HomeScreen() {
    const [search, setSearch] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = [
        "All",
        "Electronics",
        "Fashion",
        "Beauty",
        "Sports",
        "Books",
    ];

    const products = [
        {
            id: 1,
            name: "Wireless Headphones",
            category: "Electronics",
            price: 12999,
            rating: 4.8,
            liked: false,
            image: "https://picsum.photos/400?1",
        },
        {
            id: 2,
            name: "Smart Watch",
            category: "Electronics",
            price: 8999,
            rating: 4.6,
            liked: false,
            image: "https://picsum.photos/400?2",
        },
        {
            id: 3,
            name: "Leather Backpack",
            category: "Fashion",
            price: 3499,
            rating: 4.4,
            liked: false,
            image: "https://picsum.photos/400?3",
        },
        {
            id: 4,
            name: "Coffee Mug",
            category: "Home",
            price: 499,
            rating: 4.9,
            liked: false,
            image: "https://picsum.photos/400?4",
        },
    ];

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });
   return (
        <SafeAreaView style={styles.container}>
            <HomeHeader
                onProfilePress={() => navigation.navigate("Profile")}
            />

            <SearchBar
                value={search}
                onChangeText={setSearch}
            />

            <CategoryList
                categories={categories}
                selected={selectedCategory}
                onSelect={setSelectedCategory}
            />

            <FlatList
                data={filteredProducts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ProductCard
                        product={item}
                        onPress={(product) =>
                            navigation.navigate("ProductDetails", { product })
                        }
                        onWishlist={(product) =>
                            console.log("Wishlist:", product.id)
                        }
                    />
                )}
                numColumns={2}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
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

    list: {
        paddingBottom: SPACING.xxl,
    },
});