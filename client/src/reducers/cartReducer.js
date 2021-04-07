import {
  CART_ADD_ITEM,
  CART_UPDATE_ITEM,
  CART_REMOVE_ITEM,
  SAVE_SHIPPING_ADDRESS,
  SAVE_PAYMENT_METHOD,
} from "../constants/type";
const initialState = { cartItems: [], shippingAddress: {}, paymentMethod: "" };

const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CART_ADD_ITEM:
      const item = payload;

      const existItem = state.cartItems.find((x) => x.product === item.product);
      //existItem => whose product === item.product.
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            // x.product === existItem.product ? item : x
            x.product === existItem.product
              ? { ...x, qty: x.qty + item.qty }
              : x
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, payload] };
      }
    case CART_UPDATE_ITEM:
      // const item = payload;
      const itemToUpdate = state.cartItems.find(
        (x) => x.product === payload.product
      );
      return {
        ...state,
        cartItems: state.cartItems.map((x) =>
          // x.product === existItem.product ? item : x
          x.product === itemToUpdate.product ? payload : x
        ),
      };
    case CART_REMOVE_ITEM:
      const newCartItem = state.cartItems.filter(
        (item) => item.product !== payload.id
      );
      return { ...state, cartItems: newCartItem };

    /** shipping address */
    case SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: payload };

    /** payment method */
    case SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: payload };
    default:
      return state;
  }
};
export default cartReducer;
