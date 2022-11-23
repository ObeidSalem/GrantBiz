import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoHomeOutline, IoPlayCircleOutline, IoChatbubblesOutline, IoCartOutline, IoStorefrontOutline } from "react-icons/io5";


const BottomBar = () => {

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  

  return (
    <div className="fixed bottom-0 w-full bg-white border border-gray-200 m-only">
      <div className="flex justify-around items-center justify-center w-screen space-x-0">
        <NavLink className="text-black py-3 text-sm text-center active:text-primary w-20" to="/" onClick={handleClick}>
          <IoHomeOutline className="text-black h-6 w-full active:text-primary" />
          Home
        </NavLink>
        <NavLink className="text-black py-3 text-sm text-center active:text-primary w-20" to="/Feed" onClick={handleClick}>
          <IoPlayCircleOutline className="text-black h-6 w-full active:text-primary" /> 
          Feed
        </NavLink>
        <NavLink className="text-black py-3 text-sm text-center active:text-primary w-20" to="/Massages" onClick={handleClick}>
          <IoChatbubblesOutline className="text-black h-6 w-full active:text-primary" />
          Massages
        </NavLink>
        <NavLink className="text-black py-3 text-sm text-center active:text-primary w-20" to="/Cart" onClick={handleClick}>
          <IoCartOutline className="text-black h-6 w-full active:text-primary" />
          Cart
        </NavLink>
        <NavLink className="text-black py-3 text-sm text-center active:text-primary w-20" to="/Myshop" onClick={handleClick}>
          <IoStorefrontOutline className="text-black h-6 w-full active:text-primary" />
          My shop
        </NavLink>
      </div>
    </div>
  );
};

export default BottomBar;
