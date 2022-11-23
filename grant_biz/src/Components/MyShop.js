import React from 'react'
import BottomBar from "./BottomBar";
import NavBar from './NavBar';
import { IoStorefrontOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';


function MyShop() {
  return (
    <>
      <div className="bg-white h-screen">
        <NavBar />
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
            <ol class="list-decimal ml-4">
              <li>E-physical store: have an actual store but with no delivery system</li>
              <li>online shop: have delivery system</li>
            </ol>
          </div>
          <div className="my-10 ">
            <Link
              className="flex justify-center items-center px-4 py-2 w-full text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
              to="/SignUp"
            >Create Yor Shop NOW!</Link>
          </div>
        </div>
      </div>
      <BottomBar />
    </>
  )
}

export default MyShop