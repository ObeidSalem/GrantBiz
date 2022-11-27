import React from 'react'
import BottomBar from "./BottomBar";
import NavBar from './NavBar';
import { IoStorefrontOutline, IoArrowBackOutline } from "react-icons/io5";
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import { setCurrentUser } from './redux/actions/index';

function MyShop() {

  const { userId } = useParams();

  const currentUser = useSelector((state) => state.currentUser);
  console.log("currentUser", currentUser)
  const { email, own_store, store_avatar, store_name, store_location, store_type } = currentUser
  return (
    <>
      <div className="bg-white h-screen">
        <div className="my-10 flex justify-start align-center">
          <Link to={`/`}>
            <IoArrowBackOutline className="text-black h-8 w-10 mr-2 active:text-primary" />
            </Link>
          <p className="text-2xl font-semibold w-full">My Shop </p>
        </div>
        <br />
        {own_store ?
          <div className="px-6 bg-white md:px-36 lg:px-96">
            <div className="my-10 flex justify-center">
              <img src={store_avatar} alt={store_name} className="text-black h-56 w-56 rounded-full active:text-primary" />
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
      <BottomBar />
    </>
  )
}

export default MyShop