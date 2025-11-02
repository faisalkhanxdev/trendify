import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "../features/homeSlice";
import productsReducer from "../features/productsSlice";
import cartReducer from "./cartSlice";
import authReducer from "../features/authSlice";
import productReducer from "../features/productSlice";
import alertReducer from "../features/alertSlice";
import searchReducer from "../features/searchSlice";

export const store = configureStore({
  reducer: {
    home: homeReducer,
    products: productsReducer,
    cart: cartReducer,
    auth: authReducer,
    product: productReducer,
    alert: alertReducer,
    search: searchReducer,
  },
});
