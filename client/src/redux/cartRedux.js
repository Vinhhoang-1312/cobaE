import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    clear: (state, action) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
    addProduct: (state, action) => {
      if (state.products.some((item) => item._id === action.payload._id)) {
        state.products.find(
          (item) => item._id === action.payload._id
        ).quantity += action.payload.quantity;
        state.total += action.payload.price * action.payload.quantity;
      } else {
        state.quantity += 1;
        state.products.push(action.payload);
        state.total += action.payload.price * action.payload.quantity;
      }
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (item) => item._id !== action.payload.product._id
      );
      state.total -= action.payload.price * action.payload.quantity;
      state.quantity -= 1;
    },
    addProductQuantity: (state, action) => {
      state.products.find(
        (item) => item._id === action.payload.product._id
      ).quantity += 1;
      state.total += action.payload.product.price;
    },
    subtractProductQuantity: (state, action) => {
      state.products.find(
        (item) => item._id === action.payload.product._id
      ).quantity -= 1;
      state.total -= action.payload.product.price;
    },
    paidProduct: (state) => {
      state.quantity = 0;
      state.total = 0;
      state.products = [];
    },
  },
});

export const {
  addProduct,
  removeProduct,
  addProductQuantity,
  subtractProductQuantity,
  paidProduct,
  clear,
} = cartSlice.actions;
export default cartSlice.reducer;
