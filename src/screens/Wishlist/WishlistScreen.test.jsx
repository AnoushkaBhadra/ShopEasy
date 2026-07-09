import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { useDispatch, useSelector } from "react-redux";

import WishlistScreen from "./WishlistScreen";
import { toggleWishlist } from "../../store/slices/wishlistSlice";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("../../components/product/ProductCard", () => ({
  __esModule: true,
  default: ({ product, onPress, onWishlist, isLiked }) => {
    const React = require("react");
    const { Pressable, Text } = require("react-native");

    return React.createElement(
      React.Fragment,
      null,
      React.createElement(
        Pressable,
        { onPress: () => onPress(product) },
        React.createElement(Text, null, product.name)
      ),
      React.createElement(Text, null, isLiked ? "Liked" : "Not liked"),
      React.createElement(
        Pressable,
        { onPress: () => onWishlist(product) },
        React.createElement(Text, null, `Remove wishlist ${product.id}`)
      )
    );
  },
}));

describe("WishlistScreen", () => {
  const dispatch = jest.fn();
  const navigation = {
    navigate: jest.fn(),
  };
  const wishlist = [
    {
      id: 1,
      name: "Wireless Headphones",
      category: "Electronics",
      price: 2500,
      rating: 4.5,
      thumbnail: "https://example.com/headphones.png",
    },
  ];

  const setWishlist = (items) => {
    useSelector.mockImplementation((selector) =>
      selector({ wishlist: { items } })
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useDispatch.mockReturnValue(dispatch);
  });

  it("renders an empty wishlist state", async () => {
    // Verifies empty wishlist messaging appears when no items are saved.
    setWishlist([]);

    const { getByText } = await render(
      <WishlistScreen navigation={navigation} />
    );

    expect(getByText("Your wishlist is empty")).toBeTruthy();
    expect(
      getByText("Save products here to find them again quickly.")
    ).toBeTruthy();
  });

  it("renders wishlist products", async () => {
    // Verifies saved products are rendered in the wishlist.
    setWishlist(wishlist);

    const { getByText } = await render(
      <WishlistScreen navigation={navigation} />
    );

    expect(getByText("Wishlist")).toBeTruthy();
    expect(getByText(wishlist[0].name)).toBeTruthy();
    expect(getByText("Liked")).toBeTruthy();
  });

  it("navigates to product details when a wishlist item is pressed", async () => {
    // Verifies selecting a wishlist item opens product details.
    setWishlist(wishlist);

    const { getByText } = await render(
      <WishlistScreen navigation={navigation} />
    );

    await fireEvent.press(getByText(wishlist[0].name));

    expect(navigation.navigate).toHaveBeenCalledWith("Product Details", {
      product: wishlist[0],
    });
  });

  it("dispatches toggleWishlist when removing a wishlist item", async () => {
    // Verifies wishlist removal uses the slice action.
    setWishlist(wishlist);

    const { getByText } = await render(
      <WishlistScreen navigation={navigation} />
    );

    await fireEvent.press(getByText("Remove wishlist 1"));

    expect(dispatch).toHaveBeenCalledWith(toggleWishlist(wishlist[0]));
  });
});
