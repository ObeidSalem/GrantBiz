import {combineReducers} from "redux";
import loggedReducer from "./isLogged"
import allProducts from "./allProducts"
import currentUser from "./currentUser"

const allReducers = combineReducers({
    isLogged: loggedReducer,
    allProducts: allProducts,
    currentUser: currentUser,
})

export default allReducers;