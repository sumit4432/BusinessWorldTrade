import { combineReducers } from "redux";
import auth_reducers from "./auth_reducers";
import user_reducers from "./user_reducers";
import productReducer from "./product_reducer";
import orderReducer from "./order_reducer";
import pageReducer from "./page_reducers";
import categoryReducer from "./category_reducer";

const rootReducer = combineReducers({
  auth: auth_reducers,
  user: user_reducers,
  category: categoryReducer,
  product: productReducer,
  order: orderReducer,
  page: pageReducer,
});

export default rootReducer;
