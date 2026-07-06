import axios from "axios";

const API = axios.create({
  baseURL: process.env.EXPO_PUBLIC_JSON_API,
});

// Orders

export async function getOrders(userId) {
  const response = await API.get("/orders", {
    params: {
      userId,
    },
  });

  return response.data;
}

export async function getOrder(orderId) {
  const response = await API.get(`/orders/${orderId}`);
  return response.data;
}

export async function createOrder(orderData) {
  console.log("POSTING ORDER...");
  console.log("BASE URL:", process.env.EXPO_PUBLIC_JSON_API);

  const response = await API.post("/orders", orderData);

  console.log("ORDER CREATED:", response.data);

  return response.data;
}

// Order Items
// Order Items

export async function getOrderItems(orderId) {
  const response = await API.get("/orderItems", {
    params: {
      orderId,
    },
  });

  return response.data;
}

export async function createOrderItem(orderItem) {
  const response = await API.post(
    "/orderItems",
    orderItem
  );

  return response.data;
}

export async function createOrderItems(items) {
  return Promise.all(
    items.map((item) =>
      API.post("/orderItems", item)
    )
  );
}