import {
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_REQUEST,
} from "../constants/type.js";
const initialState = {
  products: [],
  errors: null,
  loading: false,
};

const productListReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PRODUCTS_REQUEST:
      return { ...state, loading: true };
    case GET_PRODUCTS_SUCCESS:
      return { ...state, products: [...payload], loading: false };
    case GET_PRODUCTS_FAIL:
      return { ...state, error: payload, loading: false };

    default:
      return state;
  }
};

export default productListReducer;
