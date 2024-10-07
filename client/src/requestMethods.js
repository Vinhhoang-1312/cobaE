import axios from "axios";

// const BASE_URL = "https://coba-mart.herokuapp.com/api/";
const BASE_URL = "http://localhost:5000/api/";
// const TOKEN =
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     .accessToken || "";

const account = JSON.parse(localStorage.getItem("persist:root"))?.account;
const currentAccount = account && JSON.parse(account).currentAccount;
const TOKEN = currentAccount?.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const accountRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});
