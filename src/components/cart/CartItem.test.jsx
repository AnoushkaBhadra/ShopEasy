import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

import CartItem from "./CartItem";

jest.mock("@expo/vector-icons", () => ({
  Ionicons: ({ name }) => {
    const { Text } = require("react-native");
    return <Text>{name}</Text>;
  },
}));

describe("CartItem", () => {
  const item = {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 2500,
    quantity: 2,
    thumbnail: "https://example.com/headphones.png",
  };

  it("renders cart item details from props", async () => {
    // Verifies the row displays product details and quantity.
    const { getByText } = await render(
      <CartItem
        item={item}
        onIncrease={jest.fn()}
        onDecrease={jest.fn()}
        onRemove={jest.fn()}
      />
    );

    await waitFor(() => {
      expect(getByText(item.name)).toBeTruthy();
      expect(getByText(item.category)).toBeTruthy();
      expect(getByText(/2500/)).toBeTruthy();
      expect(getByText(String(item.quantity))).toBeTruthy();
    });
  });

  it("calls onDecrease with the item when the decrease button is pressed", async () => {
    // Verifies the decrease quantity control invokes the expected callback.
    const onDecrease = jest.fn();
    const { getByText } = await render(
      <CartItem
        item={item}
        onIncrease={jest.fn()}
        onDecrease={onDecrease}
        onRemove={jest.fn()}
      />
    );

    await fireEvent.press(getByText("remove"));

    expect(onDecrease).toHaveBeenCalledTimes(1);
    expect(onDecrease).toHaveBeenCalledWith(item);
  });

  it("calls onIncrease with the item when the increase button is pressed", async () => {
    // Verifies the increase quantity control invokes the expected callback.
    const onIncrease = jest.fn();
    const { getByText } = await render(
      <CartItem
        item={item}
        onIncrease={onIncrease}
        onDecrease={jest.fn()}
        onRemove={jest.fn()}
      />
    );

    await fireEvent.press(getByText("add"));

    expect(onIncrease).toHaveBeenCalledTimes(1);
    expect(onIncrease).toHaveBeenCalledWith(item);
  });

  it("calls onRemove with the item when the delete button is pressed", async () => {
    // Verifies the remove control invokes the expected callback.
    const onRemove = jest.fn();
    const { getByText } = await render(
      <CartItem
        item={item}
        onIncrease={jest.fn()}
        onDecrease={jest.fn()}
        onRemove={onRemove}
      />
    );

    await fireEvent.press(getByText("trash-outline"));

    expect(onRemove).toHaveBeenCalledTimes(1);
    expect(onRemove).toHaveBeenCalledWith(item);
  });
});
