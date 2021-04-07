import { combineReducers } from "redux";
import alertReducer from "./alertReducers";
import authReducer from "./authReducer";
import cartReducer from "./cartReducer";
import orderReducer, { orderReducerGetOrder } from "./orderReducers";
import productListReducer from "./productListReducer";
import productReducer from "./productReducer";
const rootReducer = combineReducers({
  productList: productListReducer,
  product: productReducer,
  cart: cartReducer,
  authUser: authReducer,
  alert: alertReducer,
  order: orderReducer,
  orderGet: orderReducerGetOrder,
});

export default rootReducer;
