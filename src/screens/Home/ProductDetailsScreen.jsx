import React, {useEffect} from 'react'
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import { COLORS } from '../../theme/colors';
import TYPOGRAPHY from '../../theme/typography';
import { SPACING } from '../../theme/spacing';
import { SHADOW } from '../../theme/shadows';
import { RADIUS } from '../../theme/radius';
import { addToCart } from '../../store/slices/cartSlice';

import { setReviews, setLoading, setError } from '../../store/slices/reviewSlice';
import { getReviewsByProduct } from '../../api/reviewApi';
import ReviewCard from '../../components/common/ReviewCard';
export default function ProductDetailsScreen({ route }) {
  const { product } = route.params;

  const dispatch = useDispatch();

  const { reviews, loading } = useSelector((state) => state.reviews);
    console.log("Selected product:", product);
    console.log("Selected product id:", product.id);
    console.log("Type:", typeof product.id);

  useEffect(() => {
    loadReviews();
  }, []);
  const loadReviews = async () => {
  try {
    dispatch(setLoading(true));

    const data = await getReviewsByProduct(product.id);

    console.log("Received reviews:", data);

    dispatch(setReviews(data));
  } catch (error) {
    console.log("loadReviews:", error);

    dispatch(setError(error.message));
  }
};

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : product.rating;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={{ uri: product.thumbnail }}
          style={styles.image}
          resizeMode="contain"
        />

        <View style={styles.content}>
          <Text style={styles.category}>{product.category}</Text>

          <Text style={styles.title}>{product.name}</Text>

          <Text style={styles.price}>₹{product.price}</Text>

          <Text style={styles.rating}>
            ⭐ {averageRating} ({reviews.length} Reviews)
          </Text>

          <Text style={styles.heading}>Description</Text>

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

          <Text style={styles.reviewHeading}>
            Customer Reviews
          </Text>

          {loading ? (
            <ActivityIndicator
              size="large"
              color={COLORS.primary}
              style={{ marginTop: SPACING.lg }}
            />
          ) : reviews.length === 0 ? (
            <Text style={styles.noReviews}>
              No reviews yet.
            </Text>
          ) : (
            reviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
              />
            ))
          )}
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
    color: COLORS.text,
    marginBottom: SPACING.lg,
  },

  heading: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },

  description: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xl,
    lineHeight: 22,
  },

  button: {
    height: 48,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.xl,
    ...SHADOW.button,
  },

  buttonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.surface,
  },

  reviewHeading: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },

  noReviews: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginVertical: SPACING.lg,
  },
});