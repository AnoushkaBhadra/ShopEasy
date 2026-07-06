import axios from "axios"; 
const API = axios.create({
    baseURL:  "http://10.0.2.2:3000",
})
export const getProducts = async () => {
  const response = await API.get("/products");
  return response.data;
};