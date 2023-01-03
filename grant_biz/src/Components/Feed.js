import React, { useEffect, useState } from "react";
import NavBar from "./Navigation/NavBar";
import { v4 as uuidv4 } from "uuid";

import db from "../firebase";
import {
  onSnapshot,
  collection,
  doc,
  setDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/actions";
import { Link } from "react-router-dom";
import ProductDetails from "./Home/ProductDetails";
import { IoArrowBack, IoStarOutline } from "react-icons/io5";
import { useAuth, UserAuth } from "../context/AuthContext";
import { setCurrentUser } from "../redux/actions/index";
import CurrencyFormat from "react-currency-format";

function Feed() {
  const products = useSelector((state) => state.allProducts.products);
  const dispatch = useDispatch();

  const fetchProducts = () => {
    return onSnapshot(collection(db, "Feed"), (snapshot) => {
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

  const renderFeedProductsList = products.map((FeedProduct, index) => {
    const {
      StoreName,
      feedDescription,
      id,
      // price,
      productId,
      store_avatar,
      baseFeedImage,
      title,
      store_email,
    } = FeedProduct;

    return (
      <div className="bg-white" key={index}>
        <Link to={`/GrantBiz/product/${productId}`}>
          <div className="">
            <div className="bg-white border-2 shadow-sl h-fit align-between hover:shadow-md rounded-2xl p-2 m-0">
              <div className="">
                <img
                  className="rounded-lg object-cover h-56 w-full"
                  src={baseFeedImage}
                  alt={title}
                />
              </div>
              <div className="">
                <div className="font-sans	text-xl">{title}</div>
                <div>{feedDescription}</div>
                <div className="my-2 h-fit">
                  {/* <CurrencyFormat
                    className="font-sans text-md"
                    value={price}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"RM "}
                  /> */}
                  <Link
                    to={`/GrantBiz/StorePage/${store_email}`}
                    className=""
                  >
                    <div className="flex flex-row justify-start h-fit w-full mt-4">
                      <img
                        className="ml-1 w-10 h-10 rounded-full"
                        src={store_avatar}
                        alt="Rounded avatar"
                      ></img>
                      <div className="ml-3 my-1">
                        <div className="text-black font-semibold text-lg">
                          {StoreName}
                        </div>
                      </div>
                    </div>
                  </Link>
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
      {/* <div className=" ml-2 inline-flex items-center mt-1 md:invisible">
        <Link to="/GrantBiz/">
      <IoArrowBack className="h-7 w-7"></IoArrowBack>
      </Link>
      <h1 className="ml-1 text-2xl font-mono font-bold ">Feed</h1>

      </div> */}

      <div className="px-6 pb-20 bg-white md:px-16 lg:px-56">
        <div className="my-4 grid grid-cols-2 gap-6 xl:grid-cols-3 2xl:grid-cols-4 bg-white">
          {renderFeedProductsList}
        </div>
      </div>
    </div>
  );
}

export default Feed;
