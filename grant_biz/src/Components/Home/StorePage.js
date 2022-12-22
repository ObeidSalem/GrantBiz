import React, { useEffect, useState } from "react";
import BottomBar from "../Navigation/BottomBar";
import Search from "./Search";
import {
  IoStorefrontOutline,
  IoChatbubbleEllipsesOutline,
} from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { selectedProduct, removeSelectedProduct, setProductStore} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import {
  onSnapshot,
  collection,
  doc,
  setDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import db from "../../firebase";
import NavBar from "../Navigation/NavBar";
import { useAuth, UserAuth } from "../../context/AuthContext";
import { setCurrentUser } from "../../redux/actions/index";
import { IoStarOutline } from "react-icons/io5";
import { setProducts } from "../../redux/actions";



const StorePage = () => {
  const { email } = useParams();
  const StoreEmail = email ;
  const dispatch = useDispatch();

  ////////////////////////////////////////////////////////////////////////////
  const products = useSelector((state) => state.allProducts.products);

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


  const renderStoreProductsList = products.map((product, index) => {
    const { title, store_name, description, price, store_avatar, image, type, rate,id ,email } =product;
    if (email === StoreEmail)
    return (      
      <Link to={`/product/${id}`} className="bg-white" key={index}>
          <div className="">
            <div className="bg-white border-2 shadow-sl  hover:shadow-md rounded-2xl p-2 m-0" >
              <div className="">
                <img className="rounded-lg object-cover h-56 w-full" src={image} alt={title} />
              </div>
              <div className="">
                <div className="font-sans	">{title}</div>
                <div className="flex justify-between">
                <div className="font-sans	">{price}RM</div>
                <div className=" flow-root">
                <div className="font-sans	float-left ">{rate}</div>
                <IoStarOutline className="float-right w-5 h-5" />
                </div>
                </div>
                
              </div>
            </div>
          </div>
      </Link>
    );
  });

  ///////////////////////////////////////////////////////////////////////////
  const { user } = useAuth();
  console.log("hi2",user)


  const fetchUser = async () => {
    const docUsersRef = doc(db, "Users", email);
    const docSnap = await getDoc(docUsersRef);

    if (docSnap.exists()) {
      console.log("Document data product detail:", docSnap.data());
      dispatch(setProductStore(docSnap.data()));
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
    return docSnap.data();
  };
  const productStore = useSelector((state) => state.productStore);
  console.log("productStore",productStore )
   const { StoreLocation, store_avatar, StoreName } = productStore;


  useEffect(() => {
    if (email) fetchUser(email);
    else{}
  }, [email]);
  ///////////////////////////////////////////////////////////////////

  return (
    
    <>
        <div className="hidden md:block">
          <NavBar />
        </div>
      <div className=" bg-white pb-48 md:px-36 lg:px-96">
            <div className=" h-24 w-full rounded-xl p-3 my-4 px-2 ">
              <div className="flex justify-start ">
                <img
                  className="ml-1 w-20 h-20 rounded-full"
                  src={store_avatar}
                  alt="Rounded avatar"
                ></img>
                <div className="ml-6">
                  <div
                    
                    className="text-black font-semibold text-lg ml-2"
                  >
                    {StoreName}
                  </div>
                  {/* <div key={user.email}>{store_avatar}</div> */}
                  <div
                 
                    className="text-black font-semibold text-lg"
                  >
                   at {StoreLocation}
                  </div>
                </div>
              </div>
            </div>
            {/* main Components */}
            <div className="grid grid-cols-2 gap-2 xl:grid-cols-3 2xl:grid-cols-4 bg-white mx-2">
                {renderStoreProductsList}

            </div>
      </div>
      <BottomBar />
    </>
  );
};

export default StorePage;