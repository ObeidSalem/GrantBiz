import React, { useRef, useState } from 'react'
import BottomBar from "./BottomBar";
import NavBar from './NavBar';
import { IoArrowBackOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Alert, Button } from "@material-tailwind/react";
import { collection, doc, updateDoc, } from "firebase/firestore";
import db from "../firebase";
// import { useDispatch } from 'react-redux';
// import { setCurrentUser } from './redux/actions/index';

function CreateMyShop() {
    const currentUser = useSelector((state) => state.currentUser);
    const { email, store_avatar, store_name, store_location, store_type } = currentUser
   
    const navigate = useNavigate("");
    const [Error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [StoreName, setStoreName] = useState(store_name);
    const [StoreLocation, setStoreLocation] = useState(store_location);
    const [StoreType, setStoreType] = useState(store_type);

    const usersRef = collection(db, "Users");


    async function handleSubmit(newStore) {
        try {
          setError("");
          setLoading(true);
          const response = await updateDoc(doc(usersRef, email), {
            ...newStore, own_store:true,
          });
          if (response.hasOwnProperty('message')) {
              setError(response.message);
          }
          setLoading(false);
        } catch (err) {
            navigate("/");
          console.error(err);
          console.log("newStore", newStore)
        }
      }

    return (
        <>
            <div className="bg-white h-screen">
                <div className="px-6 bg-white md:px-36 lg:px-96">
                    <div className="my-10 flex justify-start align-center">
                        <Link to={`/`}><IoArrowBackOutline className="text-black h-8 w-10 mr-2 active:text-primary" /></Link>
                        <p className="text-2xl font-semibold w-full">Fill store information </p>
                    </div>
                    <br />
                    <form onSubmit={handleSubmit}>
                        <div className="mt-4">
                            <div className="flex justify-center">
                                <input
                                    type="text"
                                    name="StoreName"
                                    value={StoreName}
                                    onChange={(e) => setStoreName(e.target.value)}
                                    required
                                    className="text-white font-bold text-5xl text-center h-56 w-56  bg-primary  p-2 rounded-full "
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Store Name
                            </label>
                            <div className="flex flex-col items-start border-solid border-black ">
                                <input
                                    type="text"
                                    name="StoreName"
                                    value={StoreName}
                                    onChange={(e) => setStoreName(e.target.value)}
                                    required
                                    className="block w-full  p-2  mt-1 border-gray-300 rounded-md shadow-sm "
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Store Location
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="text"
                                    name="StoreLocation"
                                    value={StoreLocation}
                                    onChange={(e) => setStoreLocation(e.target.value)}
                                    required
                                    className="block  p-2 w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Store Type
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="text"
                                    name="StoreType"
                                    value={StoreType}
                                    onChange={(e) => setStoreType(e.target.value)}
                                    required
                                    className="block  p-2 w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="my-10 flex justify-center">
                            <div
                                onClick={() => handleSubmit({ StoreName, StoreLocation, StoreType })}
                                className="flex justify-center items-center px-4 py-2 w-full max-w-xs text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                            >Continue
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <BottomBar />
        </>
    )
}

export default CreateMyShop