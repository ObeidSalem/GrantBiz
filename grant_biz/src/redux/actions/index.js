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

export const setCurrentUser = (currentUser) => {
    return {
        type: ActionTypes.SET_CURRENT_USER,
        payload: currentUser,
    }
}