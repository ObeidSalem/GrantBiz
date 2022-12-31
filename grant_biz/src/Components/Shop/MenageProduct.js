import React, { useEffect, useState } from "react";
import { IoArrowBackOutline, IoTrashOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate , Link, } from "react-router-dom";
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
  updateDoc,
} from "firebase/firestore";
import CurrencyFormat from "react-currency-format";
import { UserAuth } from "../../context/AuthContext";

const MenageProduct = () => {
  const { user } = UserAuth();

  const [products, setProducts] = useState([]);
  const [enabled, setEnabled] = useState(true);
  const [QuantityCheck, setQuantityCheck] = useState("");
  const navigate = useNavigate("");



  const currentUser = useSelector((state) => state.currentUser);
  const {
    email,
    store_avatar,
    StoreName,
  } = currentUser;


  const fetchProducts = async () => {
    const q = query(
      collection(db, "Products"),
      where("email", "==", user.email)
    );

    const querySnapshot = await getDocs(q);
    const data = [];
    querySnapshot.forEach((doc) => {
    
      data.push(doc.data());
    });
    // console.log("data", data);
    setProducts(data);
    // dispatch(setStoreProducts(data))
  };
  async function  updateQuantity (id){

    await updateDoc(doc(db, "Products",id), {
      quantity:QuantityCheck,
    });
    // refreshPage()
    navigate('/MyShop/${email}');
  }

  function refreshPage() {
    window.location.reload(false);
  }

  const renderProductsList = products?.map((product, index) => {
    const {
      StoreName,
      description,
      image,
      price,
      title,
      type,
      type_parameters,
      id,
    } = product;
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
              <p className="text-md ml-4">
                {type} {type_parameters}
              </p>
            </div>
            <IoTrashOutline
              onClick={async () => {
                await deleteDoc(doc(db, "Products", id));
              }}
              className="text-black h-8 w-10 mr-1 md:mr-2 active:text-primary"
              />
            <div>
              <div className="flex">
                <label className="inline-flex relative items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={!enabled}
                    readOnly
                    />
                  <div
                    onClick={async () => {
                      setEnabled(!enabled);
                      await updateDoc(doc(db, "Products", id),
                      {
                        isHide:enabled
                      });
                      
                      console.log(enabled);
                    }}
                    className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                    ></div>
                  <span className="ml-2 text-sm font-medium text-gray-900">
                    Hide
                  </span>
                </label>
              </div>
            </div>
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
          <div className="mt-4 flex">
              <label
                htmlFor=""
                className="block text-sm md:text-lg font-medium text-gray-700 mt-1 mr-1 undefined"
                >
               edit quantity
              </label>
              <div className="flex items-start">
                <input
                  type="number"
                  name="price"
                  // value={QuantityCheck}
                  onChange={(e) => setQuantityCheck(e.target.value)}
                  className="block w-full  p-2  border border-gray-400 rounded-md shadow-sm outline-none"
                  />
                <div
                onClick={() => updateQuantity(id)}
                className="flex justify-end items-center cursor-pointer ml-2 px-4 py-2 w-fit max-w-xs text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                >
                Add
              </div>
              </div>
            </div>
        </div>
      </div>
    );
  });
  
  useEffect(() => {
    try {
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  }, [products]);
  
  
  return (
    <div className="md:px-36 lg:px-96 bg-white">
      <div className="py-4 flex justify-start align-center">
        <Link to={`/GrantBiz/MyShop/${email}`}>
          <IoArrowBackOutline className="text-black h-8 w-10 mr-2 active:text-primary" />
        </Link>
        <p className="text-2xl font-semibold w-full"> Manage Products</p>
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
              to={`/GrantBiz/AddProduct/${email}`}
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

export default MenageProduct;
