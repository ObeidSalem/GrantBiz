import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoHomeOutline, IoPlayCircleOutline, IoChatbubblesOutline, IoCartOutline, IoStorefrontOutline } from "react-icons/io5";


const BottomBar = () => {

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  

  return (
    <div className="fixed bottom-0 w-full bg-white border border-gray-200 m-only">
      <div className="flex items-center justify-center">
        <NavLink className="text-black p-2 active:text-primary	" activeClassName="text-primary" to="/" onClick={handleClick}>
          <IoHomeOutline className="text-black h-6 w-full active:text-primary" />
          Home
        </NavLink>
        <NavLink className="text-black p-2 active:text-primary	" to="/Feed" onClick={handleClick}>
          <IoPlayCircleOutline className="text-black h-6 w-full active:text-primary" /> 
          Feed
        </NavLink>
        <NavLink className="text-black p-2 active:text-primary	" to="/Massages" onClick={handleClick}>
          <IoChatbubblesOutline className="text-black h-6 w-full active:text-primary" />
          Massages
        </NavLink>
        <NavLink className="text-black p-2 active:text-primary	" to="/Cart" onClick={handleClick}>
          <IoCartOutline className="text-black h-6 w-full active:text-primary" />
          Cart
        </NavLink>
        <NavLink className="text-black p-2 active:text-primary	" to="/Myshop" onClick={handleClick}>
          <IoStorefrontOutline className="text-black h-6 w-full active:text-primary" />
          My shop
        </NavLink>
      </div>
    </div>
  );
};

export default BottomBar;
