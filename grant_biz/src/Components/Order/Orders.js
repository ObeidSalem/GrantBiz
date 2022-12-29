import React, { useEffect, useState } from "react";
import {
  IoArrowBackOutline,
  IoCheckmarkCircleOutline,
  IoCheckmarkCircleSharp,
  IoLocationOutline,
  IoChatbubblesOutline,
  IoCloseCircleSharp,
  IoCodeWorkingOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { BsBoxSeam, BsTruck } from "react-icons/bs";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BottomBar from "../Navigation/BottomBar";
import db from "../../firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import CurrencyFormat from "react-currency-format";
import { UserAuth } from "../../context/AuthContext";
import emailjs from "@emailjs/browser";

const Orders = () => {
  const { user } = UserAuth();

  const [products, setProducts] = useState([]);

  // const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.currentUser);
  const {
    Name,
    profile_avatar,
    location,
  } = currentUser;
  // const products = useSelector((state) => state.storeProducts.products);
  // console.log("products", products)

  const updateRef = collection(db, "Orders");

  const fetchOrders = async () => {
    const q = query(
      collection(db, "Orders"),
      where("customerEmail", "==", user.email)
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

  useEffect(() => {
    try {
      if (user?.email) {
        fetchOrders();
      }
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  function refreshPage() {
    window.location.reload(false);
  }

  const [Category1, setCategory1] = useState(true);
  const [Category2, setCategory2] = useState(false);
  const [Category3, setCategory3] = useState(false);
  const [Category4, setCategory4] = useState(false);
  const [Category5, setCategory5] = useState(false);

  const [Primary1, setPrimary1] = useState("text-primary");
  const [Primary2, setPrimary2] = useState("");
  const [Primary3, setPrimary3] = useState("");
  const [Primary4, setPrimary4] = useState("");
  const [Primary5, setPrimary5] = useState("");
  const [emailCancel] = useState({
    fullName: "GrandBiz",
    email: user.email,
    message: "Your order has been cancelled",
  });
  const [comformEmail] = useState({
    fullName: "GrandBiz",
    email: user.email,
    message: "You have conform that you had received your order",
  });

  //////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////
  return (
    <div className="w-screen md:px-36 lg:px-96  bg-white overflow-none">
      <div className="py-4 flex w-full justify-start align-center">
        <Link to={`/`}>
          <IoArrowBackOutline className="text-black h-8 w-10 mr-2 active:text-primary" />
        </Link>
        <p className="text-2xl font-semibold w-full">My Orders</p>
      </div>

      <div className="h-full w-full flex justify-center align-center overflow">
        <div className=" w-full p-4 ">
          <div className="w-full flex justify-between items-center">
            <div className="w-full flex justify-start items-center">
              <img
                src={profile_avatar}
                alt={Name}
                className="text-black h-10 w-10 rounded-full active:text-primary"
              />
              <p className="text-lg ml-4">{Name}</p>
            </div>
          </div>
          <div className="h-full w-full flex justify-center align-center ">
            <div className="flex w-full items-center justify-between space-x-1 ">
              <div
                className={`text-black py-3 text-sm text-center w-20 ${Primary1}`}
                to="/"
                onClick={() => {
                  setCategory1(true);
                  setCategory2(false);
                  setCategory3(false);
                  setCategory4(false);
                  setCategory5(false);
                  setPrimary1("text-primary");
                  setPrimary2("");
                  setPrimary3("");
                  setPrimary4("");
                  setPrimary5("");
                }}
              >
                <IoCheckmarkCircleOutline
                  className={`text-black h-6 w-full ${Primary1}`}
                />
                To Confirm
              </div>
              <div
                className={`text-black py-3 text-sm text-center w-20 ${Primary2}`}
                to="/Feed"
                onClick={() => {
                  setCategory1(false);
                  setCategory2(true);
                  setCategory3(false);
                  setCategory4(false);
                  setCategory5(false);
                  setPrimary1("");
                  setPrimary2("text-primary");
                  setPrimary3("");
                  setPrimary4("");
                  setPrimary5("");
                }}
              >
                <BsBoxSeam className={`text-black h-6 w-full ${Primary2}`} />
                To Ship
              </div>
              <div
                className={`text-black py-3 text-sm text-center w-20 ${Primary3}`}
                to="/Feed"
                onClick={() => {
                  setCategory1(false);
                  setCategory2(false);
                  setCategory3(true);
                  setCategory4(false);
                  setCategory5(false);
                  setPrimary1("");
                  setPrimary2("");
                  setPrimary3("text-primary");
                  setPrimary4("");
                  setPrimary5("");
                }}
              >
                <BsTruck className={`text-black h-6 w-full ${Primary3}`} />
                To Receive
              </div>
              <div
                className={`text-black py-3 text-sm text-center w-20 ${Primary4}`}
                to="/Feed"
                onClick={() => {
                  setCategory1(false);
                  setCategory2(false);
                  setCategory3(false);
                  setCategory4(true);
                  setCategory5(false);
                  setPrimary1("");
                  setPrimary2("");
                  setPrimary3("");
                  setPrimary4("text-primary");
                  setPrimary5("");
                }}
              >
                <IoCheckmarkCircleSharp
                  className={`text-black h-6 w-full ${Primary4}`}
                />
                Completed
              </div>
              <div
                className={`text-black py-3 text-sm text-center w-20 ${Primary5}`}
                to="/Feed"
                onClick={() => {
                  setCategory1(false);
                  setCategory2(false);
                  setCategory3(false);
                  setCategory4(false);
                  setCategory5(true);
                  setPrimary1("");
                  setPrimary2("");
                  setPrimary3("");
                  setPrimary4("");
                  setPrimary5("text-red-900");
                }}
              >
                <IoCloseCircleSharp
                  className={`text-black h-6 w-full ${Primary5}`}
                />
                Canceled
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-full flex flex-col w-full justify-center align-center mb-20">
        {Category1 ? (
          <>
            {products?.map((product) => {
              const {
                StoreName,
                image,
                price,
                title,
                id,
                isConfirmed,
                store_avatar,
                storePhoneNumber,
                orderDate,
                userName,
                isCanceled,
              } = product;
              //   console.log("product", product);
              if (isConfirmed === false && isCanceled === false) {
                return (
                  <>
                    <div className="p-4 mx-4 my-2 flex justify-end w-fit md:w-3/5  border border-gray-400 rounded-xl ">
                      <div className="w-full flex flex-col justify-between items-center">
                        <div className="w-full flex justify-between items-center mb-4">
                          <div className="w-full flex justify-start items-center">
                            <img
                              src={store_avatar}
                              alt={StoreName}
                              className="text-black h-10 w-10 rounded-full active:text-primary"
                            />
                            <p className="text-lg ml-4">{StoreName}</p>
                          </div>
                          <div
                            onClick={async () => {
                               await updateDoc(
                                doc(updateRef, id),
                                {
                                  isCanceled: true,
                                }
                              );
                              emailjs
                                .send(
                                  "service_gyzz5nb",
                                  "template_z48cde4",
                                  emailCancel,
                                  "CyPHO2_SKVKTmOJ7P"
                                )
                                .then(
                                  (result) => {
                                    console.log(result.text);
                                  },
                                  (error) => {
                                    console.log(error.text);
                                  }
                                );
                              refreshPage();
                            }}
                            className="w-36 ml-1 text-center bg-white p-2  rounded-xl border-2 border-red-600 cursor-pointer  hover:cursor-pointer "
                          >
                            Cancel Order
                          </div>
                        </div>
                        {/*  */}
                        <div></div>

                        {/*  */}
                        <div className="w-full flex flex-row justify-start items-center">
                          <img
                            src={image}
                            alt={StoreName}
                            className="text-black h-24 md:h-40 w-24  md:w-40 rounded active:text-primary"
                          />
                          <div className="w-full flex flex-col ml-12 items-start">
                            <p className="text-xl font-medium ml-4">{title}</p>
                            <div className="w-full flex flex-row justify-between ml-4 text-xl font-medium">
                              <CurrencyFormat
                                value={price}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"RM "}
                              />
                            </div>
                            <div className="w-full flex flex-row justify-between ml-4 text-sm font-medium text-gray-400">
                              Order Date: {orderDate}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col justify-start items-start">
                          <div className=" flex-row">
                            <div className="float-left">
                              <IoPersonOutline className="w-8 h-8" />
                              Name:
                            </div>
                            <div className="float-right mt-8 ml-2 text-gray-500">
                              {userName}
                            </div>
                          </div>
                          <div className=" flex-row">
                            <div className="float-left">
                              <IoLocationOutline className="w-8 h-8" />
                              Address :
                            </div>
                            <div className="float-right mt-8 ml-2 text-gray-500">
                              {location}
                            </div>
                          </div>
                          <div className=" flex-row">
                            <div className="float-left mr-1">
                              <IoChatbubblesOutline className="w-8 h-8" />
                              Seller phone number:
                            </div>
                            <div className="float-right mt-8 ml-2 text-gray-500">
                              {storePhoneNumber}
                            </div>
                          </div>
                          <div className=" flex-row">
                            <div className="float-left mr-1 font-bold">
                              Pending Conformation from Seller
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              }
            })}
          </>
        ) : (
          ""
        )}
        {Category2 ? (
          <>
            {products?.map((product, index) => {
              const {
                StoreName,
                image,
                price,
                title,
                isConfirmed,
                isShipped,
                storePhoneNumber,
                store_avatar,
                orderDate,
                isCanceled,
                userName,
              } = product;
              if (
                isConfirmed === true &&
                isShipped === false &&
                isCanceled === false
              ) {
                return (
                  <>
                    <div className="p-4 mx-4 my-2 flex border w-fit border-gray-400 rounded-xl ">
                      <div className="w-full flex flex-col justify-between items-center">
                        <div className="w-full flex justify-between items-center mb-4">
                          <div className="w-full flex justify-start items-center">
                            <img
                              src={store_avatar}
                              alt={StoreName}
                              className="text-black h-10 w-10 rounded-full active:text-primary"
                            />
                            <p className="text-lg ml-4">{StoreName}</p>
                          </div>
                        </div>
                        <div className="w-full flex flex-row justify-start items-center">
                          <img
                            src={image}
                            alt={StoreName}
                            className="text-black h-24 md:h-40 w-24  md:w-40 rounded active:text-primary"
                          />
                          <div className="w-full flex flex-col ml-12 items-start">
                            <p className="text-xl font-medium ml-4">{title}</p>
                            <div className="w-full flex flex-row justify-between ml-4 text-xl font-medium">
                              <CurrencyFormat
                                value={price}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"RM "}
                              />
                            </div>
                            <div className="w-full flex flex-row justify-between ml-4 text-sm font-medium text-gray-400">
                              Order Date: {orderDate}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col justify-start items-start">
                          <div className=" flex-row">
                            <div className="float-left">
                              <IoPersonOutline className="w-8 h-8" />
                              Name:
                            </div>
                            <div className="float-right mt-8 ml-2 text-gray-500">
                              {userName}
                            </div>
                          </div>
                          <div className=" flex-row">
                            <div className="float-left">
                              <IoLocationOutline className="w-8 h-8" />
                              Address :
                            </div>
                            <div className="float-right mt-8 ml-2 text-gray-500">
                              {location}
                            </div>
                          </div>
                          <div className=" flex-row">
                            <div className="float-left mr-1">
                              <IoChatbubblesOutline className="w-8 h-8" />
                              Seller phone number:
                            </div>
                            <div className="float-right mt-8 ml-2 text-gray-500">
                              {storePhoneNumber}
                            </div>
                          </div>
                          <div className=" flex-row">
                            <div className="float-left mr-1 font-bold">
                              your order is under preparation
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              }
            })}
          </>
        ) : (
          ""
        )}
        {Category3 ? (
          <>
            {products?.map((product, index) => {
              const {
                StoreName,
                image,
                price,
                title,
                id,
                isShipped,
                isReceivedFromSeller,
                isReceivedFromCustomer,
                storePhoneNumber,
                store_avatar,
                orderDate,
                userName,
                QRPayment,
                CustomerDisputed,
                // SellerDisputed,
              } = product;
              if (isShipped === true && isReceivedFromSeller === false) {
                return (
                  <>
                    {isReceivedFromCustomer ? (
                      <>
                        <div className="p-4 mx-4 my-2 flex border w-fit border-gray-400 rounded-xl ">
                          <div className="w-full flex flex-col justify-between items-center">
                            <div className="w-full flex justify-between items-center mb-4">
                              <div className="w-full flex justify-start items-center">
                                <img
                                  src={store_avatar}
                                  alt={StoreName}
                                  className="text-black h-10 w-10 rounded-full active:text-primary"
                                />
                                <p className="text-lg ml-4">{StoreName}</p>
                              </div>
                            </div>
                            <div className="w-full flex flex-row justify-start items-start">
                              <img
                                src={image}
                                alt={StoreName}
                                className="text-black h-24 md:h-40 w-24  md:w-40 rounded active:text-primary"
                              />
                              <div className="w-full flex flex-col mr-2 items-start">
                                <p className="text-xl font-medium ml-4">
                                  {title}
                                </p>
                                <div className="w-full flex flex-row justify-between ml-4 text-xl font-medium">
                                  <CurrencyFormat
                                    value={price}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"RM "}
                                  />
                                </div>
                                <div className="w-full flex flex-row justify-between ml-4 text-sm font-medium text-gray-400">
                                  Order Date: {orderDate}
                                </div>
                              </div>
                              {!CustomerDisputed && (
                                <Link
                                  to={`/CustomerDispute/${id}`}
                                  className="w-40 text-white text-center bg-red-600 p-2  rounded-xl cursor-pointer  hover:bg-red-700"
                                >
                                  Dispute
                                </Link>
                              )}
                            </div>
                            <div className="flex flex-col justify-start items-start">
                              {CustomerDisputed && (
                                <div className=" flex-row">
                                  <div className="float-left border-2 border-red-600 rounded-md p-2 my-2 text-red-600">
                                    <IoCodeWorkingOutline className="w-8 h-8" />
                                    Your Dispute Application is Under
                                    Processing. It will be resolved in Three
                                    Working Days
                                  </div>
                                </div>
                              )}
                              <div className=" flex-row">
                                <div className="float-left">
                                  <IoPersonOutline className="w-8 h-8" />
                                  your Name:
                                </div>
                                <div className="float-right mt-8 ml-2 text-gray-500">
                                  {userName}
                                </div>
                              </div>
                              <div className=" flex-row">
                                <div className="float-left">
                                  <IoLocationOutline className="w-8 h-8" />
                                  your Address :
                                </div>
                                <div className="float-right mt-8 ml-2 text-gray-500">
                                  {location}
                                </div>
                              </div>
                              <div className=" flex-row">
                                <div className="float-left mr-1">
                                  <IoChatbubblesOutline className="w-8 h-8" />
                                  Seller phone number:
                                </div>
                                <div className="float-right mt-8 ml-2 text-gray-500">
                                  {storePhoneNumber}
                                </div>
                              </div>
                              <div className=" flex-row">
                                <div className="float-left mr-1 font-bold">
                                  Pending Conformation from Seller
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="p-4 mx-4 my-2  w-fit flex border border-gray-400 rounded-xl ">
                          <div className="w-full flex flex-col justify-between items-center">
                            <div className="w-full flex justify-between items-center mb-4">
                              <div className="w-full flex justify-between items-center">
                                <div className="flex justify-start">
                                  <img
                                    src={store_avatar}
                                    alt={StoreName}
                                    className="text-black h-10 w-10 rounded-full active:text-primary"
                                  />
                                  <p className="text-lg ml-4">{StoreName}</p>
                                </div>
                              </div>
                            </div>
                            <div className="w-full flex flex-row justify-start items-start">
                              <img
                                src={image}
                                alt={StoreName}
                                className="text-black h-24 md:h-40 w-24  md:w-40 rounded active:text-primary"
                              />
                              <div className="w-full flex flex-col mr-2 items-start">
                                <p className="text-xl font-medium ml-4">
                                  {title}
                                </p>

                                <div className="w-full flex flex-row justify-between ml-4 text-xl font-medium">
                                  <CurrencyFormat
                                    value={price}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"RM "}
                                  />
                                </div>
                                <div className="w-full flex flex-row justify-between ml-4 text-sm font-medium text-gray-400">
                                  Order Date: {orderDate}
                                </div>
                              </div>
                              {!CustomerDisputed && (
                                <Link
                                  to={`/CustomerDispute/${id}`}
                                  className="w-40 text-white text-center bg-red-600 p-2  rounded-xl cursor-pointer  hover:bg-red-700"
                                >
                                  Dispute
                                </Link>
                              )}
                            </div>
                            <div className="flex flex-col justify-start items-start">
                              {CustomerDisputed && (
                                <div className=" flex-row">
                                  <div className="float-left border-2 border-red-600 rounded-md p-2 my-2 text-red-600">
                                    <IoCodeWorkingOutline className="w-8 h-8" />
                                    Your Dispute Application is Under
                                    Processing. It will be resolved in Three
                                    Working Days
                                  </div>
                                </div>
                              )}
                              <div className=" flex-row">
                                <div className="float-left">
                                  <IoPersonOutline className="w-8 h-8" />
                                  Your Name:
                                </div>
                                <div className="float-right mt-8 ml-2 text-gray-500">
                                  {userName}
                                </div>
                              </div>
                              <div className=" flex-row">
                                <div className="float-left">
                                  <IoLocationOutline className="w-8 h-8" />
                                  Address :
                                </div>
                                <div className="float-right mt-8 ml-2 text-gray-500">
                                  {location}
                                </div>
                              </div>
                              <div className=" flex-row">
                                <div className="float-left mr-1">
                                  <IoChatbubblesOutline className="w-8 h-8" />
                                  Seller phone number:
                                </div>
                                <div className="float-right mt-8 ml-2 text-gray-500">
                                  {storePhoneNumber}
                                </div>
                              </div>
                              <div className=" flex-row"></div>
                            </div>
                            {QRPayment ? (
                              <div className="flex flex-row mt-2">
                                <Link
                                  to={`/QRCheckout/${id}`}
                                  className=" w-fit text-black text-center border-2 border-orange-600 p-2 ml-40 rounded-xl cursor-pointer"
                                >
                                  Complete Payment
                                </Link>
                              </div>
                            ) : (
                              <div className="flex flex-row mt-2">
                                <div
                                  onClick={async () => {
                                    await updateDoc(
                                      doc(updateRef, id),
                                      {
                                        isReceivedFromCustomer: true,
                                      }
                                    );
                                    emailjs
                                      .send(
                                        "service_gyzz5nb",
                                        "template_z48cde4",
                                        comformEmail,
                                        "CyPHO2_SKVKTmOJ7P"
                                      )
                                      .then(
                                        (result) => {
                                          console.log(result.text);
                                        },
                                        (error) => {
                                          console.log(error.text);
                                        }
                                      );
                                    refreshPage();
                                  }}
                                  className=" w-full mr-1 text-white text-center bg-primary p-2  rounded-xl cursor-pointer  hover:cursor-pointer"
                                >
                                  Confirm Receiving The Order
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </>
                );
              }
            })}
          </>
        ) : (
          ""
        )}
        {Category4 ? (
          <>
            {products?.map((product, index) => {
              const {
                StoreName,
                image,
                price,
                title,
                isShipped,
                isReceivedFromSeller,
                isReceivedFromCustomer,
                storePhoneNumber,
                orderDate,
                userName,
              } = product;
              if (
                isShipped === true &&
                isReceivedFromSeller === true &&
                isReceivedFromCustomer === true
              ) {
                return (
                  <>
                    <div className="p-4 mx-4 my-2 flex border w-fit border-gray-400 rounded-xl ">
                      <div className="w-full flex flex-col justify-between items-center">
                        <div className="w-full flex flex-row justify-start items-center">
                          <img
                            src={image}
                            alt={StoreName}
                            className="text-black h-24 md:h-40 w-24  md:w-40 rounded active:text-primary"
                          />
                          <div className="w-full flex flex-col ml-12 items-start">
                            <p className="text-xl font-medium ml-4">{title}</p>
                            <div className="w-full flex flex-row justify-between ml-4 text-xl font-medium">
                              <CurrencyFormat
                                value={price}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"RM "}
                              />
                            </div>
                            <div className="w-full flex flex-row justify-between ml-4 text-sm font-medium text-gray-400">
                              Order Date: {orderDate}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col justify-start items-start">
                          <div className=" flex-row">
                            <div className="float-left">
                              <IoPersonOutline className="w-8 h-8" />
                              Name:
                            </div>
                            <div className="float-right mt-8 ml-2 text-gray-500">
                              {userName}
                            </div>
                          </div>
                          <div className=" flex-row">
                            <div className="float-left">
                              <IoLocationOutline className="w-8 h-8" />
                              Address :
                            </div>
                            <div className="float-right mt-8 ml-2 text-gray-500">
                              {location}
                            </div>
                          </div>
                          <div className=" flex-row">
                            <div className="float-left mr-1">
                              <IoChatbubblesOutline className="w-8 h-8" />
                              Seller phone number:
                            </div>
                            <div className="float-right mt-8 ml-2 text-gray-500">
                              {storePhoneNumber}
                            </div>
                          </div>
                          <div className=" flex-row">
                            <div className="float-left mr-1 font-bold text-green-800">
                              Your order has been Completed
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              }
            })}
          </>
        ) : (
          ""
        )}
        {Category5 ? (
          <>
            {products?.map((product, index) => {
              const {
                StoreName,
                image,
                price,
                title,
                isShipped,
                storePhoneNumber,
                store_avatar,
                isCanceled,
                orderDate,
                userName,
              } = product;
              if (isCanceled === true && isShipped === true) {
                return (
                  <>
                    <div className="p-4 mx-4 my-2 flex w-fit border border-gray-400 rounded-xl ">
                      <div className="w-full flex flex-col justify-between items-center">
                        <div className="w-full flex justify-between items-center mb-4">
                          <div className="w-full flex justify-start items-center">
                            <img
                              src={store_avatar}
                              alt={StoreName}
                              className="text-black h-10 w-10 rounded-full active:text-primary"
                            />
                            <p className="text-lg ml-4">{StoreName}</p>
                          </div>
                        </div>
                        <div className="w-full flex flex-row justify-start items-center">
                          <img
                            src={image}
                            alt={StoreName}
                            className="text-black h-24 md:h-40 w-24  md:w-40 rounded active:text-primary"
                          />
                          <div className="w-full flex flex-col ml-12 items-start">
                            <p className="text-xl font-medium ml-4">{title}</p>
                            <div className="w-full flex flex-row justify-between ml-4 text-xl font-medium">
                              <CurrencyFormat
                                value={price}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"RM "}
                              />
                            </div>
                            <div className="w-full flex flex-row justify-between ml-4 text-sm font-medium text-gray-400">
                              Order Date: {orderDate}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col justify-start items-start">
                          <div className=" flex-row">
                            <div className="float-left">
                              <IoPersonOutline className="w-8 h-8" />
                              Name:
                            </div>
                            <div className="float-right mt-8 ml-2 text-gray-500">
                              {userName}
                            </div>
                          </div>
                          <div className=" flex-row">
                            <div className="float-left">
                              <IoPersonOutline className="w-8 h-8" />
                              Name:
                            </div>
                            <div className="float-right mt-8 ml-2 text-gray-500">
                              {userName}
                            </div>
                          </div>
                          <div className=" flex-row">
                            <div className="float-left">
                              <IoLocationOutline className="w-8 h-8" />
                              Address :
                            </div>
                            <div className="float-right mt-8 ml-2 text-gray-500">
                              {location}
                            </div>
                          </div>
                          <div className=" flex-row">
                            <div className="float-left mr-1">
                              <IoChatbubblesOutline className="w-8 h-8" />
                              Seller phone number:
                            </div>
                            <div className="float-right mt-8 ml-2 text-gray-500">
                              {storePhoneNumber}
                            </div>
                          </div>
                          <div className=" flex-row">
                            <div className="float-left mr-1 font-bold text-red-800">
                              Your order has been cancel
                            </div>
                            <div className="float-left mr-1 font-bold text-red-800">
                              ,Please contact the seller for further information
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              }
            })}
          </>
        ) : (
          ""
        )}
      </div>

      <BottomBar />
    </div>
  );
};

export default Orders;
