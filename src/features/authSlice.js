import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const LOCAL_USERS_KEY = "registeredUsers";

// 🧩 Helper: Get and Save Users from localStorage
const getUsers = () => JSON.parse(localStorage.getItem(LOCAL_USERS_KEY)) || [];
const saveUsers = (users) =>
  localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));

// ✅ Register User
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    const users = getUsers();

    // check if email already exists
    const existingUser = users.find((u) => u.email === userData.email);
    if (existingUser) {
      return rejectWithValue("Email already registered!");
    }

    const newUser = {
      ...userData,
      id: Date.now(),
      token: Math.random().toString(36).substr(2),
    };

    users.push(newUser);
    saveUsers(users);

    localStorage.setItem("user", JSON.stringify(newUser));
    return newUser;
  }
);

// ✅ Login User
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    const users = getUsers();

    const foundUser = users.find(
      (u) =>
        u.email === credentials.email && u.password === credentials.password
    );

    if (!foundUser) {
      return rejectWithValue("Invalid email or password!");
    }

    localStorage.setItem("user", JSON.stringify(foundUser));
    return foundUser;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
