import {combineReducers} from "redux";
import loggedReducer from "./isLogged"
import allProducts from "./allProducts"
import { productsReducer, selectedProductsReducer } from "./selectedProductsReducer"

const allReducers = combineReducers({
    isLogged: loggedReducer,
    allProducts: allProducts,
    product: selectedProductsReducer,
})

export default allReducers;