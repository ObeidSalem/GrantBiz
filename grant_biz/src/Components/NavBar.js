import React from "react";
import GrantBizLogo from "../img/GrantBiz_Logo.png";
import Search from "./Search";
import BottomBar from "./BottomBar";
import { Link } from "react-router-dom";


function NavBar() {
  return (
    <>
      {/* Nav bar */}
      <div className="elative flex flex-wrap items-center justify-center h-32 px-2 py-3 bg-white mb-3 border-b-2 border-gray-100">

        {/* logo only shows on PC */}
        <img src={GrantBizLogo} alt="Logo" className="pc-only md:w-24 md:h-24 ml-0 " />

        <div className="flex flex-col mx-0 px-3 w-full md:w-fit">

          {/* nav items PC only */}
          <div className="flex items-center justify-center ">
            <Link className="p-3 pc-only" to="/">Home</Link>
            <Link className="p-3 pc-only" to="/Feed">Feed</Link>
            <Link className="p-3 pc-only" to="/Massages">Massages</Link>
            <Link className="p-3 pc-only" to="/Cart">Cart</Link>
            <Link className="p-3 pc-only" to="/MyShop">My shop</Link>
          </div>


          <Search />
        </div>

        {/* PC version */}
        <div className="flex justify-center pc-only md:justify-end">
          <Link className='md: btn rounded-full py-2 px-4 md:border-2' to='/SignIn'>
            <input type="button" value="SING IN"></input>
          </Link>
          <Link className='md: btn rounded-full py-2 px-4 ml-2  md:border-2 bg-gray-300' to='/SignUp'>
            <input type="button" value="SING UP"></input>
          </Link>
        </div>

      </div>
      <BottomBar />
    </>
  );
}

export default NavBar;
