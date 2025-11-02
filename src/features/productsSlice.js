// src/features/productsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (category = null) => {
    const url = category
      ? `https://fakestoreapi.com/products/category/${category}`
      : "https://fakestoreapi.com/products";
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearProduct: (state) => {
      state.products = [];
      state.error = null;
      state.loading = true; // Set loading to true when clearing
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Fetched products: ", action.payload);
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearProduct } = productsSlice.actions;
export default productsSlice.reducer;
