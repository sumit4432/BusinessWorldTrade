import axios from "../helpers/axios";
import { authContants } from "./constant";

// +++++++++++++signin++++++++++++

export const login = (user) => {
  console.log(user);
  return async (dispatch) => {
    dispatch({ type: authContants.LOGIN_REQUEST });
    const res = await axios.post(`/admin/signin`, {
      ...user,
    });

    if (res.status === 200) {
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: authContants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: authContants.LOGIN_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};

// ++++++++++++++++logout++++++++++++

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({
        type: authContants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      dispatch({
        type: authContants.LOGIN_FAILURE,
        payload: { error: "failed to login" },
      });
    }
  };
};

export const signout = () => {
  return async (dispatch) => {
    dispatch({ type: authContants.LOGOUT_REQUEST });
    const res = await axios.post(`/admin/signout`);
    if (res.status === 200) {
      localStorage.clear();
      dispatch({
        type: authContants.LOGOUT_SUCCESS,
      });
    } else {
      dispatch({
        type: authContants.LOGOUT_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};
