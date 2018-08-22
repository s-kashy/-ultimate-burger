import * as actionType from "./actionType";
import axios from "../../axios-order";

export const storeBurgerOrder = (id, orderData) => {
  return {
    type: actionType.STORE_BURGER_ORDER,
    Id: id,
    orderData: orderData
  };
};
export const purchaseBurgerFail = error => {
  return {
    type: actionType.PURCHASE_BURGER_ERROR,
    error: error
  };
};

export const loadingOrder = () => {
  return {
    type: actionType.LOADING_ORDER
  };
};
export const redirectToHome = () => {
  return {
    type: actionType.REDIRECT_TO_HOME
  };
};
export const purchaseBurgerStart = dataOrder => {
  return dispatch => {
    dispatch(loadingOrder());
    axios
      .post("/order.json", dataOrder)
      .then(response => {
        dispatch(storeBurgerOrder(response.data.name, dataOrder));
        dispatch(redirectToHome());
      })
      .catch(err => {
        dispatch(purchaseBurgerFail(err));
      });
  };
};
