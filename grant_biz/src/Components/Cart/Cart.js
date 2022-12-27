import React, { useEffect, useState } from "react";
import BottomBar from "../Navigation/BottomBar";
import NavBar from "../Navigation/NavBar";
import db from "../../firebase";
import {
  onSnapshot,
  collection,
  doc,
  deleteDoc,
  setDoc,
  getDocs,
} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../redux/actions";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { async } from "@firebase/util";
import { Dialog } from "primereact/dialog";
import { IoArrowBackOutline } from "react-icons/io5";

const Cart = () => {
  const { user } = useAuth();
  const [paymentOptionBtnPopUp, setpaymentOptionBtnPopUp] = useState(false);
  const currentUser = useSelector((state) => state.currentUser);
  const { phone_number, location } = currentUser;

  const cart_products = useSelector((state) => state.allProducts.products);
  const dispatch = useDispatch();

  const fetchCartProducts = () => {
    return onSnapshot(collection(db, "Cart"), (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      dispatch(setProducts(data));
    });
  };

  useEffect(() => {
    try {
      fetchCartProducts();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const renderCartProductsList = cart_products.map((cart_product, index) => {
    const { title, email, image, id, productId } = cart_product;
    if (email === user?.email)
      return (
        <div className="bg-white w-fit m-4 ml-8" key={index}>
          {/* <Link to={`/product/${id}`}>  */}
          <div className="">
            <div className="bg-white hover:bg-secondary rounded-2xl p-2 mt-2 md:flex md:justify-start ">
              <img
                className="rounded-lg object-cover w-48 h-48"
                src={image}
                alt={title}
              />
              <div className=" ml-4">
                <div className="font-sans text-2xl">{title}</div>
                {/* <div className="font-sans text-sm text-gray-400">Size {Type_parameters}</div> */}
                <div className="mt-10 ">
                  <div className="flex justify-start">
                    <div>
                      <Link to={`/CartCheckout/${productId}`}>

                      <button
                        type="button"
                        value="buy now"
                        // onClick={() => setpaymentOptionBtnPopUp(true)}
                        onClick={async () => {
                          await deleteDoc(doc(db, "Cart", id));
                        }}
                        className="bg-primary border-2 rounded-full px-4 py-2 md:px-16  text-white font-bold text-sm justify-between"
                        >
                        Checkout
                      </button>
                        </Link>
                    </div>
                    <button
                      className="bg-red-500 border-2 rounded-full px-4 py-2 md:px-3 ml-6  text-white font-bold text-sm border-red-600 justify-between"
                      onClick={async () => {
                        await deleteDoc(doc(db, "Cart", id));
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* </Link>  */}
        </div>
      );
  });

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="">
      <div className="py-4 flex w-full justify-start align-center ml-4">
        <Link to={`/`}>
          <IoArrowBackOutline className="text-black h-8 w-10 mr-2 active:text-primary" />
        </Link>
        <p className="text-2xl font-semibold w-full">Back</p>
      </div>
      {/* main compponents */}
      <div className="px-6 pb-20 bg-white md:px-16 lg:px-56">
        <h1 className="  md:w-fit md:h-fit uppercase text-2xl font-sans md:px-16">
          My cart
        </h1>
        {/* product detail */}
        <div className=" mb-28 grid grid-cols-2 bg-white">
          {renderCartProductsList}
        </div>
      </div>
      <div>
        <BottomBar />
      </div>
    </div>
  );
};

export default Cart;
