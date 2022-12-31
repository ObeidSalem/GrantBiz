import React, { useEffect, useState } from "react";
import BottomBar from "../Navigation/BottomBar";
import {
  IoStorefrontOutline,
  IoChatbubbleEllipsesOutline,
  IoArrowBackOutline,
  IoCreateOutline,
} from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  selectedProduct,
  removeSelectedProduct,
  setProductStore,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import {
  onSnapshot,
  collection,
  doc,
  setDoc,
  getDocs,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import db from "../../firebase";
import NavBar from "../Navigation/NavBar";
import { v4 as uuidv4 } from "uuid";
import { useAuth, UserAuth } from "../../context/AuthContext";
import { async } from "@firebase/util";
import { setCurrentUser } from "../../redux/actions/index";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Alert, Button } from "@material-tailwind/react";
import CurrencyFormat from "react-currency-format";

function ProductDetails() {
  const { orderId } = useParams();

  const dispatch = useDispatch();
  const docRef = doc(db, "Orders", orderId);
  const fetchProductDetail = async (id) => {
    const response = await getDoc(docRef);
    if (response.exists()) {
      const data = response.data();
      dispatch(selectedProduct(data));
    } else {
      console.log("Document does not exist");
    }
  };

  const product = useSelector((state) => state.product);
  const {
    image,
    title,
    price,
    type,
    description,
    type_parameters,
    // store_name,
    id,
    rate,
    COD,
    QR_code,
    email,
    sellerEmail,
    store_phone_number,
  } = product;
  // console.log("Product", product);
  // const [Title, setTitle] = useState(title);
  // const [Image, setImage]= useState(image);
  const [Error, setError] = useState("");
  const [massege, setMassege] = useState("");
  const [cartMassege, setcartMassege] = useState("");
  const [loading, setLoading] = useState(false);
  const [Type_parameters, setType_parameters] = useState(type_parameters);
  const [paymentOptionBtnPopUp, setpaymentOptionBtnPopUp] = useState(false);

  useEffect(() => {
    if (orderId && orderId !== "") fetchProductDetail(orderId);
    return () => {
      dispatch(removeSelectedProduct());
    };
  }, []);

  ///////////////////////////////////////////////////////////////////////////
  const { user } = useAuth();

  const fetchUser = async () => {
    const docUsersRef = doc(db, "Users", sellerEmail);
    const docSnap = await getDoc(docUsersRef);

    if (docSnap.exists()) {
      dispatch(setProductStore(docSnap.data()));
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
    return docSnap.data();
  };
  const productStore = useSelector((state) => state.productStore);
  const { StoreLocation, store_avatar, StoreName, QR_code_image } =
    productStore;

  useEffect(() => {
    if (sellerEmail) fetchUser(sellerEmail);
    else {
    }
  }, [sellerEmail]);
  ///////////////////////////////////////////////////////////////////
  // fetch curent user data

  const currentUser = useSelector((state) => state.currentUser);
  const { phone_number, location } = currentUser;

  /////////////////////////////////////////////////////////////////
  const orderRef = collection(db, "Orders");
  const navigate = useNavigate("");
  const showDate = new Date();
  async function handleSubmit() {
    try {
      setError("");
      const response = await updateDoc(doc(orderRef, orderId), {
        isReceivedFromCustomer: true,
        ProofOfImage: ProofOfImage,
      });
      navigate("/Order");
    } catch (err) {
      // navigate("/");
      console.error(err);
    }
  }
  ////////////////////////////////////////////////////////////////

  const [ProofOfImage, setProofOfImage] = useState("");

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setProofOfImage(base64);
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

  return (
    <div className="w-full">
      <div className="bg-white h-full mb-20 px-6 pb-16 md:px-36 lg:px-96">
        <div className="bg-white  ">
          <div className="my-10 flex justify-start align-center">
            <Link to={`/GrantBiz/`}>
              <IoArrowBackOutline className="text-black h-8 w-10 mr-2 active:text-primary" />
            </Link>
            <p className="text-2xl font-semibold w-full">Checkout </p>
          </div>
          <br />
          <form
            onSubmit={handleSubmit}
            className="bg-white border-2 shadow-sl  hover:shadow-md rounded-2xl p-2 m-0 "
          >
            <h1 className="text-lg mt-2 font-semibold">Product Details</h1>
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
                  <div className="font-sans	text-2xl">{title}</div>
                  <div className="flex justify-between">
                    <CurrencyFormat
                      className="font-sans	text-md"
                      value={price}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"RM "}
                    />
                    <div className=" flow-root">
                      {/* <div className="font-sans	float-left ">{rate}</div> */}
                      {/* <IoStarOutline className="float-right w-5 h-5" /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h1 className="text-lg mt-6 font-semibold">Seller Details</h1>
            <div className="">
              <div className="flex justify-start ">
                <img
                  className="ml-1 w-20 h-20 rounded-md"
                  src={store_avatar}
                  alt="Rounded avatar"
                ></img>
                <div className="ml-3">
                  <div className="text-black font-semibold text-lg ml-2">
                    {StoreName}
                  </div>
                  {/* <div key={user.email}>{store_avatar}</div> */}
                  <div className="text-black font-semibold text-lg">
                    at {StoreLocation}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-center">
                <div className="flex flex-col">
                  <div className="flex flex-col justify-center items-center h-96 active:text-primary">
                    <img
                      src={QR_code_image}
                      alt="Store Avatar"
                      className="border-stone-400  h-96 active:text-primary "
                    />
                    <div className="flex flex-col justify-center items-end w-60"></div>
                  </div>
                </div>
              </div>
            </div>
            <h1 className="text-lg mt-6 font-semibold">Client's Details</h1>
            {Error && (
              <Alert
                className="bg-red-600 w-full px-3 my-5 rounded-md flex flex-row"
                variant=""
                color="red"
              >
                {Error}
              </Alert>
            )}
            <p className=" font-semibold">Client's Address: {location}</p>
            <p className=" font-semibold mb-4">
              Client's Phone No.: {phone_number}
            </p>

            <div className="flex flex-col ">
              <p className="text-lg ">Upload Proof of Payment in JPEG of PNG</p>
              <p className="text-lg mb-2">Less than 500KB</p>
              <input
                type="file"
                accept="/image/*"
                // style={{ display: "none" }}
                onChange={uploadImage}
              />
              <div className="flex justify-center ">
                {ProofOfImage && (
                  <img
                    src={ProofOfImage}
                    alt="QR Code"
                    className="border-stone-400 border mt-4 rounded-2  w-full active:text-primary "
                  />
                )}
              </div>
            </div>
            <div className="my-10 flex justify-center">
              <div
                onClick={() => {
                  if (ProofOfImage) {
                    handleSubmit();
                  } else {
                    setError("Upload Proof of Payment");
                  }
                }}
                className="flex justify-center cursor-pointer items-center px-4 py-2 w-full max-w-xs text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
              >
                Continue
              </div>
            </div>
          </form>
        </div>
      </div>
      <BottomBar />
    </div>
  );
}

export default ProductDetails;
