import { publicRequest } from "../requestMethods";
import {
  loginSuccess,
  loginStart,
  loginFailure,
  updateAccount,
} from "./accountRedux";
import { createWishlist, addToWishlist, updateWishlist } from "./wishRedux";
import { addOrder, updateOrder } from "./orderRedux";

// account
async function registerRequest(dispatch, account) {
  dispatch(loginStart());
  try {
    const registerResponse = await publicRequest.post("auth/register", account);
    const accountId = await registerResponse.data._id;
    const wishlistResponse = await publicRequest.post(`wishlist`, {
      accountId: accountId,
    });
    const ordersResponse = await publicRequest.get(`orders/${accountId}`);
    dispatch(loginSuccess(registerResponse.data));

    dispatch(createWishlist(wishlistResponse.data));
    dispatch(addOrder(ordersResponse.data));
  } catch (error) {
    dispatch(loginFailure());
  }
}
async function loginRequest(dispatch, account) {
  dispatch(loginStart());
  try {
    const loginResponse = await publicRequest.post("auth/login", account);
    const accountId = await loginResponse.data._id;
    const wishlistResponse = await publicRequest.get(`wishlist/${accountId}`);
    const ordersResponse = await publicRequest.get(`orders/${accountId}`);

    dispatch(loginSuccess(loginResponse.data));
    dispatch(addToWishlist(wishlistResponse.data));
    dispatch(addOrder(ordersResponse.data));
  } catch (error) {
    dispatch(loginFailure());
    console.error(error);
  }
}
async function updateAccountInfo(id, account, dispatch) {
  try {
    const response = await publicRequest.patch(`accounts/${id}`, account);
    dispatch(updateAccount(response.data));
  } catch (error) {
    console.error(error);
  }
}

// WISHLIST
async function updateWishlistProducts(id, item, dispatch) {
  try {
    console.log(`${id}`);
    const response = await publicRequest.patch(`wishlist/${id}`, item);
    dispatch(updateWishlist(response.data));
  } catch (error) {
    console.error(error);
  }
}

// ORDERS

async function getOrders(accountID, dispatch) {
  try {
    const response = await publicRequest.get(`orders/${accountID}`);
    dispatch(addOrder(response.data));
  } catch (error) {
    console.error(error);
  }
}
async function updateOrderStatus(id, item, dispatch) {
  try {
    const response = await publicRequest.patch(`orders/${id}`, item);
    dispatch(updateOrder(response.data));
  } catch (error) {
    console.error(error);
  }
}

export {
  loginRequest,
  registerRequest,
  updateAccountInfo,
  updateWishlistProducts,
  getOrders,
  updateOrderStatus,
};
