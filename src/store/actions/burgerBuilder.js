import * as actionType from "./actionType";
import axios from "../../axios-order";

export const addIngredient = name => {
  return {
    type: actionType.ADD_INGREDIENT,
    ingredientName: name
  };
};
export const removeIngredient = name => {
  return {
    type: actionType.REMOVE_INGREDIENT,
    ingredientName: name
  };
};

export const fetchIngredientFail = () => {
  return {
    type: actionType.FETCH_INGREDIENTS_FAIL
  };
};
export const setIngredients = ingredients => {
  return {
    type: actionType.GET_INGREDIENTS,
    ingredients: ingredients
  };
};

export const initIngredient = () => {
  return dispatch => {
    axios
      .get("/ingredients.json ")
      .then(response => {
        dispatch(setIngredients(response.data));
      })
      .catch(err => {
        dispatch(fetchIngredientFail());
      });
  };
};
