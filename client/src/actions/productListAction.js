import axios from "axios";
import {
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
  GET_PRODUCT_REQUEST,
} from "./type";
export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCTS_REQUEST });
    const config = {
      method: "get",
      url: "/api/products",
    };
    const { data } = await axios(config);
    // console.log("action workking", data);
    dispatch({ type: GET_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    console.error(error);
    dispatch({
      type: GET_PRODUCTS_FAIL,
      payload: {
        message:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      },
    });
  }
};
export const getProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCT_REQUEST });

    const config = {
      method: "get",
      url: `/api/products/${productId}`,
    };
    const response = await axios(config);
    const payload = response.data;
    dispatch({ type: GET_PRODUCT_SUCCESS, payload });
  } catch (error) {
    console.error(error);
    dispatch({
      type: GET_PRODUCT_FAIL,
      payload: {
        message:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      },
    });
  }
};
