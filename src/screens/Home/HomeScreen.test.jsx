import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { useDispatch, useSelector } from "react-redux";

import HomeScreen from "./HomeScreen";
import { getProducts } from "../../api/productApi";
import {
  setLoading,
  setProducts,
  searchProducts,
  filterProducts,
  setError,
} from "../../store/slices/productSlice";
import { toggleWishlist } from "../../store/slices/wishlistSlice";

jest.mock("react-native", () => {
  const React = require("react");
  const RN = jest.requireActual("react-native");

  return new Proxy(RN, {
    get(target, prop) {
      if (prop === "ActivityIndicator") {
        return (props) =>
          React.createElement(target.Text, props, "Loading products");
      }

      return target[prop];
    },
  });
});

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("../../api/productApi", () => ({
  getProducts: jest.fn(),
}));

jest.mock("../../components/layout/HomeHeader", () => () => {
  const React = require("react");
  const { Text } = require("react-native");

  return React.createElement(Text, null, "Mock Home Header");
});

jest.mock("../../components/search/SearchBar", () => ({
  __esModule: true,
  default: ({ value, onChangeText }) => {
    const React = require("react");
    const { TextInput } = require("react-native");

    return React.createElement(TextInput, {
      placeholder: "Search products...",
      value,
      onChangeText,
    }
    );
  },
}));

jest.mock("../../components/layout/CategoryList", () => ({
  __esModule: true,
  default: ({ categories, onSelect }) => {
    const React = require("react");
    const { Pressable, Text } = require("react-native");

    return React.createElement(
      React.Fragment,
      null,
      categories.map((category) =>
        React.createElement(
          Pressable,
          {
            key: category,
            onPress: () => onSelect(category),
          },
          React.createElement(Text, null, category)
        )
      )
    );
  },
}));

jest.mock("../../components/product/ProductCard", () => ({
  __esModule: true,
  default: ({ product, onPress, onWishlist, isLiked }) => {
    const React = require("react");
    const { Pressable, Text } = require("react-native");

    return React.createElement(
      Pressable,
      { onPress: () => onPress(product) },
      React.createElement(Text, null, product.name),
      React.createElement(Text, null, isLiked ? "Liked" : "Not liked"),
      React.createElement(
        Pressable,
        { onPress: () => onWishlist(product) },
        React.createElement(Text, null, `Wishlist ${product.id}`)
      )
    );
  },
}));

describe("HomeScreen", () => {
  const dispatch = jest.fn();
  const navigation = {
    navigate: jest.fn(),
  };

  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      category: "Electronics",
      price: 2500,
      rating: 4.5,
      thumbnail: "https://example.com/headphones.png",
    },
    {
      id: 2,
      name: "Coffee Mug",
      category: "Kitchen",
      price: 300,
      rating: 4,
      thumbnail: "https://example.com/mug.png",
    },
  ];

  const setMockState = (state) => {
    useSelector.mockImplementation((selector) => selector(state));
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useDispatch.mockReturnValue(dispatch);
    setMockState({
      products: {
        products,
        filteredProducts: products,
        loading: false,
        error: "",
      },
      wishlist: {
        items: [products[0]],
      },
    });
  });

  it("fetches products on mount and dispatches product state updates", async () => {
    // Verifies initial product loading calls the API and stores results.
    getProducts.mockResolvedValueOnce(products);

    await render(<HomeScreen navigation={navigation} />);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith(setLoading(true));
      expect(getProducts).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith(setProducts(products));
    });
  });

  it("dispatches an error when product fetching fails", async () => {
    // Verifies failed product loading is represented in Redux.
    getProducts.mockRejectedValueOnce(new Error("Network error"));

    await render(<HomeScreen navigation={navigation} />);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith(setError("Network error"));
    });
  });

  it("renders a loading state", async () => {
    // Verifies the screen shows loading UI while products are loading.
    setMockState({
      products: {
        products: [],
        filteredProducts: [],
        loading: true,
        error: "",
      },
      wishlist: { items: [] },
    });

    const { getByText } = await render(
      <HomeScreen navigation={navigation} />
    );

    expect(getByText("Loading products")).toBeTruthy();
  });

  it("renders an error state", async () => {
    // Verifies product loading errors are displayed.
    setMockState({
      products: {
        products: [],
        filteredProducts: [],
        loading: false,
        error: "Network error",
      },
      wishlist: { items: [] },
    });

    const { getByText } = await render(
      <HomeScreen navigation={navigation} />
    );

    expect(getByText("Network error")).toBeTruthy();
  });

  it("dispatches search and category actions from user interactions", async () => {
    // Verifies search input and category taps dispatch product filters.
    getProducts.mockResolvedValueOnce(products);
    const { getByPlaceholderText, getByText } = await render(
      <HomeScreen navigation={navigation} />
    );

    await fireEvent.changeText(
      getByPlaceholderText("Search products..."),
      "coffee"
    );
    await fireEvent.press(getByText("Kitchen"));

    expect(dispatch).toHaveBeenCalledWith(searchProducts("coffee"));
    expect(dispatch).toHaveBeenCalledWith(filterProducts("Kitchen"));
  });

  it("navigates to product details and toggles wishlist from product cards", async () => {
    // Verifies product card interactions call navigation and wishlist dispatch.
    getProducts.mockResolvedValueOnce(products);
    const { getByText } = await render(
      <HomeScreen navigation={navigation} />
    );

    await fireEvent.press(getByText(products[0].name));
    await fireEvent.press(getByText(`Wishlist ${products[1].id}`));

    expect(navigation.navigate).toHaveBeenCalledWith("ProductDetails", {
      product: products[0],
    });
    expect(dispatch).toHaveBeenCalledWith(toggleWishlist(products[1]));
  });
});
