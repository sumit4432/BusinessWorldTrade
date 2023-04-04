import {
  categoryConstants,
  initialDataCntstants,
  productConstants,
} from "./constant";
import axios from "../helpers/axios";

export const getInitialData = () => {
  return async (dispatch) => {
    const res = await axios.post(`/initialdata`);

    if (res.status === 200) {
      const { categories, products } = res.data;
      // console.log("Categoris data", categories);
      console.log("res,data", res.data);
      dispatch({
        type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
        payload: { categories },
      });
      dispatch({
        type: productConstants.GET_ALL_PRODUCT_SUCCESS,
        payload: { products },
      });
    }

    console.log("res data here", res);
  };
};
