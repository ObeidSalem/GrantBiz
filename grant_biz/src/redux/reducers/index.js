import {combineReducers} from "redux";
import loggedReducer from "./isLogged"
import allProducts from "./allProducts"
import { productsReducer, selectedProductsReducer } from "./selectedProductsReducer"
import currentUser from "./currentUser"

const allReducers = combineReducers({
    isLogged: loggedReducer,
    allProducts: allProducts,
    product: selectedProductsReducer,
    currentUser: currentUser,
})

export default allReducers;