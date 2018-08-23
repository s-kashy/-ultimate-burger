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
export const purchaseInit = () => {
  return {
    type: actionType.PURCHASE_INIT
  };
};
export const purchaseBurgerStart = dataOrder => {
  return dispatch => {
    dispatch(loadingOrder());
    axios
      .post("/order.json", dataOrder)
      .then(response => {
        dispatch(storeBurgerOrder(response.data.name, dataOrder));
      })
      .catch(err => {
        dispatch(purchaseBurgerFail(err));
      });
  };
};
export const fetchAllOrders = order => {
  return {
    type: actionType.FETCH_ORDERS_INIT,
    orders: order
  };
};
export const failFetchOrder = error => {
  return {
    type: actionType.FAIL_ORDER_INIT,
    error: error
  };
};
// export const loadingAllOrders = () => {
//   return {
//     type: actionType.LOADING_ALL_ORDERS
//   };
// };
export const fetchOrderInit = () => {
  return dispatch => {
    axios
      .get("/order.json")
      .then(response => {
        console.log("orders get", response.data);
        let fetchData = [];
        for (let key in response.data) {
          fetchData.push({ ...response.data[key], id: key });
        }
        dispatch(fetchAllOrders(fetchData));
      })
      .catch(() => {
        dispatch(failFetchOrder());
      });
  };
};
