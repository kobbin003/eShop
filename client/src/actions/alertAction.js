import { REMOVE_ALERT, SET_ALERT } from "../constants/type";

export const setAlert = (msg, variant, time = 3000) => (dispatch) => {
  dispatch({
    type: SET_ALERT,
    payload: { msg, variant },
  });
  setTimeout(() => {
    dispatch({ type: REMOVE_ALERT });
  }, time);
};
