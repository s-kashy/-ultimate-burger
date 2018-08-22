import * as actionType from "../actions/actionType";
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};
const initialState = {
  ingredients: null,
  error: false,
  total_price: 4
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        total_price:
          state.total_price + INGREDIENT_PRICES[action.ingredientName]
      };

    case actionType.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        total_price:
          state.total_price - INGREDIENT_PRICES[action.ingredientName]
      };
    case actionType.GET_INGREDIENTS:
      return {
        ...state,
        error: false,
        ingredients: action.ingredients
      };
    case actionType.FETCH_INGREDIENTS_FAIL:
      return {
        ...state,
        error: true
      };
    default:
      return state;
  }
};
export default reducer;
