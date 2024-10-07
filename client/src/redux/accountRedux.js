import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
  name: "account",
  initialState: {
    currentAccount: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentAccount = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    tryAgain: (state) => {
      state.error = false;
    },
    logout: (state) => {
      state.currentAccount = null;
      state.isFetching = false;
      state.error = false;
    },
    //reset
    reset: (state) => {
      state.currentAccount = null;
      state.isFetching = false;
      state.error = false;
    },
    //update
    updateAccount: (state, action) => {
      state.currentAccount = action.payload;
    },
    //register
    registerStart: (state) => {
      state.isFetching = true;
    },
    registerSuccess: (state, action) => {
      state.isFetching = false;
      state.currentAccount = action.payload;
      state.error = false;
    },
    registerFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  registerStart,
  registerSuccess,
  registerFailure,
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  tryAgain,
  updateAccount,
  reset,
} = accountSlice.actions;
export default accountSlice.reducer;
