/* eslint-disable no-undef */
import axios from "axios";
import Cookies from "js-cookie";

const isLive = true;
// const isLive = false;

export const RAJOR_PAY_KEY = isLive
  ? import.meta.env.VITE_RAZORPAY_KEY_TEST
  : import.meta.env.VITE_RAZORPAY_KEY_TEST;

export const BASEURL = {
  ENDPOINT_URL: isLive
    ? `https://carebridgebackend.onrender.com/care`
    : `http://localhost:3000/care`,
};

// const authToken = JSON.parse(localStorage.getItem("token"));
const authToken = Cookies.get("token");
const headers = {
  "Content-Type": "application/json",
};

if (authToken) {
  headers["Authorization"] = `Bearer ${authToken}`;
}

const http = axios.create({
  baseURL: `${BASEURL.ENDPOINT_URL}`,
  headers: headers,
});

// Add a response interceptor
http.interceptors.response.use(
  (response) => {
    // Check the status code here
    console.log("Status Code:", response.status);
    return response;
  },
  (error) => {
    if (error.response) {
      console.log("Error Status Code:", error.response.status);
    } else if (error.request) {
      console.log("No response received");
    } else {
      console.log("Error", error.message);
    }
    return Promise.reject(error);
  },
);

export default http;
