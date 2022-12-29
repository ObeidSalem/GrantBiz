import React, { useEffect, useState } from "react";
import { IoArrowBackOutline, IoTrashOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import BottomBar from "../Navigation/BottomBar";
import db from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import CurrencyFormat from "react-currency-format";
import { UserAuth } from "../../context/AuthContext";
const PostFeed = () => {
  const { user } = UserAuth();

  const [products, setProducts] = useState([]);
  const [QuantityCheck, setQuantityCheck] = useState("");
  const navigate = useNavigate("");
  const [postFeedPopUp, setPostFeedPopUp] = useState(false);
  const [baseFeedImage, setBaseFeedImage] = useState("");
  const [feedDescription, setFeedDescription] = useState("");


  // const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.currentUser);
  const {
    email,
    store_avatar,
    StoreName,
  } = currentUser;
  // const products = useSelector((state) => state.storeProducts.products);
  // console.log("products", products)

  const fetchProducts = async () => {
    const q = query(
      collection(db, "Products"),
      where("email", "==", user.email)
    );

    const querySnapshot = await getDocs(q);
    const data = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      data.push(doc.data());
    });
    // console.log("data", data);
    setProducts(data);
    // dispatch(setStoreProducts(data))
  };
  async function updateQuantity(id) {
    await updateDoc(doc(db, "Products", id), {
      quantity: QuantityCheck,
    });
    // refreshPage()
    navigate("/MyShop/${email}");
  }

  function refreshPage() {
    window.location.reload(false);
  }
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseFeedImage(base64);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const usersRef = collection(db, "Feed");
  async function handleSubmit(feedData) {
    try{
      
      await setDoc(doc(db, "Feed", feedData.feeIid), {
        id: feedData.feeIid,
        price: feedData.price,
        feedDescription: feedDescription,
        StoreName: StoreName,
        store_avatar: store_avatar,
        productId:feedData.id,
        baseFeedImage:baseFeedImage,
        title:feedData.title,
        store_email:user.email,
      });
       refreshPage();
    } catch(err){
         navigate("/");
          // refreshPage()
          console.error(err);
      }
    
    // navigate("/");
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
      <div
        className="p-4 mx-4 my-2 flex border border-gray-400 rounded-xl "
        key={index}
      >
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
          </div>
          <p className="text-sm w-full ">{description}</p>

          <div className="w-full flex flex-row justify-between">
            <CurrencyFormat
              value={price}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"RM "}
            />
          </div>
          <div>
            {/* <button
              type="button"
              value="Purchase Now"
              onClick={() => setPostFeedPopUp(true)}
              className="bg-primary border-2 rounded-full px-4 py-2 md:px-16  text-white font-bold text-sm"
            >
              Post new Feed
            </button> */}
            {/* //////// */}
            <div className="flex flex-row justify-start w-full">
                <div className="flex flex-col w-fit justify-center m-4 p-6  border-2 rounded-xl shadow-sm  bg-white ">
                  <p className="flex justify-center mb-2 font-bold">
                    Add new Advertisement Picture
                  </p>
                  <input
                    type="file"
                    accept="/image/*"
                    // style={{ display: "none" }}
                    onChange={uploadImage}
                  />
                  {baseFeedImage && (
                    <img
                      src={baseFeedImage}
                      alt="Cropped Image"
                      className="border-stone-400 border border-black  rounded h-48 w-48 active:text-primary "
                    />
                  )}
                  <div className="mt-4">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 undefined"
                    >
                      Description
                    </label>
                    <div className="flex flex-col items-start">
                      <textarea
                        type="text"
                        name="StoreType"
                        // value={feedDescription}
                        onChange={(e) => setFeedDescription(e.target.value)}
                        required
                        className="block w-full  p-2  mt-1 border border-gray-400 rounded-md shadow-sm "
                      />
                    </div>
                  </div>
                  <div className="flex flex-col align-items mt-5 w-12">
                    <div className="flex justify-between  content-around w-72 overflow-x">
                      <div
                        onClick={() => setPostFeedPopUp(false)}
                        className="flex cursor-pointer justify-center items-center px-4 py-2 w-20 max-w-xs text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                      >
                        Cancel
                      </div>
                      <div
                        onClick={() => handleSubmit( { feeIid: uuidv4() ,price,id,title})}
                      // onClick={async()=>{
                      //  let feedIid= uuidv4()
                      //   await setDoc(doc(db, "Feed",feedIid), {
                      //     id:feedIid,
                      //     price:price,
                      //     feedDescription: feedDescription,
                      //     StoreName: StoreName,
                      //     store_avatar: store_avatar,
                      //     productId:id,
                      //     baseFeedImage:baseFeedImage,
                      //     title:title,
                      //     store_email:user.email,
                      //   });
                      // }}
                        className="flex cursor-pointer justify-center items-center px-4 py-2 w-20 max-w-xs text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                      >
                        Post
                      </div>
                    </div>
                  </div>
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
        <Link to={`/MyShop/${email}`}>
          <IoArrowBackOutline className="text-black h-8 w-10 mr-2 active:text-primary" />
        </Link>
        <p className="text-2xl font-semibold w-full">Post New Feed</p>
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
          </div>
        </div>
      </div>

      <div className="h-full flex flex-col justify-start align-center mb-24 ">
        {renderProductsList}
      </div>

      <BottomBar />
    </div>
  );
};

export default PostFeed;
