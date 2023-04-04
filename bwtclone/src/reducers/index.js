import { combineReducers } from "redux";
import categoryReducer from "./category_reducer";
import productReducer from "./products_reducer";

const rootReducer = combineReducers({
  category: categoryReducer,
  product: productReducer,
});

export default rootReducer;
