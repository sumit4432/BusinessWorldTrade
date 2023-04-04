import axios from "axios";
import { api } from "../UrlConfig";
import store from "../store/index";
import { authContants } from "../actions/constant";

const token = window.localStorage.getItem("token");
const axiosInstance = axios.create({
  baseURL: api,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});
axiosInstance.interceptors.request.use((req) => {
  const { auth } = store.getState();
  if (auth.token) {
    req.headers.Authorization = `Bearer ${auth.token}`;
  }
  return req;
});

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error, res) => {
    console.log(error.response);
    const status = error.response.status;
    if (status && status === 500) {
      localStorage.clear();
      store.dispatch({ type: authContants.LOGOUT_SUCCESS });
    }
    return Promise.reject(error.res);
  }
);

export default axiosInstance;
