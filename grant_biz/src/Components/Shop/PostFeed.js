import React, { useEffect, useState } from "react";
import { IoArrowBackOutline, IoTrashOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
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
import { setStoreProducts } from "../../redux/actions";
import CurrencyFormat from "react-currency-format";
import { UserAuth } from "../../context/AuthContext";
import { async } from "./../sendEmail";
import { Dialog } from "primereact/dialog";

const PostFeed = () => {
  const { user } = UserAuth();

  const [products, setProducts] = useState([]);
  const [enabled, setEnabled] = useState(true);
  const [QuantityCheck, setQuantityCheck] = useState("");
  const navigate = useNavigate("");
  const [postFeedPopUp, setPostFeedPopUp] = useState(false);

  // const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.currentUser);
  const {
    email,
    Name,
    own_store,
    store_avatar,
    StoreName,
    store_location,
    store_type,
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
          <div>
            <button
              type="button"
              value="Purchase Now"
              onClick={() => setPostFeedPopUp(true)}
              className="bg-primary border-2 rounded-full px-4 py-2 md:px-16  text-white font-bold text-sm"
            >
              Post new Feed
            </button>
            <Dialog
              className="absolute h-full w-full top-0 left-0 p-6 bg-gradient-to-b from-primary to-transparent from-slate-200"
              visible={postFeedPopUp}
              onHide={() => setPostFeedPopUp(false)}
            >
              <div className="flex flex-row justify-center ">
                <div className="flex flex-col w-fit justify-center m-36 p-6  border-2 rounded-xl shadow-lg  bg-white ">
                  <p className="flex justify-center mb-2 font-bold">
                    Choose a payment option
                  </p>
                  <p className=" font-bold">Your Location:</p>
                  <p className=" font-bold mb-4">
                    Your Phone No.:
                  </p>
                </div>
              </div>
            </Dialog>
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

      <div className="h-full flex flex-col justify-start align-center ">
        {renderProductsList}
      </div>

      <BottomBar />
    </div>
  );
};

export default PostFeed;
