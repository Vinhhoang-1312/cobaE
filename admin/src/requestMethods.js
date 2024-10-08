import axios from "axios";

const BASE_URL = "https://cobae.onrender.com/api";
// const BASE_URL = "http://localhost:5000/api/";

const account = JSON.parse(localStorage.getItem("persist:root"))?.account;
const currentAccount = account && JSON.parse(account).currentAccount;
const TOKEN = currentAccount?.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
export const accountRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
