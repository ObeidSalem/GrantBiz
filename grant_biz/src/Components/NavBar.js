import React from "react";
import GrantBizLogo from "../img/GrantBiz_Logo.png";
import Search from "./Search";
import BottomBar from "./BottomBar";
import { Link } from "react-router-dom";
import { IoPersonCircleOutline, IoHeartOutline, IoHeartSharp, IoNotificationsOutline, IoNotificationsSharp, IoExitOutline } from "react-icons/io5";
import { useAuth } from "../context/AuthContext"
import db from "../firebase"
import { onSnapshot, collection, doc, setDoc, getDocs, getDoc } from "firebase/firestore"
import { useSelector } from 'react-redux';

function NavBar() {
  const { user, logOut } = useAuth()
  // console.log("user", user)

  const currentUser = useSelector((state) => state.currentUser);
  const { email, store_avatar, StoreName, Name } = currentUser
  return (
    <>
      {/* Nav bar */}
      <div className="elative flex flex-wrap items-center justify-center h-fit px-2 py-3 bg-white border-b-2 border-gray-100">

        {/* logo only shows on PC */}
        <img src={GrantBizLogo} alt="Logo" className="pc-only md:w-24 md:h-24 ml-0 " />

        {/* Mobile version */}
        <div className='flex justify-between align-middle w-screen m-only'>
          <div className='w-full flex justify-start align-middle  m-only'>
            {user ?
              <>
                <Link to={`/MyShop/${email}`}>
                  {store_avatar ?
                    <img src={store_avatar} alt="Avatar" className="text-stone-400 h-16 w-full active:text-primary" />
                    :
                    <IoPersonCircleOutline className="text-stone-400 h-16 w-full active:text-primary" />
                  }
                </Link>
                {StoreName ?
                  <span className="flex items-center justify-center text-stone-500 px-2">{StoreName}</span>
                  :
                  <span className="flex items-center justify-center text-stone-500 px-2">{Name}</span>
                }
              </>
              :
              <div className="flex justify-between align-middle w-full ">
                <Link className="flex justify-start align-middle w-full " to='/SignIn'>
                  <img src={GrantBizLogo} alt="Avatar" className='w-20 ' />
                </Link>

                <div className="flex w-full items-center justify-end">
                  <Link className='btn rounded-full py-10 px-16 mx-2 border-stone-500 border-2 ' to='/SignIn'>
                    <input type="button" value="SING IN"></input>
                  </Link>
                  <Link className='btn rounded-full py-10 px-16 mx-2 border-2 bg-gray-300' to='/SignUp'>
                    <input type="button" value="SING UP"></input>
                  </Link>
                </div>
              </div>
            }
          </div>
          {user ?
            <div className='flex justify-center m-only'>
              <IoHeartOutline className="text-stone-400 h-full w-16 px-4 active:text-primary" />
              {/* <IoHeartSharp className="text-stone-400 h-full w-16 px-4 active:text-primary"/> */}
              <IoNotificationsOutline className="text-stone-400 h-full w-16 px-4 active:text-primary" />
              {/* <IoNotificationsSharp className="text-stone-400 h-full w-16 px-4 active:text-primary"/> */}
            </div>
            : ""}
        </div>

        <div className="flex flex-col px-3 w-full md:w-fit">

          {/* nav items PC only */}
          <div className="flex items-center justify-center ">
            <Link className="p-3 pc-only" to="/">Home</Link>
            <Link className="p-3 pc-only" to="/Feed">Feed</Link>
            <Link className="p-3 pc-only" to="/Massages">Massages</Link>
            <Link className="p-3 pc-only" to="/Cart">Cart</Link>
            <Link className="p-3 pc-only" to={`/MyShop/${email}`}>My shop</Link>
          </div>


          <Search />
        </div>

        {/* PC version */}
        <div className="flex justify-center pc-only md:justify-end">
          {user ?
            // {/* Logged version */}
            <div className='flex justify-between align-middle'>
              <div className='flex justify-center'>
                <div className='flex flex-col justify-center'>
                  {StoreName ?
                    <span className="flex items-center justify-center text-stone-500 px-2">{StoreName}</span>
                    :
                    <span className="flex items-center justify-center text-stone-500 px-2">{Name}</span>
                  }
                  <div className='flex justify-center'>
                    <IoHeartOutline className="text-stone-400 h-full w-10 px-2 active:text-primary" />
                    {/* <IoHeartSharp className="text-stone-400 h-full w-10 px-2 active:text-primary"/> */}
                    <IoNotificationsOutline className="text-stone-400 h-full w-10 px-2 active:text-primary" />
                    {/* <IoNotificationsSharp className="text-stone-400 h-full w-10 px-2 active:text-primary"/> */}
                    <IoExitOutline className="text-stone-400 h-full w-10 px-2 active:text-primary" onClick={() => logOut()} />
                  </div>
                </div>
                <Link to='/SignIn'>
                  {store_avatar ?
                    <img src={store_avatar} alt="Avatar" className="text-stone-400 h-16 w-full active:text-primary" />
                    :
                    <IoPersonCircleOutline className="text-stone-400 h-16 w-full active:text-primary" />
                  }
                </Link>
              </div>
            </div>
            :
            // {/* Not Logged version */}
            <div className="">
              <Link className='md: btn rounded-full py-2 px-4 md:border-2' to='/SignIn'>
                <input type="button" value="SING IN"></input>
              </Link>
              <Link className='md: btn rounded-full py-2 px-4 ml-2  md:border-2 bg-gray-300' to='/SignUp'>
                <input type="button" value="SING UP"></input>
              </Link>
            </div>
          }

        </div>
      </div>
      <BottomBar />
    </>
  );
}

export default NavBar;
