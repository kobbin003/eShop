import { REMOVE_ALERT, SET_ALERT } from "../constants/type";

const initialState = {
  alerts: [],
};

const alertReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ALERT:
      return {
        ...state,
        alerts: [
          ...state.alerts,
          { msg: payload.msg, variant: payload.variant },
        ],
      };
    case REMOVE_ALERT:
      return { ...state, ...initialState };

    default:
      return state;
  }
};
export default alertReducer;
