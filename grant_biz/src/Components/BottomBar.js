import React from "react";
import { Link } from "react-router-dom";


const BottomBar = () => {
  return (
    <div className="space-x-8">
      <Link to="/">Home</Link>
      <Link to="/">Feed</Link>
      <Link to="/">Massages</Link>
      <Link to="/">Cart</Link>
      <Link to="/MyShop">My shop</Link>
    </div>
  );
};

export default BottomBar;
