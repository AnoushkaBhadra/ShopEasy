import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { useDispatch } from "react-redux";

import ProductDetailsScreen from "./ProductDetailsScreen";
import { addToCart } from "../../store/slices/cartSlice";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

describe("ProductDetailsScreen", () => {
  const dispatch = jest.fn();
  const product = {
    id: 1,
    title: "Wireless Headphones",
    category: "Electronics",
    price: 2500,
    rating: 4.5,
    description: "Noise cancelling headphones.",
    thumbnail: "https://example.com/headphones.png",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useDispatch.mockReturnValue(dispatch);
  });

  it("renders product details from route params", async () => {
    // Verifies the screen displays the selected product details.
    const { getByText } = await render(
      <ProductDetailsScreen route={{ params: { product } }} />
    );

    await waitFor(() => {
      expect(getByText(product.category)).toBeTruthy();
      expect(getByText(product.title)).toBeTruthy();
      expect(getByText(/2500/)).toBeTruthy();
      expect(getByText(/4.5/)).toBeTruthy();
      expect(getByText(product.description)).toBeTruthy();
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
