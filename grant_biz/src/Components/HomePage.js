import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";

import db from "../firebase"
import { onSnapshot, collection, doc, setDoc, getDocs } from "firebase/firestore"
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../actions";



function HomePage() {

  const products = useSelector((state) => state.allProducts.products);
  const dispatch = useDispatch;
  const [useStateProducts, setUseStateProducts] = useState()

  useEffect(() => {

    onSnapshot(collection(db, "Products"), (snapshot) => {
      console.log(snapshot.docs.map(doc => doc.data()));
      setUseStateProducts(snapshot.docs.map(doc => doc.data()));
      console.log("useStateProducts", useStateProducts);
      dispatch(setProducts(useStateProducts))
    })

  }, []) 

  return (
    <>
      <NavBar />
      <div>

      </div>
    </>
  );
}

export default HomePage;
