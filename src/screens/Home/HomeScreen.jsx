import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  ActivityIndicator,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import { COLORS } from "../../theme/colors";
import { SPACING } from "../../theme/spacing";

import HomeHeader from "../../components/layout/HomeHeader";
import SearchBar from "../../components/search/SearchBar";
import CategoryList from "../../components/layout/CategoryList";
import ProductCard from "../../components/product/ProductCard";

import { getProducts } from "../../api/productApi";
import { toggleWishlist } from "../../store/slices/wishlistSlice";
import {  setLoading,setProducts,searchProducts,filterProducts,setError,} from "../../store/slices/productSlice";
import { addToCart } from "../../store/slices/cartSlice";

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const {
    products,
    filteredProducts,
    loading,
    error,
  } = useSelector((state) => state.products);

  const wishlist = useSelector(
    (state) => state.wishlist.items
  );

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(setLoading(true));

      try {
        const products = await getProducts();
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
        <ActivityIndicator
          size={Platform.OS === "ios" ? "large" : "large"}
          color={COLORS.primary}
        />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader />

      <SearchBar
        value={search}
        onChangeText={handleSearch}
      />

      <View style={styles.categoryContainer}>
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
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        keyboardShouldPersistTaps="handled"
        removeClippedSubviews={Platform.OS === "android"}
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        windowSize={7}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            isLiked={wishlist.some(
              (product) => product.id === item.id
            )}
            onPress={() =>
              navigation.navigate("ProductDetails", {
                product: item,
              })
            }
            onWishlist={(product) =>
              dispatch(toggleWishlist(product))
            }
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
    paddingHorizontal:
      Platform.OS === "ios"
        ? SPACING.xl
        : SPACING.lg,
  },

  categoryContainer: {
    marginBottom:
      Platform.OS === "ios"
        ? SPACING.md
        : SPACING.sm,
  },

  list: {
    paddingBottom:
      Platform.OS === "ios"
        ? SPACING.xxxl
        : SPACING.xxl,
    paddingTop: SPACING.xs,
  },

  row: {
    justifyContent: "space-between",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },

  errorText: {
    color: COLORS.error,
    textAlign: "center",
  },
});