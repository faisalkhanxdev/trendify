// src/features/homeSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* 🛍️ Fetch featured products */
export const fetchFeaturedProducts = createAsyncThunk(
  "home/fetchFeaturedProducts",
  async () => {
    const res = await fetch("https://fakestoreapi.com/products?limit=6");
    const data = await res.json();
    return data;
  }
);

/* 📦 Fetch all categories */
export const fetchCategories = createAsyncThunk(
  "home/fetchCategories",
  async () => {
    const res = await fetch("https://fakestoreapi.com/products/categories");
    const data = await res.json();
    return data;
  }
);

/* 🖼️ Fetch one preview image for each category */
export const fetchCategoryImages = createAsyncThunk(
  "home/fetchCategoryImages",
  async (_, { getState }) => {
    const { categories } = getState().home;
    if (!categories.length) return {};

    const results = await Promise.all(
      categories.map(async (cat) => {
        const res = await fetch(
          `https://fakestoreapi.com/products/category/${encodeURIComponent(cat)}?limit=1`
        );
        const data = await res.json();
        return { [cat]: data[0]?.image || "/placeholder.png" };
      })
    );

    return Object.assign({}, ...results);
  }
);

const homeSlice = createSlice({
  name: "home",
  initialState: {
    featuredProducts: [],
    categories: [],
    categoryImages: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* ✳️ FEATURED PRODUCTS */
      .addCase(fetchFeaturedProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredProducts = action.payload;
      })
      .addCase(fetchFeaturedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      /* 🧱 CATEGORIES */
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      /* 🖼️ CATEGORY IMAGES */
      .addCase(fetchCategoryImages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategoryImages.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryImages = action.payload;
      })
      .addCase(fetchCategoryImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default homeSlice.reducer;
