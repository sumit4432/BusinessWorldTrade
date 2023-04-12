import axios from "axios";
import { productsConstants } from "./constants"; // Changed from "./constant"

export const getProductsBySlug = (slug) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/products/${slug}`);
      dispatch({
        type: productsConstants.GET_PRODUCTS_BY_SLUG,
        payload: res.data,
      });
    } catch (error) {
      console.error("Failed to get products by slug:", error);
    }
  };
};

export const getProductPage = (payload) => {
  return async (dispatch) => {
    if (!payload || !payload.cid || !payload.type) {
      console.error("Invalid payload:", payload);
      return;
    }

    try {
      const res = await axios.get(`/page/${payload.cid}/${payload.type}`);
      if (res.status === 200) {
        console.log(res.data);
      } else {
        console.error("Failed to get product page:", res.status);
      }
    } catch (error) {
      console.error("Failed to get product page:", error);
    }
  };
};
