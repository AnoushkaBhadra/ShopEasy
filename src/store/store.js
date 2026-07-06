import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import productReducer from "./slices/productSlice";
import wishlistReducer from './slices/wishlistSlice';
import locationReducer from "./slices/locationSlice";
const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        products: productReducer,
        wishlist: wishlistReducer,
        location: locationReducer,
    },
});

export default store;