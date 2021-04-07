import {
  GET_ORDER_FAIL,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  LEAVE_ORDER_PAGE,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
} from "../constants/type";

const initialState = {
  order: {},
  loading: false,
  success: false,
  errors: [],
};

const orderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ORDER_CREATE_REQUEST:
      return { ...state, ...payload, loading: true, success: false };
    case ORDER_CREATE_SUCCESS:
      return { ...state, order: payload, loading: false, success: true };
    case LEAVE_ORDER_PAGE:
      return { ...state, success: false };
    case ORDER_CREATE_FAIL:
      return { ...state, errors: payload, loading: false, success: false };
    default:
      return state;
  }
};
const initialStateOrderById = {
  orderById: {},
  loading: false,
  success: false,
  errors: [],
};

export const orderReducerGetOrder = (
  state = initialStateOrderById,
  { type, payload }
) => {
  switch (type) {
    case GET_ORDER_REQUEST:
      return { ...state, loading: true, success: false };
    case GET_ORDER_SUCCESS:
      return { ...state, orderById: payload, loading: false, success: true };
    case GET_ORDER_FAIL:
      return { ...state, loading: false, success: false };
    default:
      return state;
  }
};

export default orderReducer;
