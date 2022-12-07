import { ActionTypes } from "../contents/action-types";

const intiState = {
    products: [],
}
const storeProducts = (state = intiState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_STORE_PRODUCTS:
            return { ...state, products: payload };
        default:
            return state;
    }
}

export default storeProducts;