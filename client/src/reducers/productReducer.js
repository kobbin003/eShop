import {
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
  GET_PRODUCT_REQUEST,
} from "../constants/type.js";
const initialState = {
  product: { reviews: [] },
  loading: false,
  error: null,
};

const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
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

export default productReducer;
