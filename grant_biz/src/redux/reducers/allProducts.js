import { ActionTypes } from "../contents/action-types";

const intiState = {
    products: [],
}
const allProducts = (state = intiState, {type, payload}) => {
    switch (type) {
        case ActionTypes.SET_PRODUCTS:
            return { ...state, products: payload };
        default:
            return state;
    }
}

export default allProducts;