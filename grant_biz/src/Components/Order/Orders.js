import React, { useEffect, useState } from "react";
import { IoArrowBackOutline, IoTrashOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BottomBar from "../Navigation/BottomBar";
import db from "../../firebase";
import {
  onSnapshot,
  collection,
  doc,
  setDoc,
  getDocs,
  getDoc,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import { setStoreProducts } from "../../redux/actions";
import CurrencyFormat from "react-currency-format";
import { setProducts ,  setProductStore} from "../../redux/actions";
import { UserAuth } from "../../context/AuthContext";

const Orders = () => {
  const { user } = UserAuth();

  // const [products, setProducts] = useState([]);

  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.currentUser);
  const {
    
    phone_number,
  } = currentUser;
  console.log("test 1",currentUser)


  
  const storeEmail = useSelector((state) => state.allProducts.products);

  const {
    email,
  } = storeEmail;
  console.log("test2",...storeEmail)

  // const products = useSelector((state) => state.storeProducts.products);
  // console.log("products", products)

  // const fetchProducts = async () => {

  //     const q = query(collection(db, "Orders"), where("userPhoneNumber", "==", phone_number));

  //     const querySnapshot = await getDocs(q);
  //     const data = [];
  //     querySnapshot.forEach((doc) => {
  //         // doc.data() is never undefined for query doc snapshots
  //         // console.log(doc.id, " => ", doc.data());
  //         data.push(doc.data())
  //     });
  //     // console.log("data", data);
  //     setProducts(data)
  //     dispatch(setStoreProducts(data))
  // }

  const products = useSelector((state) => state.allProducts.products);

  const fetchOrderProducts = () => {
    return onSnapshot(collection(db, "Orders"), (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      dispatch(setProducts(data));
      console.log(data);
    });
  };

  useEffect(() => {
    try {
      fetchOrderProducts();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const renderProductsList = products?.map((product, index) => {
    const {
      StoreName,
      description,
      image,
      price,
      rate,
      title,
      type,
      type_parameters,
      id,
      userPhoneNumber,
      
      storePhoneNumber,
      
      
    } = product;
    //  console.log("product", email);
    // buyer page
    if (userPhoneNumber === phone_number)
      return (
        <div className="p-4 mx-4 my-2 flex border border-gray-400 rounded-xl ">
          <div className="w-full flex flex-col justify-between items-center ">
            <div className="w-full flex flex-row justify-start items-center">
              <img
                src={image}
                alt={StoreName}
                className="text-black h-20 w-20 rounded active:text-primary"
              />
              <div className="w-full flex flex-col">
                <p className="text-lg ml-4">{title}</p>
                {/* <p className="text-md ml-4">
                  {type} {type_parameters}
                </p> */}
              </div>
              {/* <IoTrashOutline
                onClick={async () => {
                  await deleteDoc(doc(db, "Products", id));
                }}
                className="text-black h-8 w-10 mr-2 active:text-primary"
              /> */}
            </div>
            <p className="text-sm w-full ">{description}</p>

            <div className="w-full flex flex-row justify-between">
              <CurrencyFormat
                value={price}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"RM "}
              />
              {/* <p className="text-md ">Available Stocks</p> */}
            </div>
            {/* <div className="w-full flex flex-row justify-between">
                        <input type="button" value="Edit" className="text-white bg-primary px-2 py-1 rounded-full mr-2 w-full"></input>
                        <input type="button" value="Reviews" className="text-white bg-primary px-2 py-1 rounded-full mr-2"></input>
                        <input type="button" value="Stock Status" className="text-white bg-primary px-2 py-1 rounded-full ms-2"></input>
                    </div> */}
          </div>
        </div>
      );
  });

  useEffect(() => {
    try {
      fetchOrderProducts();
    } catch (error) {
      console.log(error);
    }
  }, []);

//   const StoreEmail =  products?.map((store_email, index) => {email }) =store_email;
//   const StoreEmail = useSelector((state) => state.product);
//   const {
//     email,
//   } = StoreEmail;
// const renderStoreEmailList = products?.map(product, index) =
//      {
    
//       email,
     
//     } = product;
//   console.log(store_email)

    //////////////////////////////////////////////////////////////////////////////////////////////////
// feth users to get seller info

const fetchUser = async () => {
    const docUsersRef = doc(db, "Users", email);
    const docSnap = await getDoc(docUsersRef);
  
    if (docSnap.exists()) {
      dispatch(setProductStore(docSnap.data()));
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
    return docSnap.data();
  };
  const procutStore = useSelector((state) => state.productStore);
  const { StoreLocation, store_avatar, StoreName } = procutStore;
  console.log("prodductstore", procutStore);
  
  useEffect(() => {
    if (email) fetchUser(email);
    else {
    }
  }, [email]);
  
  
  
  
  
  //////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="md:px-36 lg:px-96 bg-white">
      <div className="py-4 flex justify-start align-center">
        <Link to={`/`}>
          <IoArrowBackOutline className="text-black h-8 w-10 mr-2 active:text-primary" />
        </Link>
        <p className="text-2xl font-semibold w-full">Menage Products</p>
      </div>

      <div className="h-full flex justify-start align-center ">
        <div className=" w-full p-4 mx-4 ">
          <div className="w-full flex justify-between items-center">
            <div className="w-full flex justify-start items-center">
              <img
                src={store_avatar}
                alt={StoreName}
                className="text-black h-10 w-10 rounded-full active:text-primary"
              />
              <p className="text-lg ml-4">{StoreName}</p>
            </div>
            <Link
              to={`/AddProduct/${email}`}
              className="w-40 text-white text-center bg-red-600 p-2 rounded-full"
            >
              Add Product
            </Link>
          </div>
        </div>
      </div>

      <div className="h-full flex flex-col justify-start align-center ">
        {renderProductsList}
      </div>

      <BottomBar />
    </div>
  );
};

export default Orders;
