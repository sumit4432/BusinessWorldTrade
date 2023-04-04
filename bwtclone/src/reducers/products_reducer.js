import { productsConstants } from "../actions/constant";

const inintialState = {
  products: [],
};

const productsReducer = (state = inintialState, action) => {
  switch (action.type) {
    case productsConstants.GET_PRODCUT_BY_SLUG:
      state = {
        ...state,
        products: action.payload.products,
      };
      break;
    default:
      // return the original state if the action type is not recognized
      return state;
  }

  return state;
};

export default productsReducer;
