import React from "react";
import GrantBizLogo from "../../img/GrantBiz_Logo.png";
import BottomBar from "./BottomBar";
import { Link } from "react-router-dom";
import { IoPersonCircleOutline} from "react-icons/io5";
import { useAuth } from "../../context/AuthContext"
import { useSelector } from 'react-redux';

function NavBar() {
  const { user } = useAuth()

  const currentUser = useSelector((state) => state.currentUser);
  const { email, Name, profile_avatar } = currentUser
  return (
    <>
      {/* Nav bar */}
      <div className="elative flex flex-wrap items-center justify-between px-6 bg-white md:px-16 lg:px-56 h-fit py-3  border-b-2 border-gray-100">

        {/* Mobile version */}
        <div className='flex justify-between align-middle w-screen m-only'>
          <div className='w-full flex justify-start align-middle  m-only'>
            {user ?
              <>
                <Link to={`/GrantBiz/Profile`}>
                  {profile_avatar ?
                    <img src={profile_avatar} alt="Avatar" className="text-stone-400 h-16 w-16 active:text-primary" />
                    :
                    <IoPersonCircleOutline className="text-stone-400 h-16 w-full active:text-primary" />
                  }
                </Link>
                <span className="flex items-center justify-center text-stone-500 px-2">{Name}</span>
              </>
              :
              <div className="flex justify-between align-middle w-full ">
                <Link className="flex justify-start align-middle w-full " to='/GrantBiz/SignIn'>
                  <img src={GrantBizLogo} alt="Avatar" className='w-20 ' />
                </Link>

                <div className="flex w-full items-center justify-end">
                <Link className='md: btn rounded-full py-2 px-4 md:border-2 border border-primary' to='/GrantBiz/SignIn'>
                    <input type="button" value="SING IN"></input>
                  </Link>
                  <Link className='md: btn rounded-full py-2 px-4 ml-2  md:border-2 text-white bg-primary' to='/GrantBiz/SignUp'>
                    <input type="button" value="SING UP"></input>
                  </Link>
                </div>
              </div>
            }
          </div>
          {/* {user ?
            <div className='flex justify-center m-only'>
              <IoHeartOutline className="text-stone-400 h-full w-16 px-4 active:text-primary" />
              <IoHeartSharp className="text-stone-400 h-full w-16 px-4 active:text-primary"/>
              <IoNotificationsOutline className="text-stone-400 h-full w-16 px-4 active:text-primary" />
              <IoNotificationsSharp className="text-stone-400 h-full w-16 px-4 active:text-primary"/>
            </div>
            : ""} */}
        </div>
        {/* logo only shows on PC */}
        <img src={GrantBizLogo} alt="Logo" className="pc-only md:w-24 md:h-24 ml-0 " />
        <div className="flex flex-col px-3 w-full md:w-fit">

          {/* nav items PC only */}
          <div className="flex items-center justify-center ">
            <Link className="p-3 pc-only" to="/GrantBiz/">Home</Link>
            <Link className="p-3 pc-only" to={`/GrantBiz/Feed`}>Feed</Link>
            <Link className="p-3 pc-only" to="/GrantBiz/Order">Order</Link>
            <Link className="p-3 pc-only" to="/GrantBiz/Cart">Cart</Link>
            <Link className="p-3 pc-only" to={`/GrantBiz/MyShop/${email}`}>My Shop</Link>
            <Link className="p-3 pc-only" to={`/GrantBiz/Profile`}>My Profile</Link>
          </div>


        </div>
        {/* <div className="w-fit">
          <Search />
        </div> */}

        {/* PC version */}
        <div className="flex justify-center pc-only md:justify-end">
          {user ?
            // {/* Logged version */}
            <div className='flex justify-between align-middle'>
              <div className='flex justify-between'>
                <div className='flex flex-col justify-center'>
                  <span className="flex items-center justify-center text-stone-500 px-2">{Name}</span>
                </div>
                <Link to='/Profile'>
                  {profile_avatar ?
                    <img src={profile_avatar} alt="Avatar" className="text-stone-400 h-16 w-16 active:text-primary" />
                    :
                    <IoPersonCircleOutline className="text-stone-400 h-16 w-full active:text-primary" />
                  }
                </Link>
              </div>
            </div>
            :
            // {/* Not Logged version */}
            <div className="">
              <Link className='md: btn rounded-full py-2 px-4 md:border-2 border border-primary' to='/SignIn'>
                <input type="button" value="SING IN"></input>
              </Link>
              <Link className='md: btn rounded-full py-2 px-4 ml-2  md:border-2 text-white bg-primary' to='/SignUp'>
                <input type="button" value="SING UP"></input>
              </Link>
            </div>
          }

        </div>

        {/* just to add margin :) */}
        <div>
        </div>

      </div>
      <BottomBar />
    </>
  );
}

export default NavBar;
