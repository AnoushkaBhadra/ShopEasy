import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { useDispatch, useSelector } from "react-redux";

import CartScreen from "./CartScreen";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../../store/slices/cartSlice";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("../../components/cart/CartItem", () => ({
  __esModule: true,
  default: ({ item, onIncrease, onDecrease, onRemove }) => {
    const React = require("react");
    const { Pressable, Text } = require("react-native");

    return React.createElement(
      React.Fragment,
      null,
      React.createElement(Text, null, item.name),
      React.createElement(
        Pressable,
        { onPress: onIncrease },
        React.createElement(Text, null, `Increase ${item.id}`)
      ),
      React.createElement(
        Pressable,
        { onPress: onDecrease },
        React.createElement(Text, null, `Decrease ${item.id}`)
      ),
      React.createElement(
        Pressable,
        { onPress: onRemove },
        React.createElement(Text, null, `Remove ${item.id}`)
      )
    );
  },
}));

describe("CartScreen", () => {
  const dispatch = jest.fn();
  const navigation = {
    navigate: jest.fn(),
  };

  const cartItems = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 2500,
      quantity: 2,
    },
  ];

  const setMockState = (cart) => {
    useSelector.mockImplementation((selector) =>
      selector({ cart })
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useDispatch.mockReturnValue(dispatch);
  });

  it("renders an empty cart state", async () => {
    // Verifies empty cart messaging is shown when there are no items.
    setMockState({ items: [], total: 0 });

    const { getByText } = await render(
      <CartScreen navigation={navigation} />
    );

    expect(getByText("Your cart is empty")).toBeTruthy();
    expect(getByText("Browse products and add items to your cart.")).toBeTruthy();
  });

  it("renders cart items and the summary total", async () => {
    // Verifies cart items, delivery fee, and total are displayed.
    setMockState({ items: cartItems, total: 5000 });

    const { getByText, getAllByText } = await render(
      <CartScreen navigation={navigation} />
    );

    await waitFor(() => {
      expect(getByText("Wireless Headphones")).toBeTruthy();
      expect(getByText(/5000/)).toBeTruthy();
      expect(getAllByText(/99/).length).toBeGreaterThan(0);
      expect(getByText(/5099/)).toBeTruthy();
    });
  });

  it("dispatches quantity and remove actions from cart item callbacks", async () => {
    // Verifies cart row actions dispatch the correct Redux actions.
    setMockState({ items: cartItems, total: 5000 });

    const { getByText } = await render(
      <CartScreen navigation={navigation} />
    );

    await fireEvent.press(getByText("Increase 1"));
    await fireEvent.press(getByText("Decrease 1"));
    await fireEvent.press(getByText("Remove 1"));

    expect(dispatch).toHaveBeenCalledWith(increaseQuantity(1));
    expect(dispatch).toHaveBeenCalledWith(decreaseQuantity(1));
    expect(dispatch).toHaveBeenCalledWith(removeFromCart(1));
  });

  it("navigates to saved addresses in selection mode during checkout", async () => {
    // Verifies checkout continues into address selection.
    setMockState({ items: cartItems, total: 5000 });

    const { getByText } = await render(
      <CartScreen navigation={navigation} />
    );

    await fireEvent.press(getByText("Proceed to Checkout"));

    expect(navigation.navigate).toHaveBeenCalledWith("Saved Addresses", {
      selectionMode: true,
    });
  });
});
