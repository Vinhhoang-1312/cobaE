import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
  name: "account",
  initialState: {
    currentAccount: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    signinStart: (state) => {
      state.isFetching = true;
    },
    signinSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.currentAccount = action.payload;
    },
    signinFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    tryAgain: (state) => {
      state.error = false;
    },
    signOut: (state) => {
      state.currentAccount = null;
      state.isFetching = false;
      state.error = false;
    },
  },
});

export const { signinStart, signinSuccess, signinFailure, tryAgain, signOut } =
  accountSlice.actions;
export default accountSlice.reducer;
