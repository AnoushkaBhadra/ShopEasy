import { configureStore, combineReducers } from "@reduxjs/toolkit";

import {
  persistStore,
  persistReducer,
} from "redux-persist";

import AsyncStorage from "@react-native-async-storage/async-storage";

import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import productReducer from "./slices/productSlice";
import wishlistReducer from "./slices/wishlistSlice";
import locationReducer from "./slices/locationSlice";
import reviewReducer from './slices/reviewSlice';
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["cart", "wishlist"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  products: productReducer,
  wishlist: wishlistReducer,
  location: locationReducer,
  reviews: reviewReducer,
});

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);