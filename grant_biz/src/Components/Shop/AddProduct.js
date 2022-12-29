import React, {  useState } from "react";
import {  useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import BottomBar from "../Navigation/BottomBar";
import db from "../../firebase";
import {
  collection,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { Dialog } from "primereact/dialog";
import { UserAuth } from "../../context/AuthContext";
import { uuidv4 } from "@firebase/util";
import {
  IoArrowBackOutline,
  IoCreateOutline,
  IoStorefrontOutline,
} from "react-icons/io5";
import { Alert } from "@material-tailwind/react";

const AddProduct = () => {
  const { user } = UserAuth();

  const currentUser = useSelector((state) => state.currentUser);
  const {
    store_avatar,
    StoreName,
    phone_number,
    QR_code_image,
  } = currentUser;

  const navigate = useNavigate("");

  const [baseImage, setBaseImage] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [COD, setCOD] = useState(false);
  const [QRCode, setQRCode] = useState(false);
  const [QRCodeImage, setQRCodeImage] = useState(QR_code_image);
  const [description, setDescription] = useState("");

  const [Error, setError] = useState("");

  const [imageCrop, setImageCrop] = useState(false);

  const uploadQRImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setQRCodeImage(base64);
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage(base64);
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
  const usersRef = collection(db, "Users");
  const productRef = collection(db, "Products");

  // console.log("Income", ...Income)

  async function handleSubmit({ id }) {
    setError("");

    // const splitArrayTypeParameters = typeParameters.split(", ");

    const data = {
      id: id,
      email: user.email,
      image: baseImage,
      title: title,
      price: price,
      // type: type,
      // type_parameters: splitArrayTypeParameters,
      description: description,
      rate: "5",
      StoreName: StoreName,
      store_avatar: store_avatar,
      store_phone_number: phone_number,
      COD: COD,
      QR_code: QRCode,
      isHide: false,
      quantity: quantity,
      productIncome: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    };
    // console.log("data", data)
    if (COD || QRCode) {
      if (QRCodeImage && QRCode) {
        try {
          const responseUser = await updateDoc(doc(usersRef, user.email), {
            QR_code_image: QRCodeImage,
          });
          const responseProduct = await setDoc(doc(productRef, id), {
            ...data,
          });
          navigate("/");
        } catch (err) {
          console.error(err);
          // setError(err)
        }
      } else if (COD && !QRCode) {
        try {
          const responseUser = await updateDoc(doc(usersRef, user.email), {});
          const responseProduct = await setDoc(doc(productRef, id), {
            ...data,
          });
          navigate("/");
        } catch (err) {
          console.error(err);
          // setError(err)
        }
      } else {
        setError("upload QR Code");
      }
    } else {
      setError("At least one of the payment methods should be checked");
    }
  }

  return (
    <div className="md:px-36 lg:px-96 bg-white">
      <div className="bg-white h-screen static">
        <div className="px-6 bg-white pb-16">
          <div className="my-10 flex justify-start align-center">
            <Link to={`/`}>
              <IoArrowBackOutline className="text-black h-8 w-10 mr-2 active:text-primary" />
            </Link>
            <h2 className="text-2xl font-semibold w-full">Add new Product</h2>
          </div>
          <br />
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <div className="flex justify-center">
                <Dialog
                  className="absolute h-full w-full top-0 left-0 p-6 bg-gradient-to-b from-primary to-transparent from-slate-200"
                  visible={imageCrop}
                  onHide={() => setImageCrop(false)}
                >
                  <div className="flex flex-row justify-center ">
                    <div className="flex flex-col  justify-center m-0 p-6 border-2 rounded-xl shadow-lg  bg-white">
                      <h2 className="text-lg ">Add Product Image</h2>
                      <p className="">Only JPEG or PNG formats accepted</p>
                      <p className="mb-2">Less than 500KB</p>
                      <input
                        type="file"
                        accept="/image/*"
                        // style={{ display: "none" }}
                        onChange={uploadImage}
                      />
                      {baseImage && (
                        <img
                          src={baseImage}
                          alt="Cropped Image"
                          className="border-stone-400 border border-black  rounded h-48 w-48 active:text-primary "
                        />
                      )}
                      <div className="flex flex-col align-items mt-5 w-12">
                        <div className="flex justify-between  content-around w-72 overflow-x">
                          <div
                            onClick={() => setImageCrop(false)}
                            className="flex cursor-pointer justify-center items-center px-4 py-2 w-20 max-w-xs text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                          >
                            Cancel
                          </div>
                          <div
                            onClick={() => setImageCrop(false)}
                            className="flex cursor-pointer justify-center items-center px-4 py-2 w-20 max-w-xs text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                          >
                            Save
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog>
                {baseImage ? (
                  <div
                    className="flex flex-col"
                    onClick={() => {
                      setImageCrop(true);
                    }}
                  >
                    <div className="flex flex-col justify-center items-center  h-48 w-48 active:text-primary">
                      <img
                        src={baseImage}
                        alt="Cropped Image"
                        className="border-stone-400 border border-black  rounded h-48 w-48 active:text-primary "
                      />
                      <div className="flex flex-col justify-center items-end w-60">
                        <IoCreateOutline className=" text-black h-8 w-10 active:text-primary" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className="flex flex-col"
                    onClick={() => {
                      setImageCrop(true);
                    }}
                  >
                    <div className="flex flex-col justify-center items-center border-2 border-black rounded h-48 w-48 active:text-primary">
                      <IoStorefrontOutline className=" h-32 w-32" />
                      {/* <div className="flex flex-col justify-center items-end w-60">
                                                <IoCreateOutline className=" text-black h-8 w-10 active:text-primary" />
                                            </div> */}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex w-full flex-col gap-2 rounded">
              {Error && (
                <Alert
                  className="bg-yellow-600 rounded mb-3 mt-4"
                  variant="gradient"
                  color="orange"
                >
                  {Error}
                </Alert>
              )}
            </div>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Product Name
              </label>
              <div className="flex flex-col items-start border-solid border-black ">
                <input
                  type="text"
                  name="Product Name"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="block w-full  p-2  mt-1 border border-gray-400 rounded-md shadow-sm "
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Price
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="number"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  className="block w-full  p-2  mt-1 border border-gray-400 rounded-md shadow-sm outline-none"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Stock Quantity
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="number"
                  name="Quantity number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                  className="block w-full  p-2  mt-1 border border-gray-400 rounded-md shadow-sm outline-none"
                />
              </div>
            </div>
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
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                Methods of Receiving Money
              </label>
              <div className="flex flex-row items-center">
                <input
                  type="checkbox"
                  id="topping"
                  name="topping"
                  value="Cash on Delivery"
                  checked={COD}
                  onChange={() => {
                    setCOD(!COD);
                  }}
                />
                <label className="block ml-2 text-sm font-medium text-gray-700 undefined">
                  Cash on Delivery
                </label>
              </div>
              <div className="flex flex-row items-center">
                <input
                  type="checkbox"
                  id="topping"
                  name="topping"
                  value="Cash on Delivery"
                  checked={QRCode}
                  onChange={() => {
                    setQRCode(!QRCode);
                  }}
                />
                <label className="block ml-2 text-sm font-medium text-gray-700 undefined">
                  QR Code
                </label>
              </div>
            </div>
            {QRCode && (
              <>
                {QR_code_image ? (
                  <div className="flex flex-col">
                    <div className="flex flex-col justify-center items-center mt-2 w-full active:text-primary">
                      <img
                        src={QR_code_image}
                        alt="Cropped Image"
                        className="border-stone-400 border border-black  rounded  w-full active:text-primary "
                      />
                      <Link
                        to={`/MyShop/${user.email}`}
                        className="flex justify-center items-center cursor-pointer mt-2 px-4 py-2 w-full max-w-xs text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-red-900 border border-transparent rounded-md active:bg-gray-900 false"
                      >
                        Edit QR Code from my shop
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col ">
                    <p className="text-lg mt-4">
                      Upload Proof of Payment in JPEG of PNG
                    </p>
                    <p className="text-lg mb-2">Less than 500KB</p>
                    <input
                      type="file"
                      accept="/image/*"
                      // style={{ display: "none" }}
                      onChange={uploadQRImage}
                    />
                  </div>
                )}
              </>
            )}
            <div className="my-10 flex justify-between ">
              <Link
                to={`/`}
                className="flex justify-center items-center cursor-pointer mr-2 px-4 py-2 w-full max-w-xs text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
              >
                Cancel
              </Link>
              <div
                onClick={() => handleSubmit({ id: uuidv4() })}
                className="flex justify-center items-center cursor-pointer ml-2 px-4 py-2 w-full max-w-xs text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
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
};

export default AddProduct;
