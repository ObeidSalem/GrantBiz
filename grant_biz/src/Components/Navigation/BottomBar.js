import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoHomeOutline, IoPlayCircleOutline, IoChatbubblesOutline, IoCartOutline, IoStorefrontOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';


const BottomBar = () => {

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const currentUser = useSelector((state) => state.currentUser);
  const {email} = currentUser

  return (
    <div className="fixed bottom-0 w-full bg-white border border-gray-200 m-only">
      <div className="flex items-center justify-center w-screen space-x-0">
        <NavLink className="text-black py-3 text-sm text-center active:text-primary w-20" to="/" onClick={handleClick}>
          <IoHomeOutline className="text-black h-6 w-full active:text-primary" />
          Home
        </NavLink>
        <NavLink className="text-black py-3 text-sm text-center active:text-primary w-20" to={`/FutureUpdate`} onClick={handleClick}>
          <IoPlayCircleOutline className="text-black h-6 w-full active:text-primary" /> 
          Feed
        </NavLink>
        <NavLink className="text-black py-3 text-sm text-center active:text-primary w-20" to="/Order" onClick={handleClick}>
          <IoChatbubblesOutline className="text-black h-6 w-full active:text-primary" />
          Order
        </NavLink>
        <NavLink className="text-black py-3 text-sm text-center active:text-primary w-20" to="/Cart" onClick={handleClick}>
          <IoCartOutline className="text-black h-6 w-full active:text-primary" />
          Cart
        </NavLink>
        <NavLink className="text-black py-3 text-sm text-center active:text-primary w-20" to={`/MyShop/${email}`} onClick={handleClick}>
          <IoStorefrontOutline className="text-black h-6 w-full active:text-primary" />
          My shop
        </NavLink>
      </div>
    </div>
  );
};

export default BottomBar;
