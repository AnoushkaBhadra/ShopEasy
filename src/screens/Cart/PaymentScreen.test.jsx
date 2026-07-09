import React from "react";
import { Alert } from "react-native";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { useDispatch, useSelector } from "react-redux";

import PaymentScreen from "./PaymentScreen";
import {
  createOrder,
  createOrderItems,
} from "../../services/orderService";
import { clearCart } from "../../store/slices/cartSlice";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("../../services/orderService", () => ({
  createOrder: jest.fn(),
  createOrderItems: jest.fn(),
}));

jest.mock("../../components/QRScanner", () => ({
  __esModule: true,
  default: ({ onQRScanned }) => {
    const React = require("react");
    const { Pressable, Text } = require("react-native");

    return React.createElement(
      Pressable,
      { onPress: () => onQRScanned(true) },
      React.createElement(Text, null, "Mock QR Scanner")
    );
  },
}));

describe("PaymentScreen", () => {
  const dispatch = jest.fn();
  const navigation = {
    replace: jest.fn(),
    goBack: jest.fn(),
  };
  const selectedAddress = {
    id: 3,
    label: "Home",
    addressLine: "123 Main Street",
    city: "Kolkata",
    state: "West Bengal",
    pincode: "700001",
  };
  const user = {
    id: 10,
    name: "Test User",
  };
  const cart = {
    total: 2800,
    items: [
      {
        id: 1,
        name: "Wireless Headphones",
        price: 2500,
        quantity: 1,
      },
      {
        id: 2,
        name: "Coffee Mug",
        price: 300,
        quantity: 1,
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useDispatch.mockReturnValue(dispatch);
    useSelector.mockImplementation((selector) =>
      selector({
        auth: { user },
        cart,
      })
    );
    jest.spyOn(Alert, "alert").mockImplementation(jest.fn());
  });

  afterEach(() => {
    Alert.alert.mockRestore();
  });

  it("renders delivery address and default payment method", async () => {
    // Verifies the screen shows address details and defaults to COD.
    const { getByText } = await render(
      <PaymentScreen
        navigation={navigation}
        route={{ params: { selectedAddress } }}
      />
    );

    expect(getByText("Payment")).toBeTruthy();
    expect(getByText(selectedAddress.label)).toBeTruthy();
    expect(getByText("Selected Payment Method: COD")).toBeTruthy();
  });

  it("places a COD order, creates order items, clears cart, and navigates", async () => {
    // Verifies the successful COD checkout workflow.
    createOrder.mockResolvedValueOnce({ id: 20 });
    createOrderItems.mockResolvedValueOnce([]);

    const { getByText } = await render(
      <PaymentScreen
        navigation={navigation}
        route={{ params: { selectedAddress } }}
      />
    );

    await fireEvent.press(getByText("Place Order"));

    await waitFor(() => {
      expect(createOrder).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: user.id,
          addressId: selectedAddress.id,
          totalAmount: cart.total,
          paymentMethod: "COD",
          paymentStatus: "pending",
        })
      );
      expect(createOrderItems).toHaveBeenCalledWith([
        {
          orderId: 20,
          productId: 1,
          productName: "Wireless Headphones",
          price: 2500,
          quantity: 1,
        },
        {
          orderId: 20,
          productId: 2,
          productName: "Coffee Mug",
          price: 300,
          quantity: 1,
        },
      ]);
      expect(dispatch).toHaveBeenCalledWith(clearCart());
      expect(navigation.replace).toHaveBeenCalledWith(
        "Order Confirmation",
        { orderId: 20 }
      );
    });
  });

  it("requires QR scanning before placing a UPI order", async () => {
    // Verifies UPI orders are blocked until QR payment is completed.
    const { getByText } = await render(
      <PaymentScreen
        navigation={navigation}
        route={{ params: { selectedAddress } }}
      />
    );

    await fireEvent.press(getByText("UPI"));
    await fireEvent.press(getByText("Place Order"));

    expect(Alert.alert).toHaveBeenCalledWith(
      "Payment Required",
      "Please scan the QR code first."
    );
    expect(createOrder).not.toHaveBeenCalled();
  });

  it("allows UPI order placement after QR scanning", async () => {
    // Verifies QR success enables UPI checkout.
    createOrder.mockResolvedValueOnce({ id: 21 });
    createOrderItems.mockResolvedValueOnce([]);

    const { getByText } = await render(
      <PaymentScreen
        navigation={navigation}
        route={{ params: { selectedAddress } }}
      />
    );

    await fireEvent.press(getByText("UPI"));
    await fireEvent.press(getByText("Mock QR Scanner"));
    await fireEvent.press(getByText("Place Order"));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Success",
        "QR scanned successfully."
      );
      expect(createOrder).toHaveBeenCalledWith(
        expect.objectContaining({
          paymentMethod: "UPI",
          paymentStatus: "completed",
        })
      );
    });
  });

  it("alerts when order creation fails", async () => {
    // Verifies order service failures are surfaced to the user.
    createOrder.mockRejectedValueOnce(new Error("Order failed"));

    const { getByText } = await render(
      <PaymentScreen
        navigation={navigation}
        route={{ params: { selectedAddress } }}
      />
    );

    await fireEvent.press(getByText("Place Order"));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Order Error",
        "Unable to place order."
      );
      expect(navigation.replace).not.toHaveBeenCalled();
    });
  });

  it("goes back when cancel is pressed", async () => {
    // Verifies the cancel action returns to the previous screen.
    const { getByText } = await render(
      <PaymentScreen
        navigation={navigation}
        route={{ params: { selectedAddress } }}
      />
    );

    await fireEvent.press(getByText("Cancel"));

    expect(navigation.goBack).toHaveBeenCalledTimes(1);
  });
});
