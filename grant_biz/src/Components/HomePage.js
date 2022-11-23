import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";

import db from "../firebase"
import { onSnapshot, collection, doc, setDoc, getDocs } from "firebase/firestore"
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/actions";



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

  const renderCategoryList = products.map((product, index) => {
    return (<>Category List Yet to be developed</>)})
  const renderProductsList = products.map((product, index) => {
    const { title, store_name, description, price, store_avatar, image, type, rate} = product;
    // console.log(product)
    // console.log(index)
    return (
      <div className="" key={title}>
        {/* <Link to={`/product/${id}`}> */}
          <div className="">
            <div className="">
              <div className="">
                <img className="rounded-lg object-cover h-56 w-full" src={image} alt={title} />
              </div>
              <div className="">
                <div className="">{title}</div>
                <div className="">$ {price}</div>
                <div className="">{rate}</div>
              </div>
            </div>
          </div>
        {/* </Link> */}
      </div>
    );
  });

  return (
    <div className="bg-white">
      <NavBar />
      <div className="px-6 bg-white md:px-16 lg:px-56">
        <div className="my-4">
          <div className="flex justify-between my-2">
            <p className="text-2xl bold ">Special Products</p>
            <p className="text-2xl bold ">See All</p>
          </div>
          <img 
            className="rounded-lg object-cover image fit h-56 w-full 2xl:h-96" 
            src={"https://images.pexels.com/photos/8250738/pexels-photo-8250738.jpeg?auto=compress&cs=tinysrgb&w=600"} 
            alt={"title"} 
          />
        </div>
        <div className="my-4">
          {renderCategoryList}
        </div>
        <div className="my-4 grid grid-cols-2 gap-6 xl:grid-cols-3 2xl:grid-cols-4">
          {renderProductsList}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
