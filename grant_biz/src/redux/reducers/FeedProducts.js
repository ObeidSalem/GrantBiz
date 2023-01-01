import { ActionTypes } from "../contents/action-types";

const intiState = {
    products: [],
}
const FeedProducts = (state = intiState, {type, payload}) => {
    switch (type) {
        case ActionTypes.SET_FEED_PRODUCTS:
            return { ...state, products: payload };
        default:
            return state;
    }
}

export default FeedProducts;
