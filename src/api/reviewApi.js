import axios from "axios";

const API = axios.create({
  baseURL: process.env.EXPO_PUBLIC_JSON_API,
});

// export const getReviewsByProduct = async (productId) => {
//   try {
//     console.log("Fetching reviews for:", productId);

//     const response = await API.get(`/reviews?productId=${productId}`);

//     console.log("Reviews response:", response.data);

//     return response.data;
//   } catch (err) {
//     console.log("Review API Error:", err.message);
//     console.log("URL:", err.config?.url);
//     console.log("Base URL:", err.config?.baseURL);
//     console.log("Status:", err.response?.status);
//     console.log("Data:", err.response?.data);

//     throw err;
//   }
// };


// export const getReviewsByProduct = async (productId) => {
//   try {
//     console.log("Fetching reviews for:", productId);

//     const response = await API.get(
//       `/reviews?productId.eq=${productId}`
//     );

//     console.log("Reviews response:", response.data);

//     return response.data;
//   } catch (err) {
//     console.log("Review API Error:", err.message);
//     throw err;
//   }
// };

export const getReviewsByProduct = async (productId) => {
  try {
    const response = await API.get("/reviews");

    const filtered = response.data.filter(
      review => String(review.productId) === String(productId)
    );

    console.log("All reviews:", response.data);
    console.log("Filtered reviews:", filtered);

    return filtered;

  } catch (err) {
    console.log(err);
    throw err;
  }
};