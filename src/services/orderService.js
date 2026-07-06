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
export async function getNextOrderId() {
  const response = await API.get(
    "/orders?_sort=id&_order=desc&_limit=1"
);
  const orders = response.data;

  if (orders.length === 0) {
    return 1;
  }
  return parseInt(orders[0].id, 10) + 1;
}
export async function createOrder(orderData) {
  const nextId = await getNextOrderId();

  const response = await API.post("/orders", {
    id: nextId,
    ...orderData,
  });

  return response.data;
}

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
  const response = await API.post("/orderItems", orderItem);

  return response.data;
}

export async function createOrderItems(items) {
  return Promise.all(items.map((item) => API.post("/orderItems", item)));
}
