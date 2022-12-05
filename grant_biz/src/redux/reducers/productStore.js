import { ActionTypes } from "../contents/action-types";

const intiState = {StoreName:"" , store_avatar:"", StoreLocation:""}
const productStore = (state = intiState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_PRODUCT_STORE:
            return { ...payload };
        default:
            return state;
    }
}

export default productStore;