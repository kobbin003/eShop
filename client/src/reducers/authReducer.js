import {
  LOGIN_USER,
  REGISTER_USER,
  GET_USER,
  REQUEST_USER,
  USER_REQUEST_FAILED,
  LOGOUT_USER,
  USER_AUTHENTICATED,
  UPDATE_USER_PROFILE,
} from "../constants/type";

const initialState = {
  loading: false,
  user: {},
  error: "",
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REQUEST_USER:
      return { ...state, loading: true };
    case REGISTER_USER:
      return { ...state, user: payload, loading: false };
    case LOGIN_USER:
      return { ...state, user: payload, loading: false };
    case GET_USER:
      return { ...state, user: payload, loading: false };
    case UPDATE_USER_PROFILE:
      /** token is not sent on update */
      return { ...state, user: { ...state.user, ...payload }, loading: false };
    case USER_REQUEST_FAILED:
      return { ...state, error: payload, loading: false };
    case USER_AUTHENTICATED:
      return { ...state };
    case LOGOUT_USER:
      return { ...initialState };
    default:
      return state;
  }
};

export default authReducer;
