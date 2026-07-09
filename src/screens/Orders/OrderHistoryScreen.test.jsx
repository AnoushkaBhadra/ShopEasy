import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { useSelector } from "react-redux";

import OrderHistoryScreen from "./OrderHistoryScreen";
import { getOrders } from "../../services/orderService";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

jest.mock("@react-navigation/native", () => ({
  useFocusEffect: (callback) => {
    const React = require("react");

    React.useEffect(() => {
      callback();
    }, [callback]);
  },
}));

jest.mock("../../services/orderService", () => ({
  getOrders: jest.fn(),
}));

describe("OrderHistoryScreen", () => {
  const navigation = {
    navigate: jest.fn(),
  };
  const user = {
    id: 10,
  };
  const orders = [
    {
      id: 5,
      userId: user.id,
      orderDate: "2026-07-08T10:00:00.000Z",
      status: "pending",
      paymentMethod: "COD",
      totalAmount: 2800,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    useSelector.mockImplementation((selector) =>
      selector({ auth: { user } })
    );
  });

  it("loads and renders the user's orders", async () => {
    // Verifies focused order history fetches and displays orders.
    getOrders.mockResolvedValueOnce(orders);

    const { findByText } = await render(
      <OrderHistoryScreen navigation={navigation} />
    );

    expect(await findByText("My Orders")).toBeTruthy();
    expect(await findByText("Order #5")).toBeTruthy();
    expect(await findByText("pending")).toBeTruthy();
    expect(getOrders).toHaveBeenCalledWith(user.id);
  });

  it("renders an empty order state", async () => {
    // Verifies no-order messaging appears for empty API responses.
    getOrders.mockResolvedValueOnce([]);

    const { findByText } = await render(
      <OrderHistoryScreen navigation={navigation} />
    );

    expect(await findByText("No orders found")).toBeTruthy();
    expect(
      await findByText("Your completed orders will appear here.")
    ).toBeTruthy();
  });

  it("navigates to order details when an order is pressed", async () => {
    // Verifies selecting an order opens its details screen.
    getOrders.mockResolvedValueOnce(orders);

    const { findByText } = await render(
      <OrderHistoryScreen navigation={navigation} />
    );

    await fireEvent.press(await findByText("Order #5"));

    expect(navigation.navigate).toHaveBeenCalledWith("Order", {
      orderId: 5,
    });
  });

  it("stops loading when fetching orders fails", async () => {
    // Verifies failures do not leave the screen stuck in loading state.
    getOrders.mockRejectedValueOnce(new Error("Network error"));

    const { findByText } = await render(
      <OrderHistoryScreen navigation={navigation} />
    );

    await waitFor(() => {
      expect(getOrders).toHaveBeenCalledWith(user.id);
    });
    expect(await findByText("No orders found")).toBeTruthy();
  });
});
