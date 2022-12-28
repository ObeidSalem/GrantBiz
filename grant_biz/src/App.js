import React, { useEffect } from "react";
import logo from "./logo.svg";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
// import { Redirect } from 'react-router';
import "./App.css";
import "./styles.css";
import HomePage from "./Components/Home/HomePage";
import SignIn from "./Components/Auth/SignIn";
import SignUp from "./Components/Auth/SignUp";
import Profile from "./Components/Profile/Profile";
import MyShop from "./Components/Shop/MyShop";
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
import QRCheckout from "./Components/Order/QRCheckout";
import { setCurrentUser, setProducts } from './redux/actions/index';
import StorePage from "./Components/Home/StorePage"
import ReceivedOrders from "./Components/Shop/ReceivedOrders";
import FutureUpdate from "./Components/FutureUpdate";
import PageNotFound from "./Components/PageNotFound";
import PostFeed from "./Components/Shop/PostFeed";
import SellerDispute from "./Components/Shop/SellerDispute";
import CustomerDispute from "./Components/Order/CustomerDispute";
import PrivateRoutes from "./utils/PrivateRoutes";


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
              <Route exact path="" element={<HomePage />}/>
              <Route path="/SignIn" element={<SignIn />} /> 
              <Route path="/SignUp" element={<SignUp />} />
              <Route path="/Feed" element={<Feed />} />
              <Route path="/FutureUpdate" element={<FutureUpdate />} />
              <Route element={<PrivateRoutes />}>
                  <Route path="/Profile" element={<Profile />} />               {/* Has to be logged */}
                  <Route path="/Order" element={<Order />} />               {/* Has to be logged */}
                  <Route path="/Cart" element={<Cart />} />               {/* Has to be logged */}
                  <Route path="/ReceivedOrders/:email" element={<ReceivedOrders />} />                {/* Has to be logged */}
                  <Route path="/MenageProduct/:email" element={<MenageProduct />} />               {/* Has to be logged */}
                  <Route path="/PostFeed/:email" element={<PostFeed />} />               {/* Has to be logged */}
                  <Route path="/AddProduct/:email" element={<AddProduct />} />               {/* Has to be logged */}
                  <Route path="/SaleAnalysis/:email" element={<SaleAnalysis />} />               {/* Has to be logged */}
                  <Route path="/QRCheckout/:orderId" element={<QRCheckout />} />               {/* Has to be logged */}
                  <Route path="/SellerDispute/:orderId" element={<SellerDispute />} />               {/* Has to be logged */}
                  <Route path="/CustomerDispute/:orderId" element={<CustomerDispute />} />               {/* Has to be logged */}
                  <Route path="/MyShop/:email/Create" element={<CreateMyShop />} />               {/* Has to be logged */} 
              </Route>
              <Route path="/product/:productId" element={<ProductDetails />} />
              <Route path="/StorePage/:email" element={<StorePage />} />
              <Route path="/MyShop/:email" element={<MyShop />} />
              <Route path="/ForgotPassword" element={<ForgotPassword />} />
              <Route path="*" element={<PageNotFound />} />    
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;