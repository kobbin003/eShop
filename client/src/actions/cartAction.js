import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_UPDATE_ITEM,
  SAVE_SHIPPING_ADDRESS,
  SAVE_PAYMENT_METHOD,
} from "../constants/type";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });
  // console.log(getState());
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
export const updateCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: CART_UPDATE_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });
  // console.log(getState());
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: { id } });
  const cartItemState = getState().cart.cartItems;
  // localStorage.setItem(
  //   "cartItems",
  //   JSON.stringify(cartItems.filter((item) => item.product !== id))
  // );
  localStorage.setItem("cartItems", JSON.stringify(cartItemState));
};

export const saveShippingAddress = (addr) => (dispatch) => {
  dispatch({ type: SAVE_SHIPPING_ADDRESS, payload: addr });
  localStorage.setItem("shippingAddress", JSON.stringify(addr));
};

export const savePaymentMethod = (payload) => (dispatch) => {
  dispatch({ type: SAVE_PAYMENT_METHOD, payload });
  localStorage.setItem("paymentMethod", JSON.stringify(payload));
};
