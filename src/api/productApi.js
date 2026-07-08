// import axios from "axios";

// const API = axios.create({
//   baseURL: process.env.EXPO_PUBLIC_JSON_API,
  
// });
// // console.log()
// export const getProducts = async () => {
  
//   const response = await API.get("/products");
//   return response.data;
// };
import axios from "axios";

console.log("JSON API:", process.env.EXPO_PUBLIC_JSON_API);

const API = axios.create({
  baseURL: process.env.EXPO_PUBLIC_JSON_API,
});

export const getProducts = async () => {
  try {
    console.log("Request URL:", `${process.env.EXPO_PUBLIC_JSON_API}/products`);

    const response = await API.get("/products");

    console.log("SUCCESS:", response.data);

    return response.data;
  } catch (err) {
    console.log("MESSAGE:", err.message);
    console.log("URL:", err.config?.url);
    console.log("BASE URL:", err.config?.baseURL);
    console.log("STATUS:", err.response?.status);
    console.log("DATA:", err.response?.data);

    throw err;
  }
};