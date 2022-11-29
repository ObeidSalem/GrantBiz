import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { v4 as uuidv4 } from "uuid";

import db from "../firebase"
import { onSnapshot, collection, doc, setDoc, getDocs,getDoc } from "firebase/firestore"
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/actions";
import { Link } from "react-router-dom";
import ProductDetails from "./ProductDetails"
import { IoArrowBack, IoStarOutline } from "react-icons/io5";
import { useAuth, UserAuth } from "../context/AuthContext";
import { setCurrentUser } from "../redux/actions/index";



function Feed() {

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
    const { title, store_name, description, price, image, type, rate,id,email,store_avatar,StoreName, store_id  } =product;
    console.log()
    
    // console.log('Added document with ID: ', product.id);
    return (
      <div className="bg-white" key={index}>
         <Link to={`/product/${id}`}> 
          <div className="">
            <div className="bg-white hover:bg-secondary rounded-2xl p-2 m-0">
              <div className="">
                <img className="rounded-lg object-cover h-56 w-full" src={image} alt={title} />
              </div>
              <div className="">
                <div className="font-sans	">{title}</div>
                <div className="flex justify-between">
                <div className=" inline-flex items-start">
                <img class="inline-block ml-1 w-10 h-10 rounded-full"
                  src={store_avatar}
                  alt="Rounded avatar"
                ></img>
                <div className="inline-block mt-2">{StoreName}</div>
                </div>

                <div className=" flow-root mt-2">
                <div className="font-sans	float-left ">{rate}</div>
                <IoStarOutline className="float-right w-5 h-5" />
                </div>
                </div>
                
              </div>
            </div>
          </div>
        </Link> 
      </div>
    );
  });

  ///////////////////////////////////////////////////////////////////////////

//  const currentUser = useSelector((state) => state.currentUser);
//  const { user } = useAuth();

//  const { StoreLocation, store_avatar, StoreName } = currentUser;

//  const fetchUser = async () => {
//    const docUsersRef = doc(db, "Users", products.email);
//    const docSnap = await getDoc(docUsersRef);

//    if (docSnap.exists()) {
//      console.log("Document data:", docSnap.data());
//      dispatch(setCurrentUser(docSnap.data()));
//    } else {
//      // doc.data() will be undefined in this case
//      console.log("No such document!");
//    }
//    return docSnap.data();
//  };

//  useEffect(() => {
//    if (user.email) fetchUser(user.email);
//  })

 ///////////////////////////////////////////////////////////////////////////


  return (
    <div className="bg-white">
      <NavBar />
      <div className=" ml-2 inline-flex items-center mt-1 md:invisible">
        <Link to="/">
      <IoArrowBack className="h-7 w-7"></IoArrowBack>
      </Link>
      <h1 className="ml-1 text-2xl font-mono font-bold ">Feed</h1>

      </div>
      
      <div className="px-6 pb-20 bg-background md:px-16 lg:px-56">
        <div className="my-4 grid grid-cols-2 gap-6 xl:grid-cols-3 2xl:grid-cols-4 bg-white">
          {renderProductsList}
        </div>
      </div>
    </div>
  );
}

export default Feed;