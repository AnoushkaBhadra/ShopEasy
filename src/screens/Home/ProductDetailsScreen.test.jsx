import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { useDispatch, useSelector } from "react-redux";

import ProductDetailsScreen from "./ProductDetailsScreen";
import { addToCart } from "../../store/slices/cartSlice";
import {
  setReviews,
  setLoading as setReviewsLoading,
} from "../../store/slices/reviewSlice";
import { getReviewsByProduct } from "../../api/reviewApi";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("../../api/reviewApi", () => ({
  getReviewsByProduct: jest.fn(),
}));

describe("ProductDetailsScreen", () => {
  const dispatch = jest.fn();
  const product = {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 2500,
    rating: 4.5,
    description: "Noise cancelling headphones.",
    thumbnail: "https://example.com/headphones.png",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useDispatch.mockReturnValue(dispatch);
    useSelector.mockImplementation((selector) =>
      selector({
        reviews: {
          reviews: [],
          loading: false,
          error: null,
        },
      })
    );
    getReviewsByProduct.mockResolvedValue([]);
  });

  it("renders product details from route params", async () => {
    // Verifies the screen displays the selected product details.
    const { getByText } = await render(
      <ProductDetailsScreen route={{ params: { product } }} />
    );

    await waitFor(() => {
      expect(getByText(product.category)).toBeTruthy();
      expect(getByText(product.name)).toBeTruthy();
      expect(getByText(/2500/)).toBeTruthy();
      expect(getByText(/4.5/)).toBeTruthy();
      expect(getByText(product.description)).toBeTruthy();
      expect(dispatch).toHaveBeenCalledWith(setReviewsLoading(true));
      expect(getReviewsByProduct).toHaveBeenCalledWith(product.id);
      expect(dispatch).toHaveBeenCalledWith(setReviews([]));
    });
  });

  it("dispatches addToCart when Add to Cart is pressed", async () => {
    // Verifies the add-to-cart action is dispatched with the selected product.
    const { getByText } = await render(
      <ProductDetailsScreen route={{ params: { product } }} />
    );

    await fireEvent.press(getByText("Add to Cart"));

    expect(dispatch).toHaveBeenCalledWith(addToCart(product));
  });
});
