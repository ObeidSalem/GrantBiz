import React, { useEffect } from "react";
import logo from "./logo.svg";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import "./App.css";
import "./styles.css";
import HomePage from "./Components/Home/HomePage";
import SignIn from "./Components/Auth/SignIn";
import SignUp from "./Components/Auth/SignUp";
import Profile from "./Components/Profile/Profile";
import MyShop from "./Components/Shop/MyShop";
import Product from "./Components/Home/Product";
import Feed from "./Components/Feed";
import Order from "./Components/Order/Orders";
import SaleAnalysis from "./Components/Shop/SaleAnalysis";
import Cart from "./Components/Cart";
import ProductDetails from "./Components/Home/ProductDetails";
import ForgotPassword from "./Components/Auth/ForgotPassword";
import CreateMyShop from "./Components/Shop/CreateMyShop";
import MenageProduct from "./Components/Shop/MenageProduct";
import AddProduct from "./Components/Shop/AddProduct";
import { useAuth } from './context/AuthContext';
import { ThemeProvider } from "@material-tailwind/react";
import db from "./firebase"
import { onSnapshot, collection, doc, setDoc, getDocs, getDoc } from "firebase/firestore"
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setCurrentUser, setProducts } from './redux/actions/index';
import StorePage from "./Components/Home/StorePage"
import ReceivedOrders from "./Components/Shop/ReceivedOrders";



function App() {

  // const currentUser = useSelector((state) => state.currentUser);
  // console.log("currentUser", currentUser)
  const { user } = useAuth()
  const dispatch = useDispatch();

  // const products = useSelector((state) => state.allProducts.products);


  const fetchUser = async () => {
    try {
      const docRef = await doc(db, "Users", user.email);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        dispatch(setCurrentUser(docSnap.data()))

      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
      return docSnap.data()
    } catch (error) {
      // console.log(error)
    }
  }

  const fetchProducts = () => {
    return onSnapshot(collection(db, "Products"), (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data())
      dispatch(setProducts(data))
    })

  }

  useEffect(() => {

    try {
      fetchProducts()
    } catch (error) {
      console.log(error)
    }


  }, [])

  useEffect(() => {
    try {
      if(user){
        fetchUser()
      }
    } catch (error) {
      console.log(error)
    }
  }, [user])  

  return (
    <>
      <ThemeProvider>
        <Router>
          <div className="content-center bg-white min-h-screen overflow-auto">
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route path="/SignIn" element={<SignIn />} />
              <Route path="/SignUp" element={<SignUp />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/Feed" element={<Feed />} />
              <Route path="/Order" element={<Order />} />
              <Route path="/Cart" element={<Cart />} />
              <Route path="/ReceivedOrders/:email" element={<ReceivedOrders />} />
              <Route path="/MenageProduct/:email" element={<MenageProduct />} />
              <Route path="/AddProduct/:email" element={<AddProduct />} />
              <Route path="/SaleAnalysis/:email" element={<SaleAnalysis />} />
              <Route path="/product/:productId" element={<ProductDetails />} />
              <Route path="/StorePage/:email" element={<StorePage />} />
              <Route path="/MyShop/:email" element={<MyShop />} />
              <Route path="/MyShop/:email/Create" element={<CreateMyShop />} />
              <Route path="/ForgotPassword" element={<ForgotPassword />} />
              <Route path="/Product/:id" element={<Product />} />        
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;