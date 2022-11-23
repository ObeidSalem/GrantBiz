import { ActionTypes } from "../contents/action-types";

const intiState = ""
const currentUser = (state = intiState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_CURRENT_USER:
            return { currentUser: payload };
        default:
            return state;
    }
}

export default currentUser;