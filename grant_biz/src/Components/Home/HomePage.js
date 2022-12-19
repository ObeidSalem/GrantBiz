import React, { useEffect, useState } from "react";
import NavBar from "../Navigation/NavBar";
import { v4 as uuidv4 } from "uuid";

import db from "../../firebase"
import { onSnapshot, collection, doc, setDoc, getDocs } from "firebase/firestore"
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../redux/actions";
import { Link } from "react-router-dom";
import ProductDetails from "./ProductDetails"
import { IoStarOutline } from "react-icons/io5";
import CurrencyFormat from "react-currency-format";



function HomePage() {

  const products = useSelector((state) => state.allProducts.products);
  const dispatch = useDispatch();

  const fetchProducts = () => {
    return onSnapshot(collection(db, "Products"), (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data())
      dispatch(setProducts(data))
    })

  }

  useEffect(() => {

    try {
      fetchProducts()
    } catch (error) {
      console.log(error)
    }


  }, [])


  const renderProductsList = products.map((product, index) => {
    const { title, store_name, description, price, store_avatar, image, type, rate,id,isHide  } =product;
    if(!isHide)
    return (
      <div className="bg-white" key={index}>
         <Link to={`/product/${id}`}> 
          <div className="">
            <div className="bg-white border-2 shadow-sl  hover:shadow-md rounded-2xl p-2 m-0">
              <div className="">
                <img className="rounded-lg object-cover h-56 w-full" src={image} alt={title} />
              </div>
              <div className="">
                <div className="font-sans	text-2xl">{title}</div>
                <div className="flex justify-between">
                <CurrencyFormat className="font-sans	text-md" value={price} displayType={'text'} thousandSeparator={true} prefix={'RM '} />
                <div className=" flow-root">
                {/* <div className="font-sans	float-left ">{rate}</div> */}
                {/* <IoStarOutline className="float-right w-5 h-5" /> */}
                </div>
                </div>
                
              </div>
            </div>
          </div>
        </Link> 
      </div>
    );
  });

  return (
    <div className="bg-white">
      <NavBar />
      <div className="px-6 pb-20 bg-white md:px-16 lg:px-56">
        <div className="my-4  bg-white">
          <div className="flex justify-between my-2">
            <p className="text-2xl bold ">Special Products</p>
            <p className="text-2xl bold ">See All</p>
          </div>
          <img 
            className="rounded-xl object-cover image fit h-56 w-full 2xl:h-96 border-gray-600" 
            src={"https://images.pexels.com/photos/8250738/pexels-photo-8250738.jpeg?auto=compress&cs=tinysrgb&w=600"} 
            alt={"title"} 
          />
        </div>
        <div className="my-4">
          {/* {renderCategoryList} */}
        </div>
        <div className="grid grid-cols-2 gap-2 xl:grid-cols-3 2xl:grid-cols-4 bg-white">
          {renderProductsList}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
