import { ActionTypes } from "../contents/action-types";

export const selectedProductsReducer = (state = {}, { type, payload }) => {
    console.log(type);
    switch (type) {
      case ActionTypes.SELECTED_PRODUCT:
        return { ...state, ...payload };
      case ActionTypes.REMOVE_SELECTED_PRODUCT:
        return {};
      default:
        return state;
    }
  };