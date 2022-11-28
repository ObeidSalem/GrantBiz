import React, { useEffect } from 'react'
import BottomBar from "./BottomBar";
import NavBar from './NavBar';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth } from "../context/AuthContext"
import {
  IoStorefrontOutline,
  IoArrowBackOutline,
  IoExtensionPuzzleOutline,
  IoArrowForwardOutline,
  IoCalculatorOutline
} from "react-icons/io5";

// import { useDispatch } from 'react-redux';
// import { setCurrentUser } from './redux/actions/index';

function MyShop() {
  const { user, logOut } = useAuth()

  const { userId } = useParams();

  const currentUser = useSelector((state) => state.currentUser);
  console.log("currentUser", currentUser)
  const { email, Name, own_store, store_avatar, StoreName, store_location, store_type } = currentUser

  return (
    <>
      {user ?
        <div className="bg-white h-screen">
          <div className="my-4 flex justify-start align-center">
            <Link to={`/`}>
              <IoArrowBackOutline className="text-black h-8 w-10 mr-2 active:text-primary" />
            </Link>
            <p className="text-2xl font-semibold w-full">My Shop </p>
          </div>
          <br />
          {own_store ?
            <div className="px-6 bg-white md:px-36 lg:px-96">
              <div className="my-0 flex justify-center">
                <img src={store_avatar} alt={StoreName} className="text-black h-32 w-32 rounded-full active:text-primary" />
              </div>
              <div className="flex justify-center my-2">
                <p className="text-2xl font-semibold ">{StoreName}</p>
              </div>
              <hr />
              <Link className="py-6 flex flex-row justify-between">
                <div className="flex flex-row justify-start">
                  <IoCalculatorOutline className="text-black h-8 w-10 mr-2 active:text-primary" />
                  <p className="text-xl font-semibold ">Cashier Mood</p>
                </div>
                <IoArrowForwardOutline className="text-black h-8 w-10 mr-2 active:text-primary" />
              </Link>
              <Link className="py-6 flex flex-row justify-between">
                <div className="flex flex-row justify-start">
                  <IoCalculatorOutline className="text-black h-8 w-10 mr-2 active:text-primary" />
                  <p className="text-xl font-semibold ">Edit Store Info</p>
                </div>
                <IoArrowForwardOutline className="text-black h-8 w-10 mr-2 active:text-primary" />
              </Link>
              <Link className="py-6 flex flex-row justify-between">
                <div className="flex flex-row justify-start">
                  <IoCalculatorOutline className="text-black h-8 w-10 mr-2 active:text-primary" />
                  <p className="text-xl font-semibold ">Products</p>
                </div>
                <IoArrowForwardOutline className="text-black h-8 w-10 mr-2 active:text-primary" />
              </Link>
              <Link className="py-6 flex flex-row justify-between">
                <div className="flex flex-row justify-start">
                  <IoCalculatorOutline className="text-black h-8 w-10 mr-2 active:text-primary" />
                  <p className="text-xl font-semibold ">Post Feed</p>
                </div>
                <IoArrowForwardOutline className="text-black h-8 w-10 mr-2 active:text-primary" />
              </Link>
              <Link className="py-6 flex flex-row justify-between">
                <div className="flex flex-row justify-start">
                  <IoCalculatorOutline className="text-black h-8 w-10 mr-2 active:text-primary" />
                  <p className="text-xl font-semibold ">Sale Analysis</p>
                </div>
                <IoArrowForwardOutline className="text-black h-8 w-10 mr-2 active:text-primary" />
              </Link>
              <Link onClick={() => logOut()} to="/" className="py-6 flex flex-row justify-between">
                <div className="flex flex-row justify-start">
                  <IoCalculatorOutline className="text-red-600 h-8 w-10 mr-2 active:text-primary" />
                  <p className="text-xl text-red-600 font-semibold ">Log Out</p>
                </div>
                <IoArrowForwardOutline className="text-red-600 h-8 w-10 mr-2 active:text-primary" />
              </Link>
            </div>
            :
            <div className="px-6 bg-white md:px-36 lg:px-96">
              <div className="my-10">
                <IoStorefrontOutline className="text-black h-56 w-full active:text-primary" />
              </div>
              <div className="flex justify-center my-10">
                <p className="text-2xl font-semibold ">You don't have a shop yet!! </p>
              </div>
              <div className="my-10 ">
                <p className="text-lg font-semibold ">
                  you can choose to create<br /></p>
                <ol className="list-decimal ml-4">
                  <li>E-physical store: have an actual store but with no delivery system</li>
                  <li>online shop: have delivery system</li>
                </ol>
              </div>
              <div className="my-10 flex justify-center">
                <Link
                  className="flex justify-center items-center px-4 py-2 w-full max-w-xs text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                  to={`/MyShop/${email}/Create`}
                >Create Yor Shop NOW!</Link>
              </div>
            </div>
          }
        </div>
        :
        <div className="px-6 bg-white h-screen md:px-36 lg:px-96">
          <div className="my-4 flex justify-start align-center">
            <Link to={`/`}>
              <IoArrowBackOutline className="text-black h-8 w-10 mr-2 active:text-primary" />
            </Link>
            <p className="text-2xl font-semibold w-full">My Shop </p>
          </div>
          <div className="my-10">
            <IoExtensionPuzzleOutline className="text-black h-56 w-full active:text-primary" />
          </div>
          <div className="flex justify-center my-10">
            <p className="text-2xl font-semibold ">You are not Logged In!! </p>
          </div>
          <div className="flex justify-center my-10">
            <p className="text-xl font-semibold ">You may login or signup from here</p>
          </div>
          <div className="my-10 flex justify-center">
            <Link className='btn rounded-full py-10 px-16 mx-2 text-xl border-stone-500 border-2 ' to='/SignIn'>
              <input type="button" value="SING IN"></input>
            </Link>
            <Link className='btn rounded-full py-10 px-16 mx-2 text-xl border-2 bg-gray-300' to='/SignUp'>
              <input type="button" value="SING UP"></input>
            </Link>
          </div>
        </div>
      }
      <BottomBar />
    </>
  )
}

export default MyShop