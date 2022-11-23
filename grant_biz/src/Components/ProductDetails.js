import React, { useEffect, useState } from "react";
import BottomBar from "./BottomBar";
import Search from "./Search";
import { IoHomeOutline } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { selectedProduct, removeSelectedProduct } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import {
  onSnapshot,
  collection,
  doc,
  setDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import db from "../firebase";

const ProductDetails = () => {
  const { productId } = useParams();

  const dispatch = useDispatch();
  const docRef = doc(db, "Products", productId);
  const fetchProductDetail = async (id) => {
    const response = await getDoc(docRef);
    if (response.exists()) {
      const data = response.data()
      dispatch(selectedProduct(data));
    } else {
      console.log("Document does not exist");
    }
  };

  const product = useSelector((state) => state.product);
  const { image, title, price, type, description, store_name, id, rate } = product;

  useEffect(() => {
    if (productId && productId !== "") fetchProductDetail(productId);
    console.log("has has been")
    return () => {
      dispatch(removeSelectedProduct());
    };
  }, []);

  return (
    <div>
      <div className="bg-white">
        <Search />
        <div className="px-6 bg-white md:px-16 lg:px-56">
          <div className="my-4"></div>
          <div className="my-4">{/* {renderCategoryList1} */}</div>
          <div className="my-4 grid grid-cols-2 gap-6 xl:grid-cols-3 2xl:grid-cols-4">
            <div className="">
              <div className="">
                <div className="">
                  <img
                    className="rounded-lg object-cover h-56 w-full"
                    src={image}
                    alt={title}
                  />
                </div>
                <div className="">
                  <div className="">{title}</div>
                  <div className="">$ {price}</div>
                  <div className="">{rate}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
