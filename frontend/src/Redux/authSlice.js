import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
      // Sauvegarde du user dans le local storage
      // localStorage.setItem("user", JSON.stringify(action.payload));
    },
    loginFailure(state, action) {
      state.user = null;
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.loading = false;
      state.error = null;
      // Suppression du user du local storage lors du logout
      // localStorage.removeItem("user");
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;




