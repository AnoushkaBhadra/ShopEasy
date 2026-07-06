import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { ActivityIndicator } from "react-native";
import { COLORS } from "../../theme/colors";
import { SPACING } from "../../theme/spacing";

import HomeHeader from "../../components/layout/HomeHeader";
import SearchBar from "../../components/search/SearchBar";
import CategoryList from "../../components/layout/CategoryList";
import ProductCard from "../../components/product/ProductCard";

import { getProducts } from "../../api/productApi";
import { toggleWishlist } from "../../store/slices/wishlistSlice";
import {setLoading, setProducts,searchProducts,filterProducts,setError} from "../../store/slices/productSlice";
import { addToCart } from "../../store/slices/cartSlice";

export default function HomeScreen({ navigation }) {
    const dispatch = useDispatch();

    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");


    const { products, filteredProducts, loading, error } = useSelector(
        (state) => state.products
    );
    console.log(useSelector(state => state.products));

    const wishlist = useSelector(state => state.wishlist.items);

    const categories = [ "All", ...new Set(products.map((product)=> product.category))]; 
    useEffect(() => {
        const fetchProducts = async () => {
            dispatch(setLoading(true));
            console.log("Fetching products...");
            console.time("Fetch products");

            try {
                const products = await getProducts();
                console.timeEnd("Fetch Products");
                console.log("Products received:", products.length);

                dispatch(setProducts(products));
            } catch (err) {
                dispatch(setError(err.message));
            }
        };

        fetchProducts();
    }, [dispatch]);

    const handleSearch = (text) => {
        setSearch(text);
        dispatch(searchProducts(text));
    };

    console.log("Categories:", categories);
    const handleCategory = (category) => {
        setSelectedCategory(category);
        dispatch(filterProducts(category));
    };

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size="large" />
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <Text>{error}</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <HomeHeader
                onProfilePress={() => navigation.navigate("Profile")}
                onCartPress={() => navigation.navigate("Cart")}
            />

            <SearchBar
                value={search}
                onChangeText={handleSearch}
            />
            <View>
            <CategoryList
                categories={categories}
                selected={selectedCategory}
                onSelect={handleCategory}
            />
            </View>
            
            <FlatList
                
                data={filteredProducts}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <ProductCard
                        product={item}
                        isLiked={wishlist.some(product => product.id === item.id)}
                        onPress={() =>
                            navigation.navigate("ProductDetails", {
                                product: item,
                            })
                        }
                        onWishlist={(product) => dispatch(toggleWishlist(product))}
                        onAddToCart={() => handleAddToCart(item)}
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

    list: {
        paddingBottom: SPACING.xxl,
    },
});