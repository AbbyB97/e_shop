import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM,CART_REMOVE_ALL } from "../constants/cartConstants";

//getstate added to access entire state in action for accessing cart items
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
  //storing the cart locally json.stringify as only strings are allowed in localstorage
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
export const removeFromCartAll = () => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ALL,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
