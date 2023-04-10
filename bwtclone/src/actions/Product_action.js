import axios from "../helpers/axios";
import { productsConstants } from "./constant";

export const getProductsBySlug = (slug) => {
  return async (dispatch) => {
    const res = await axios.get(`/products/${slug}`);

    if (res.status === 200) {
      dispatch({
        type: productsConstants.GET_PRODCUT_BY_SLUG,
        payload: res.data,
      });
    } else {
    }
  };
};

export const getProductPage = (payload) => {
  return async (dispatch) => {
    const { cid, type } = payload;
    const res = await axios.get(`/page/${cid}/${type}`);

    console.log(res);
    if (res.status === 200) {
    } else {
    }
  };
};
