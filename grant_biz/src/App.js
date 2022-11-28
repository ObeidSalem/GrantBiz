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
import HomePage from "./Components/HomePage";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Profile from "./Components/Profile";
import MyShop from "./Components/MyShop";
import Product from "./Components/Product";
import Feed from "./Components/Feed";
import Massages from "./Components/Massages";
import Cart from "./Components/Cart";
import ProductDetails from "./Components/ProductDetails";
import ForgotPassword from "./Components/ForgotPassword";
import { useAuth } from './context/AuthContext';
import { ThemeProvider } from "@material-tailwind/react";
import db from "./firebase"
import { onSnapshot, collection, doc, setDoc, getDocs, getDoc } from "firebase/firestore"
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from './redux/actions/index';
import CreateMyShop from "./Components/CreateMyShop";


function App() {

  const currentUser = useSelector((state) => state.currentUser);
  console.log("currentUser", currentUser)
  const dispatch = useDispatch();
  const { user } = useAuth()

  const fetchUser = async () => {
    const docUsersRef = doc(db, "Users", user.email);
    const docSnap = await getDoc(docUsersRef);

    if (docSnap.exists()) {
      console.log("Document data: in app", docSnap.data());
      dispatch(setCurrentUser(docSnap.data()))

    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
    return docSnap.data()
  }

  useEffect(() => {
    try {
      fetchUser()
    } catch (error) {
      console.log(error)
    }
  }, [user])

  return (
    <>
      <ThemeProvider>
        <Router>
          <div className="content-center bg-background min-h-screen overflow-auto">
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route path="/SignIn" element={<SignIn />} />
              <Route path="/SignUp" element={<SignUp />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/Feed" element={<Feed />} />
              <Route path="/Massages" element={<Massages />} />
              <Route path="/Cart" element={<Cart />} />
              <Route path="/product/:productId" element={<ProductDetails />} />
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
