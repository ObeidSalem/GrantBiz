import React from 'react'
import BottomBar from "./Navigation/BottomBar";
import { Link, } from 'react-router-dom';

import {
  IoArrowBackOutline,
  IoExtensionPuzzleOutline,
} from "react-icons/io5";
import { useAuth } from "../context/AuthContext"

function FutureUpdate() {
  const { user } = useAuth()


  return (
    <>
      <div className="px-6 bg-white h-screen  pb-16 md:px-36 lg:px-96">
        <div className="my-4 flex justify-start align-center">
          <Link to={`/GrantBiz/MyShop/${user.email}`}>
            <IoArrowBackOutline className="text-black h-8 w-10 mr-2 active:text-primary" />
          </Link>
          <p className="text-2xl font-semibold w-full">Future Update </p>
        </div>
        <div className="my-10">
          <IoExtensionPuzzleOutline className="text-black h-56 w-full active:text-primary" />
        </div>
        <div className="flex justify-center my-10">
          <h1 className="text-2xl font-semibold ">This Functionality has not been Developed Yet!! </h1>
        </div>
        <div className="flex justify-center my-10">
          <p className="text-xl font-semibold ">Stay Tunned!!</p>
        </div>
      </div>
      <BottomBar/>
    </>
  )
}

export default FutureUpdate