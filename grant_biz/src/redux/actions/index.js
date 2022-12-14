import { ActionTypes } from "../contents/action-types";


export const signIn = () => {
  return {
    type: 'SIGN_IN',
  }
}

export const setProducts = (products) => {
  return {
    type: ActionTypes.SET_PRODUCTS,
    payload: products,
  }
}

export const selectedProduct = (product) => {
  return {
    type: ActionTypes.SELECTED_PRODUCT,
    payload: product,
  };
};
export const FeedProducts = (product) => {
  return {
    type: ActionTypes.SET_FEED_PRODUCTS,
    payload: product,
  };
};

export const removeSelectedProduct = () => {
  return {
    type: ActionTypes.REMOVE_SELECTED_PRODUCT,
  };
};

export const setCurrentUser = (currentUser) => {
  return {
    type: ActionTypes.SET_CURRENT_USER,
    payload: currentUser,
  }
}

export const setProductStore = (procutStore) => {
  return {
    type: ActionTypes.SET_PRODUCT_STORE,
    payload: procutStore,
  }
}
export const setStoreProducts = (storeProducts) => {
  return {
    type: ActionTypes.SET_STORE_PRODUCTS,
    payload: storeProducts,
  }
}
