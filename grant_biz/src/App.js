import React from "react";
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

function App() {
  return (
    <>
      <Router>
        <div className="content-center bg-background min-h-screen overflow-auto">
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/SignUn" element={<SignUp />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Feed"   element={<Feed />} />
            <Route path="/Massages" element={<Massages />} />
            <Route path="/Cart"   element={<Cart />} />
            <Route path="/MyShop" element={<MyShop />} />
            <Route path="/Product/:id" element={<Product />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
