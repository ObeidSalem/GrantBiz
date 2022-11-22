import {combineReducers} from "redux";
import loggedReducer from "./isLogged"
import allProducts from "./allProducts"

const allReducers = combineReducers({
    isLogged: loggedReducer,
    allProducts: allProducts,
})

export default allReducers;