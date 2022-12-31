import React from 'react'
import BottomBar from "./Navigation/BottomBar";
import { Link, } from 'react-router-dom';

import {
    IoArrowBackOutline,
    IoExtensionPuzzleOutline,
} from "react-icons/io5";
import { useAuth } from "../context/AuthContext"


function PageNotFound() {

    const { user } = useAuth()

    return (
        <>
            <div className="px-6 bg-white h-screen justify-center pb-16 md:px-36 lg:px-96">
                <div className="my-4 flex justify-start align-center">
                    <Link to={`/GrantBiz/MyShop/${user.email}`}>
                        <IoArrowBackOutline className="text-black h-8 w-10 mr-2 active:text-primary" />
                    </Link>
                    <p className="text-2xl font-semibold w-full">Page Not Found </p>
                </div>
                <div className="my-10">
                    <IoExtensionPuzzleOutline className="text-black h-56 w-full active:text-primary" />
                </div>
                <div className="flex justify-center my-10">
                    <h1 className="text-2xl font-semibold ">Ops, The page is not found 404!! </h1>
                </div>
                <div className="flex justify-center my-10">
                    <Link
                        to={`/GrantBiz/`}
                        className="flex justify-center items-center cursor-pointer mr-2 px-4 py-2 w-fit  text-white  bg-primary border border-transparent rounded-md active:bg-gray-900 false"
                    >
                        Home Page
                    </Link>
                </div>
            </div>
            <BottomBar />
        </>
    )
}

export default PageNotFound