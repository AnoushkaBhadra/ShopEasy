import axios from "axios";

const API = axios.create({
  baseURL: process.env.EXPO_PUBLIC_JSON_API,
});

export const getProducts = async () => {
  const response = await API.get("/products");
  return response.data;
};