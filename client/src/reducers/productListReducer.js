import {
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
  GET_PRODUCT_REQUEST,
} from "../actions/type";
const initialState = {
  products: [],
  product: null,
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
    case GET_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case GET_PRODUCT_SUCCESS:
      return { ...state, loading: false, product: payload };
    case GET_PRODUCT_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

export default productListReducer;
