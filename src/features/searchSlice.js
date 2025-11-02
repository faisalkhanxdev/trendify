// src/redux/searchSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "search/fetchProducts",
  async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    return data;
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: "",
    products: [],
    results: [],
    loading: false,
    error: null,
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload.toLowerCase();

      state.results = state.products.filter((p) =>
        p.title.toLowerCase().includes(state.query)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.results = action.payload.filter((p) =>
          p.title.toLowerCase().includes(state.query)
        );
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setQuery } = searchSlice.actions;
export default searchSlice.reducer;
