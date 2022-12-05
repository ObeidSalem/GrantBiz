import {combineReducers} from "redux";
import loggedReducer from "./isLogged"
import allProducts from "./allProducts"
import { productsReducer, selectedProductsReducer } from "./selectedProductsReducer"
import currentUser from "./currentUser"
import productStore from "./productStore"

const allReducers = combineReducers({
    isLogged: loggedReducer,
    allProducts: allProducts,
    product: selectedProductsReducer,
    currentUser: currentUser,
    productStore: productStore,
})

export default allReducers;