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

  const renderList = products.map((product) => {
    console.log("product", product)
    const { id, title, store_name, description, price, store_avatar, image, type, rate} = product;
    return (
      <div className="" key={id}>
        {/* <Link to={`/product/${id}`}> */}
          <div className="">
            <div className="">
              <div className="">
                <img src={image} alt={title} />
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
    <>
      <NavBar />
        {renderList}
    </>
  );
}

export default HomePage;
