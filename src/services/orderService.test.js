import axios from "axios";

import {
  getOrders,
  getOrder,
  getNextOrderId,
  createOrder,
  getOrderItems,
  createOrderItem,
  createOrderItems,
} from "./orderService";

jest.mock("axios", () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
  })),
}));

describe("orderService", () => {
  const apiMock = axios.create.mock.results[0].value;

  const order = {
    id: 5,
    userId: 10,
    addressId: 3,
    orderDate: "2026-07-08T10:00:00.000Z",
    status: "pending",
    totalAmount: 2800,
    paymentMethod: "COD",
    paymentStatus: "pending",
  };

  const orderItem = {
    id: 1,
    orderId: order.id,
    productId: 100,
    productName: "Wireless Headphones",
    price: 2500,
    quantity: 1,
  };

  beforeEach(() => {
    apiMock.get.mockClear();
    apiMock.post.mockClear();
  });

  describe("API client", () => {
    it("creates an axios client with the JSON API base URL", () => {
      // Verifies the service creates an axios instance for JSON API calls.
      expect(axios.create).toHaveBeenCalledWith({
        baseURL: process.env.EXPO_PUBLIC_JSON_API,
      });
    });
  });

  describe("getOrders", () => {
    it("fetches orders for a user id", async () => {
      // Verifies orders are requested with a userId query param.
      apiMock.get.mockResolvedValueOnce({ data: [order] });

      await expect(getOrders(order.userId)).resolves.toEqual([order]);

      expect(apiMock.get).toHaveBeenCalledWith("/orders", {
        params: { userId: order.userId },
      });
    });

    it("returns an empty array when the user has no orders", async () => {
      // Verifies empty order responses are returned without modification.
      apiMock.get.mockResolvedValueOnce({ data: [] });

      await expect(getOrders(order.userId)).resolves.toEqual([]);
    });

    it("rejects when fetching orders fails", async () => {
      // Verifies failed order list requests propagate the API error.
      const error = new Error("Network error");
      apiMock.get.mockRejectedValueOnce(error);

      await expect(getOrders(order.userId)).rejects.toThrow("Network error");
    });
  });

  describe("getOrder", () => {
    it("fetches a single order by id", async () => {
      // Verifies order detail requests use the order id path.
      apiMock.get.mockResolvedValueOnce({ data: order });

      await expect(getOrder(order.id)).resolves.toEqual(order);

      expect(apiMock.get).toHaveBeenCalledWith(`/orders/${order.id}`);
    });

    it("rejects when the order id is invalid or not found", async () => {
      // Verifies invalid ids rely on the API rejection.
      const error = new Error("Order not found");
      apiMock.get.mockRejectedValueOnce(error);

      await expect(getOrder(999)).rejects.toThrow("Order not found");
      expect(apiMock.get).toHaveBeenCalledWith("/orders/999");
    });
  });

  describe("getNextOrderId", () => {
    it("returns one when there are no existing orders", async () => {
      // Verifies the first order id starts at one for empty responses.
      apiMock.get.mockResolvedValueOnce({ data: [] });

      await expect(getNextOrderId()).resolves.toBe(1);

      expect(apiMock.get).toHaveBeenCalledWith(
        "/orders?_sort=id&_order=desc&_limit=1"
      );
    });

    it("returns one greater than the highest existing order id", async () => {
      // Verifies the next id is derived from the latest order id.
      apiMock.get.mockResolvedValueOnce({ data: [{ id: "12" }] });

      await expect(getNextOrderId()).resolves.toBe(13);
    });

    it("rejects when fetching the latest order fails", async () => {
      // Verifies next-id lookup errors are propagated.
      const error = new Error("Unable to load orders");
      apiMock.get.mockRejectedValueOnce(error);

      await expect(getNextOrderId()).rejects.toThrow(
        "Unable to load orders"
      );
    });
  });

  describe("createOrder", () => {
    it("creates an order with the next generated id", async () => {
      // Verifies createOrder fetches the next id and posts the order payload.
      const orderData = {
        userId: order.userId,
        addressId: order.addressId,
        totalAmount: order.totalAmount,
        paymentMethod: order.paymentMethod,
      };
      const createdOrder = { id: 6, ...orderData };

      apiMock.get.mockResolvedValueOnce({ data: [{ id: 5 }] });
      apiMock.post.mockResolvedValueOnce({ data: createdOrder });

      await expect(createOrder(orderData)).resolves.toEqual(createdOrder);

      expect(apiMock.post).toHaveBeenCalledWith("/orders", {
        id: 6,
        ...orderData,
      });
    });

    it("rejects when the order payload is missing required data", async () => {
      // Verifies create failures from the API are propagated.
      const error = new Error("Invalid order data");
      apiMock.get.mockResolvedValueOnce({ data: [] });
      apiMock.post.mockRejectedValueOnce(error);

      await expect(createOrder({ userId: order.userId })).rejects.toThrow(
        "Invalid order data"
      );
    });
  });

  describe("getOrderItems", () => {
    it("fetches order items for an order id", async () => {
      // Verifies order items are requested with an orderId query param.
      apiMock.get.mockResolvedValueOnce({ data: [orderItem] });

      await expect(getOrderItems(order.id)).resolves.toEqual([orderItem]);

      expect(apiMock.get).toHaveBeenCalledWith("/orderItems", {
        params: { orderId: order.id },
      });
    });

    it("returns an empty array when the order has no items", async () => {
      // Verifies empty order item responses are returned without modification.
      apiMock.get.mockResolvedValueOnce({ data: [] });

      await expect(getOrderItems(order.id)).resolves.toEqual([]);
    });

    it("rejects when fetching order items fails", async () => {
      // Verifies failed order item requests propagate the API error.
      const error = new Error("Order items not found");
      apiMock.get.mockRejectedValueOnce(error);

      await expect(getOrderItems(999)).rejects.toThrow(
        "Order items not found"
      );
    });
  });

  describe("createOrderItem", () => {
    it("posts a single order item and returns the created item", async () => {
      // Verifies createOrderItem uses POST with the order item payload.
      apiMock.post.mockResolvedValueOnce({ data: orderItem });

      await expect(createOrderItem(orderItem)).resolves.toEqual(orderItem);

      expect(apiMock.post).toHaveBeenCalledWith("/orderItems", orderItem);
    });

    it("rejects when creating an order item fails", async () => {
      // Verifies order item API errors are propagated.
      const error = new Error("Invalid order item");
      apiMock.post.mockRejectedValueOnce(error);

      await expect(createOrderItem({ orderId: order.id })).rejects.toThrow(
        "Invalid order item"
      );
    });
  });

  describe("createOrderItems", () => {
    it("posts every order item and resolves with each axios response", async () => {
      // Verifies bulk item creation posts each item.
      const secondOrderItem = {
        ...orderItem,
        id: 2,
        productId: 101,
        productName: "Coffee Mug",
      };
      const firstResponse = { data: orderItem };
      const secondResponse = { data: secondOrderItem };

      apiMock.post
        .mockResolvedValueOnce(firstResponse)
        .mockResolvedValueOnce(secondResponse);

      await expect(
        createOrderItems([orderItem, secondOrderItem])
      ).resolves.toEqual([firstResponse, secondResponse]);

      expect(apiMock.post).toHaveBeenNthCalledWith(
        1,
        "/orderItems",
        orderItem
      );
      expect(apiMock.post).toHaveBeenNthCalledWith(
        2,
        "/orderItems",
        secondOrderItem
      );
    });

    it("resolves to an empty array when there are no order items", async () => {
      // Verifies bulk creation handles an empty cart safely.
      await expect(createOrderItems([])).resolves.toEqual([]);

      expect(apiMock.post).not.toHaveBeenCalled();
    });

    it("rejects when any order item request fails", async () => {
      // Verifies Promise.all rejects if one item cannot be created.
      const error = new Error("Unable to create item");
      apiMock.post.mockRejectedValueOnce(error);

      await expect(createOrderItems([orderItem])).rejects.toThrow(
        "Unable to create item"
      );
    });
  });
});
