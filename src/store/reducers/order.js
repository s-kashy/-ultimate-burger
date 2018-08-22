import * as actionType from "../actions/actionType";

const initialState = {
  orders: null,
  loading: false,
  error: "",
  backHome: false
};

const reducer = (state = initialState, active) => {
  switch (actionType.type) {
    case actionType.STORE_BURGER_ORDER: {
      const newOrder = {
        ...action.orderData,
        id: action.id
      };
      return {
        ...state,
        loading: false,
        backHome: true,
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
    case actionType.REDIRECT_TO_HOME: {
      return {
        ...state,
        backHome: false
      };
    }
    case actionType.LOADING_ORDER: {
      return {
        ...state,
        loading: true
      };
    }
  }
};
export default reducer;
