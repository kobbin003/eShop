import axios from "axios";
import {
  GET_ORDER_BY_ID,
  GET_ORDER_FAIL,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
} from "../constants/type";
import { setAlert } from "./alertAction";

export const createOrder = (payload) => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST });
  const order = payload;
  const {
    authUser: {
      user: { token },
    },
  } = getState();
  try {
    const config = {
      url: "/api/orders",
      method: "post",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      data: order,
    };

    const { data } = await axios(config);
    console.log("data-from-axios", data);
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
  } catch (error) {
    console.error(error);
    // const errorMessage = error.response.data.message;
    const errorMessages = error.response.data.errors;
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: errorMessages || [{ msg: error.message }],
    });
    errorMessages.forEach(({ msg }) => dispatch(setAlert(msg, "danger", 6000)));
  }
};

export const getOrderById = (orderId) => async (dispatch, getState) => {
  dispatch({ type: GET_ORDER_REQUEST });
  const {
    authUser: {
      user: { token },
    },
  } = getState();
  try {
    const config = {
      url: `/api/orders/${orderId}`,
      method: "get",
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios(config);

    dispatch({
      type: GET_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error(error);
    // const errorMessage = error.response.data.message;
    const errorMessages = error.response.data.errors;
    dispatch({
      type: GET_ORDER_FAIL,
      payload: errorMessages || [{ msg: error.message }],
    });
    errorMessages.forEach(({ msg }) => dispatch(setAlert(msg, "danger", 6000)));
  }
};
