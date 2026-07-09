import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

import ProductCard from "./ProductCard";

jest.mock("@expo/vector-icons", () => ({
  MaterialCommunityIcons: ({ name }) => {
    const { Text } = require("react-native");
    return <Text>{name}</Text>;
  },
}));

describe("ProductCard", () => {
  const product = {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 2500,
    rating: 4.5,
    thumbnail: "https://example.com/headphones.png",
  };

  it("renders product details from props", async () => {
    // Verifies the card displays the product name, category, price, and rating.
    const { getByText } = await render(
      <ProductCard
        product={product}
        isLiked={false}
        onPress={jest.fn()}
        onWishlist={jest.fn()}
      />
    );

    await waitFor(() => {
      expect(getByText(product.name)).toBeTruthy();
      expect(getByText(product.category)).toBeTruthy();
      expect(getByText(/2,500/)).toBeTruthy();
      expect(getByText(String(product.rating))).toBeTruthy();
    });
  });

  it("calls onPress with the product when the card is pressed", async () => {
    // Verifies pressing the card forwards the product to the parent callback.
    const onPress = jest.fn();
    const { getByText } = await render(
      <ProductCard
        product={product}
        isLiked={false}
        onPress={onPress}
        onWishlist={jest.fn()}
      />
    );

    await fireEvent.press(getByText(product.name));

    expect(onPress).toHaveBeenCalledTimes(1);
    expect(onPress).toHaveBeenCalledWith(product);
  });

  it("calls onWishlist with the product when the wishlist button is pressed", async () => {
    // Verifies pressing the wishlist control forwards the product.
    const onWishlist = jest.fn();
    const { getByText } = await render(
      <ProductCard
        product={product}
        isLiked={false}
        onPress={jest.fn()}
        onWishlist={onWishlist}
      />
    );

    await fireEvent.press(getByText("heart-outline"));

    expect(onWishlist).toHaveBeenCalledTimes(1);
    expect(onWishlist).toHaveBeenCalledWith(product);
  });

  it("renders the filled heart icon when the product is liked", async () => {
    // Verifies liked state is passed through to the wishlist button.
    const { getByText, queryByText } = await render(
      <ProductCard
        product={product}
        isLiked
        onPress={jest.fn()}
        onWishlist={jest.fn()}
      />
    );

    await waitFor(() => {
      expect(getByText("heart")).toBeTruthy();
      expect(queryByText("heart-outline")).toBeNull();
    });
  });
});
