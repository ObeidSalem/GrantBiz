import React, { useEffect, useState } from "react";
import NavBar from "../Navigation/NavBar";
import GrantBizAD from "../../img/GrantBiz_Logo_AD.svg";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import { setProducts } from "../../redux/actions";
import {
  onSnapshot,
  collection,
  doc,
  setDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import db from "../../firebase";

function HomePage() {
  const dispatch = useDispatch();
  function refreshPage() {
    window.location.reload(false);
  }

  const products = useSelector((state) => state.allProducts.products);
  const fetchProducts = () => {
    return onSnapshot(collection(db, "Products"), (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      dispatch(setProducts(data));
    });
  };

  useEffect(() => {
    try {
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  }, []);
  const renderProductsList = products.map((product, index) => {
    const { title, price, image, id, isHide } = product;

    if (!isHide)
      return (
        <div className="bg-white" key={index}>
          <Link to={`/GrantBiz/product/${id}`}>
            <div className="">
              <div className="bg-white border-2 shadow-sl h-80 align-between hover:shadow-md rounded-2xl p-2 m-0">
                <div className="">
                  <img
                    className="rounded-lg object-cover h-56 w-full"
                    src={image}
                    alt={title}
                  />
                </div>
                <div className="">
                  <div className="font-sans	text-xl">{title}</div>
                  <div className="flex justify-between">
                    <CurrencyFormat
                      className="font-sans	text-md"
                      value={price}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"RM "}
                    />
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

  // useEffect(
  //   )
  //   useEffect(() => {
  //    refreshPage()
  //   // Run! Like go get some data from an API.
  // }, []);
  return (
    <div className="bg-white">
      <NavBar />
      <div className="px-6 pb-20 bg-white md:px-16 lg:px-56">
        <div className="my-4  bg-white">
          <div className="flex justify-between my-2">
            {/* <p className="text-2xl bold ">Special Products</p> */}
            {/* <p className="text-2xl bold ">See All</p> */}
          </div>
          <img
            className="border rounded-xl object-cover image fit h-56 w-full 2xl:h-96 border-gray-300"
            src={GrantBizAD}
            alt={"title"}
          />
        </div>
        <div className="my-4">{/* {renderCategoryList} */}</div>
        <div className="grid grid-cols-2 gap-2 xl:grid-cols-3 2xl:grid-cols-4 bg-white">
          {renderProductsList}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
