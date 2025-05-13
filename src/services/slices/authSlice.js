import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
  token: null,
  user: null,
  _persisted: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    clearAuth: (state) => {
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      console.log("state", state);
      state.token = null;
      state.user = null;
    });
  },
});

export const { setAuth, updateUser, clearAuth } = authSlice.actions;
export default authSlice.reducer;
