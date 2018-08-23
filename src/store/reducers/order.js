import * as actionType from "../actions/actionType";

const initialState = {
  orders: [],
  loading: false,
  error: "",
  purchased: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.STORE_BURGER_ORDER: {
      const newOrder = {
        ...action.orderData,
        id: action.id
      };
      return {
        ...state,
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
      };
    }
    case actionType.PURCHASE_BURGER_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false
      };
    }
    case actionType.PURCHASE_INIT: {
      return {
        ...state,
        purchased: false
      };
    }
    case actionType.LOADING_ORDER: {
      return {
        ...state,
        loading: true
      };
    }
    case actionType.LOADING_ALL_ORDERS: {
      return {
        ...state,
        loading: true
      };
    }
    case actionType.FAIL_ORDER_INIT: {
      return {
        ...state,
        error: action.error,
        loading: false
      };
    }
    case actionType.FETCH_ORDERS_INIT: {
      return {
        ...state,
        orders: action.orders,
        loading: false
      };
    }

    default:
      return state;
  }
};
export default reducer;
