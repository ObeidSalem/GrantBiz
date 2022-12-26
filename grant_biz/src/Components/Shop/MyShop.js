import React, { useEffect, useState } from "react";
import BottomBar from "../Navigation/BottomBar";
import NavBar from "../Navigation/NavBar";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../../context/AuthContext";
import {
  IoStorefrontOutline,
  IoArrowBackOutline,
  IoExtensionPuzzleOutline,
  IoArrowForwardOutline,
  IoCalculatorOutline,
  IoSettingsOutline,
  IoBriefcaseOutline,
  IoBagAddOutline,
  IoAnalyticsOutline,
  IoExitOutline,
  IoClipboardOutline,
  IoFileTrayOutline,
  IoCreateOutline,
} from "react-icons/io5";

import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import Avatar from "react-avatar-edit";
import { collection, doc, updateDoc } from "firebase/firestore";
import db from "../../firebase";
import storage from "../../firebase";
import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

// import { useDispatch } from 'react-redux';
// import { setCurrentUser } from './redux/actions/index';

function MyShop() {
  const { user, logOut } = useAuth();

  const { userId } = useParams();

  const currentUser = useSelector((state) => state.currentUser);
  console.log("currentUser", currentUser);
  const {
    email,
    Name,
    own_store,
    store_avatar,
    StoreName,
    StoreLocation,
    store_type,
    QR_code_image,
  } = currentUser;

  const [storeName, setStoreName] = useState(StoreName);
  const [storeLocation, setStoreLocation] = useState(StoreLocation);

  const [image, setImage] = useState(store_avatar);
  const [QRCodeImage, setQRCodeImage] = useState(QR_code_image);
  const [imageCrop, setImageCrop] = useState(false);
  const [imageQRCode, setImageQRCode] = useState(false);
  const [src, setSrc] = useState(false);
  const [profile, setProfile] = useState([]);
  const [pView, setPView] = useState("");

  const uploadQRImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setQRCodeImage(base64);
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

  const onClose = () => {
    setPView(null);
  };

  const onCrop = (view) => {
    console.log("view", view);
    setImage(view);
  };

  const onFileChange = (event) => {
    const file = event.target.file[0];
    if (!file) {
      setImage(null);
    } else {
      setImage(file);
    }
  };

  const storage = getStorage();
  const storageRef = ref(storage, `/StoreAvatars/${StoreName}`);

  const saveCropImage = () => {
    console.log("image", { image });
    setProfile([...profile, { image }]);
  };

  const usersRef = collection(db, "Users");
  async function handleSubmitQR() {
    try {
      const response = await updateDoc(doc(usersRef, email), {
        QR_code_image: QRCodeImage,
      });
      // refreshPage()
      setImageQRCode(false);
    } catch (err) {
      // refreshPage()
      console.error(err);
    }
  }
  async function handleSubmit() {
    try {
      const response = await updateDoc(doc(usersRef, email), {
        store_avatar: image,
        StoreName: storeName,
        StoreLocation: storeLocation,
      });
      // refreshPage()
      setImageCrop(false);
    } catch (err) {
      // refreshPage()
      console.error(err);
    }
  }

  return (
    <>
      {user ? (
        <div className="px-6 bg-white pb-16 md:px-36 lg:px-96">
          <div className="my-4 flex justify-start align-center">
            <Link to={`/`}>
              <IoArrowBackOutline className="text-black h-8 w-10 mr-2 active:text-primary" />
            </Link>
            <p className="text-2xl font-semibold w-full">My Shop </p>
          </div>
          <br />
          <Dialog
            className="absolute h-full w-full top-0 left-0 p-6 bg-gradient-to-b from-primary to-transparent from-slate-200"
            visible={imageCrop}
            onHide={() => setImageCrop(false)}
          >
            <div className="flex flex-row justify-center ">
              <div className="flex flex-col w-fit justify-center m-0 p-6 border-2 rounded-xl shadow-lg  bg-white">
                <p> Update Store Avatar</p>
                <Avatar
                  className="m-0"
                  width={285}
                  height={200}
                  onCrop={onCrop}
                  onClose={onClose}
                  src={src}
                  shadingColor={"#474649"}
                  backgroundColor={"#474649"}
                />
                <InputText
                  type="file"
                  accept="/image/*"
                  style={{ display: "none" }}
                  onChange={onFileChange}
                />
                <div className="mt-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 undefined"
                  >
                    Store Name
                  </label>
                  <div className="flex flex-col items-start border-solid border-black ">
                    <input
                      type="text"
                      name="StoreName"
                      value={storeName}
                      onChange={(e) => setStoreName(e.target.value)}
                      required
                      className="block w-full  p-2  mt-1 border border-gray-400 rounded-md shadow-sm "
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 undefined"
                  >
                    Store Location
                  </label>
                  <div className="flex flex-col items-start">
                    <input
                      type="text"
                      name="StoreLocation"
                      value={storeLocation}
                      onChange={(e) => setStoreLocation(e.target.value)}
                      required
                      className="block w-full  p-2  mt-1 border border-gray-400 rounded-md shadow-sm "
                    />
                  </div>
                </div>
                <div className="flex flex-col align-items mt-5 w-12">
                  <div className="flex justify-between  content-around w-72 overflow-x">
                    <div
                      onClick={() => setImageCrop(false)}
                      className="flex justify-center items-center cursor-pointer px-4 py-2 w-20 max-w-xs text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                    >
                      Cancel
                    </div>
                    <div
                      onClick={saveCropImage}
                      className="flex justify-center items-center cursor-pointer px-4 py-2 w-20 max-w-xs text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                    >
                      Upload
                    </div>
                    <div
                      onClick={handleSubmit}
                      className="flex justify-center items-center cursor-pointer px-4 py-2 w-20 max-w-xs text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                    >
                      Submit
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Dialog>
          <Dialog
            className="absolute h-full w-full top-0 left-0 p-6 bg-gradient-to-b from-primary to-transparent from-slate-200"
            visible={imageQRCode}
            onHide={() => setImageQRCode(false)}
          >
            <div className="flex flex-row justify-center ">
              <div className="flex flex-col w-fit justify-center mt-4 m-0 p-6 border-2 rounded-xl shadow-lg  bg-white">
                <h2 className="text-lg"> Update QR Code</h2>
                <p >Only JPEG or PNG formats accepted</p>
                <p className=" mb-2">Less than 500KB</p>
                <InputText
                  type="file"
                  accept="/image/*"
                  onChange={uploadQRImage}
                />
                <div className="flex flex-col mt-4 align-items w-12">
                  <div className="flex justify-between  content-around w-72 overflow-x">
                    <div
                      onClick={() => setImageQRCode(false)}
                      className="flex justify-center items-center cursor-pointer px-4 py-2 w-20 max-w-xs text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                    >
                      Cancel
                    </div>
                    <div
                      onClick={handleSubmitQR}
                      className="flex justify-center items-center cursor-pointer px-4 py-2 w-20 max-w-xs text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                    >
                      Update
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Dialog>

          {own_store ? (
            <div className="">
              <div className="my-0 flex justify-center">
                {image ? (
                  <div className="flex flex-row">
                    <div
                      onClick={() => {
                        setImageCrop(true);
                      }}
                      className="flex flex-col justify-center items-center m-1 h-32 w-32 active:text-primary"
                    >
                      <img
                        src={image}
                        alt="Store Avatar"
                        className="border-stone-400 border-2 border-black  rounded-full h-32 w-32 active:text-primary "
                      />
                      <div className="flex flex-col justify-center items-start w-32">
                        <IoCreateOutline className=" text-black h-8 w-10 active:text-primary" />
                      </div>
                    </div>
                    {QRCodeImage && (
                      <div
                        onClick={() => {
                          setImageQRCode(true);
                        }}
                        className="flex flex-col justify-center items-center m-1 h-32 w-32 active:text-primary"
                      >
                        <img
                          src={QRCodeImage}
                          alt="QRCodeImage"
                          className="border-stone-400 border-2 border-black  h-32 active:text-primary "
                        />
                        <div className="flex flex-col justify-center items-end w-32">
                          <IoCreateOutline className=" text-black h-8 w-10 active:text-primary" />
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    className="flex flex-col"
                    onClick={() => {
                      setImageCrop(true);
                    }}
                  >
                    <div className="flex flex-col justify-center items-center border-2 border-black rounded-full h-48 w-48 active:text-primary">
                      <IoStorefrontOutline className=" h-32 w-32" />
                      <div className="flex flex-col justify-center items-end w-60">
                        <IoCreateOutline className=" text-black h-8 w-10 active:text-primary" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex justify-center my-2">
                <p className="text-2xl font-semibold ">{StoreName}</p>
              </div>
              <div className="flex justify-center my-2">
                <p className="text-2xl font-semibold ">{email}</p>
              </div>
              <div className="flex justify-center my-2">
                <p className="text-2xl font-semibold ">{StoreLocation}</p>
              </div>
              <hr />
              <div
                onClick={() => {
                  setImageCrop(true);
                }}
                className="py-6 flex flex-row justify-between cursor-pointer"
              >
                <div className="flex flex-row justify-start ">
                  <IoSettingsOutline className="text-black h-8 w-10 mr-2 active:text-primary" />
                  <p className="text-xl font-semibold ">Edit Store Info</p>
                </div>
                <IoArrowForwardOutline className="text-black h-8 w-10 mr-2 active:text-primary" />
              </div>
              <div
                onClick={() => {
                  setImageQRCode(true);
                }}
                className="py-6 flex flex-row justify-between cursor-pointer"
              >
                <div className="flex flex-row justify-start">
                  <IoSettingsOutline className="text-black h-8 w-10 mr-2 active:text-primary" />
                  <p className="text-xl font-semibold ">Edit QR Code</p>
                </div>
                <IoArrowForwardOutline className="text-black h-8 w-10 mr-2 active:text-primary" />
              </div>
              <Link
                className="py-6 flex flex-row justify-between"
                to={`/ReceivedOrders/${email}`}
              >
                <div className="flex flex-row justify-start">
                  <IoFileTrayOutline className="text-black h-8 w-10 mr-2 active:text-primary" />
                  <p className="text-xl font-semibold ">Received Orders</p>
                </div>
                <IoArrowForwardOutline className="text-black h-8 w-10 mr-2 active:text-primary" />
              </Link>
              <Link
                className="py-6 flex flex-row justify-between"
                to={`/SaleAnalysis/${email}`}
              >
                <div className="flex flex-row justify-start">
                  <IoAnalyticsOutline className="text-black h-8 w-10 mr-2 active:text-primary" />
                  <p className="text-xl font-semibold ">Sale Analysis</p>
                </div>
                <IoArrowForwardOutline className="text-black h-8 w-10 mr-2 active:text-primary" />
              </Link>
              <Link className="py-6 flex flex-row justify-between" to={`/MenageProduct/${email}`}>
                <div className="flex flex-row justify-start">
                  <IoBriefcaseOutline className="text-black h-8 w-10 mr-2 active:text-primary" />
                  <p className="text-xl font-semibold ">Products</p>
                </div>
                <IoArrowForwardOutline className="text-black h-8 w-10 mr-2 active:text-primary" />
              </Link>
              <Link className="py-6 flex flex-row justify-between"  to={`/PostFeed/${email}`}>
                <div className="flex flex-row justify-start">
                  <IoBagAddOutline
                    className="text-black h-8 w-10 mr-2 active:text-primary" />
                  <p className="text-xl font-semibold text-black">Post Feed</p>
                </div>
                <IoArrowForwardOutline className="text-black h-8 w-10 mr-2 active:text-primary" />
              </Link>
              <Link className="py-6 flex flex-row justify-between" to={`/FutureUpdate`}>
                <div className="flex flex-row justify-start">
                  <IoCalculatorOutline className="text-gray-500 h-8 w-10 mr-2 active:text-primary" />
                  <p className="text-xl font-semibold text-gray-500">Cashier Mood</p>
                </div>
                <IoArrowForwardOutline className="text-gray-500 h-8 w-10 mr-2 active:text-primary" />
              </Link>
              <Link
                onClick={() => logOut()}
                to="/"
                className="py-6 flex flex-row justify-between"
              >
                <div className="flex flex-row justify-start">
                  <IoExitOutline className="text-red-600 h-8 w-10 mr-2 active:text-primary" />
                  <p className="text-xl text-red-600 font-semibold ">Log Out</p>
                </div>
                <IoArrowForwardOutline className="text-red-600 h-8 w-10 mr-2 active:text-primary" />
              </Link>
            </div>
          ) : (
            <div className="bg-white ">
              <div className="my-10">
                <IoStorefrontOutline className="text-black h-56 w-full active:text-primary" />
              </div>
              <div className="flex justify-center my-10">
                <p className="text-2xl font-semibold ">
                  You don't have a shop yet!!{" "}
                </p>
              </div>
              <div className="my-10 ">
                <p className="text-lg font-semibold ">
                  you can choose to create
                  <br />
                </p>
                <ol className="list-decimal ml-4">
                  <li>
                    E-physical store: have an actual store but with no delivery
                    system
                  </li>
                  <li>online shop: have delivery system</li>
                </ol>
              </div>
              <div className="my-10 flex justify-center">
                <Link
                  className="flex justify-center items-center px-4 py-2 w-full max-w-xs text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                  to={`/MyShop/${email}/Create`}
                >
                  Create Yor Shop NOW!
                </Link>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className=" bg-white ">
          <div className="my-4 flex justify-start align-center">
            <Link to={`/`}>
              <IoArrowBackOutline className="text-black h-8 w-10 mr-2 active:text-primary" />
            </Link>
            <p className="text-2xl font-semibold w-full">My Shop </p>
          </div>
          <div className="my-10">
            <IoExtensionPuzzleOutline className="text-black h-56 w-full active:text-primary" />
          </div>
          <div className="flex justify-center my-10">
            <p className="text-2xl font-semibold ">You are not Logged In!! </p>
          </div>
          <div className="flex justify-center my-10">
            <p className="text-xl font-semibold ">
              You may login or signup from here
            </p>
          </div>
          <div className="my-10 flex justify-center">
            <Link
              className="btn rounded-full py-10 px-16 mx-2 text-xl border-stone-500 border-2 "
              to="/SignIn"
            >
              <input type="button" value="SING IN"></input>
            </Link>
            <Link
              className="btn rounded-full py-10 px-16 mx-2 text-xl border-2 bg-gray-300"
              to="/SignUp"
            >
              <input type="button" value="SING UP"></input>
            </Link>
          </div>
        </div>
      )}
      <BottomBar />
    </>
  );
}

export default MyShop;
