import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");
const usuario = JSON.parse(localStorage.getItem("usuario"));

const initialState = {
  usuario,
  token,
  isAuthenticated: !!token,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    loginSuccess: (state, action) => {
      state.loading = false;
      state.usuario = action.payload.usuario;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },

    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    logout: (state) => {
      state.usuario = null;
      state.token = null;
      state.isAuthenticated = false;

      localStorage.removeItem("token");
      localStorage.removeItem("usuario");
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} = authSlice.actions;

export default authSlice.reducer;