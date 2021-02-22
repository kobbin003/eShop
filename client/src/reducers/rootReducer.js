import { combineReducers } from "redux";
import productListReducer from "./productListReducer";
const rootReducer = combineReducers({
  productList: productListReducer,
});

export default rootReducer;
