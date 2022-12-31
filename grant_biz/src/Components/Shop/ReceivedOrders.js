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
  getDoc,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import CurrencyFormat from "react-currency-format";
import { UserAuth } from "../../context/AuthContext";
import emailjs from "@emailjs/browser";

const ReceivedOrders = () => {
  const { user } = UserAuth();

  const [products, setProducts] = useState([]);

  const showDate = new Date();
  const [targetProductIncome, setTargetProductIncome] = useState({});

  // const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.currentUser);
  const {
    email,
    store_avatar,
    StoreName,
    Income,
  } = currentUser;

  const ordersRef = collection(db, "Orders");
  const usersRef = collection(db, "Users");
  const productsRef = collection(db, "Products");

  const fetchOrders = async () => {
    const q = query(
      collection(db, "Orders"),
      where("sellerEmail", "==", user.email)
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

  console.log("targetProductIncome", targetProductIncome);

  useEffect(() => {
    setTargetProductIncome(Income);
  }, [currentUser]);

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
    message:
      "the order has been cancelled,please check your shop for more info",
  });
  const [comformEmail] = useState({
    fullName: "GrandBiz",
    email: user.email,
    message: "You have confirm that you had received the order",
  });
  const [ConfirmShipments] = useState({
    fullName: "GrandBiz",
    email: user.email,
    message: "You have confirm that you had shipped the order",
  });
  const [ConfirmReceivingMoney] = useState({
    fullName: "GrandBiz",
    email: user.email,
    message: "You have confirm that you received the money for the order",
  });

  //////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="w-screen md:px-36 lg:px-96 mb-20 bg-white overflow-none">
      <div className="py-4 flex w-full justify-start align-center">
        <Link to={`/GrantBiz/MyShop/${email}`}>
          <IoArrowBackOutline className="text-black h-8 w-10 mr-2 active:text-primary" />
        </Link>
        <p className="text-2xl font-semibold w-full">Received Orders</p>
      </div>

      <div className="h-full w-full flex justify-start align-center overflow ">
        <div className=" w-full p-4 ">
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

      <div className="h-full flex flex-col justify-start align-center mb-20">
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
                orderDate,
                userPhoneNumber,
                address,
                userName,
              } = product;
              // console.log("product", product);
              if (isConfirmed === false) {
                return (
                  <div
                    className="p-4 mx-4 my-2 w-fit flex border border-gray-400 rounded-xl "
                    key={id}
                  >
                    <div className="w-full flex flex-col justify-between items-center ">
                      <div className="w-full flex flex-row justify-start items-center">
                        <img
                          src={image}
                          alt={StoreName}
                          className="text-black h-20 w-20 rounded active:text-primary"
                        />
                        <div className="w-full flex flex-col ml-12 items-start">
                          <p className="text-lg ml-4">{title}</p>
                          <div className="w-full flex flex-row justify-between ml-4">
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
                            Customer Name:
                          </div>
                          <div className="float-right mt-8 ml-2 text-gray-500">
                            {userName}
                          </div>
                        </div>
                        <div className=" flex-row">
                          <div className="float-left">
                            <IoLocationOutline className="w-8 h-8" />
                            Customer Address :
                          </div>
                          <div className="float-right mt-8 ml-2 text-gray-500">
                            {address}
                          </div>
                        </div>
                        <div className=" flex-row">
                          <div className="float-left mr-1">
                            <IoChatbubblesOutline className="w-8 h-8" />
                            Customer Phone No.:
                          </div>
                          <div className="float-right mt-8 ml-2 text-gray-500">
                            {userPhoneNumber}
                          </div>
                        </div>

                        <div className="flex flex-row mt-2">
                          <div
                            onClick={async () => {
                               await updateDoc(
                                doc(ordersRef, id),
                                {
                                  isConfirmed: true,
                                }
                              );
                              emailjs.send(
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
                            className="w-36 mr-1 text-white text-center bg-primary p-2  rounded-xl cursor-pointer  hover:cursor-pointer"
                          >
                            Confirm Order
                          </div>
                          <div
                            onClick={async () => {
                               await updateDoc(
                                doc(ordersRef, id),
                                {
                                  isCanceled: true,
                                  isShipped: true,
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
                            className="w-36 ml-1 text-center bg-white p-2  rounded-xl border-2 border-red-600 cursor-pointer  hover:cursor-pointer"
                          >
                            Cancel Order
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
                id,
                isConfirmed,
                isShipped,
                orderDate,
                userPhoneNumber,
                address,
                userName,
              } = product;
              if (isConfirmed === true && isShipped === false) {
                return (
                  <div
                    className="p-4 mx-4 my-2 w-fit flex border border-gray-400 rounded-xl "
                    key={id}
                  >
                    <div className="w-full flex flex-col justify-between items-center ">
                      <div className="w-full flex flex-row justify-start items-center">
                        <img
                          src={image}
                          alt={StoreName}
                          className="text-black h-24 md:h-40 w-24  md:w-40 rounded active:text-primary"
                        />

                        <div className="w-full flex flex-col ml-12 items-start">
                          <p className="text-lg ml-4">{title}</p>
                          <div className="w-full flex flex-row justify-between ml-4">
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
                        {/* <div
                          onClick={async () => {
                            const response = await updateDoc(
                              doc(ordersRef, id),
                              {
                                isCanceled: true,
                                isShipped: true,
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
                          className="w-40 text-white text-center bg-red-600 p-2  rounded-xl cursor-pointer hover:cursor-pointer"
                        >
                          Cancel
                        </div> */}
                      </div>
                      <div className="flex flex-col justify-start items-start mt-1">
                        <div className=" flex-row">
                          <div className="float-left">
                            <IoPersonOutline className="w-8 h-8" />
                            Customer Name:
                          </div>
                          <div className="float-right mt-8 ml-2 text-gray-500">
                            {userName}
                          </div>
                        </div>
                        <div className=" flex-row">
                          <div className="float-left">
                            <IoLocationOutline className="w-8 h-8" />
                            Customer Address :
                          </div>
                          <div className="float-right mt-8 ml-2 text-gray-500">
                            {address}
                          </div>
                        </div>
                        <div className=" flex-row">
                          <div className="float-left mr-1">
                            <IoChatbubblesOutline className="w-8 h-8" />
                            Customer Phone No.:
                          </div>
                          <div className="float-right mt-8 ml-2 text-gray-500">
                            {userPhoneNumber}
                          </div>
                        </div>
                        <div className="flex flex-row mt-2">
                          <div
                            onClick={async () => {
                              await updateDoc(
                                doc(ordersRef, id),
                                {
                                  isShipped: true,
                                }
                              );
                              emailjs
                                .send(
                                  "service_gyzz5nb",
                                  "template_z48cde4",
                                  ConfirmShipments,
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
                            className="w-36 mr-1 text-white text-center bg-primary p-2  rounded-xl cursor-pointer  hover:cursor-pointers"
                          >
                            Shipped
                          </div>
                          <div
                            onClick={async () => {
                               await updateDoc(
                                doc(ordersRef, id),
                                {
                                  isCanceled: true,
                                  isShipped: true,
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
                            className="w-36 ml-1 text-center bg-white p-2  rounded-xl border-2 border-red-600 cursor-pointer  hover:cursor-pointer"
                          >
                            Cancel Order
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
                orderDate,
                userPhoneNumber,
                address,
                isCanceled,
                quantity,
                idProduct,
                ProofOfImage,
                QRPayment,
                ProductId,
                SellerDisputed,
                userName,
              } = product;

              if (
                isShipped === true &&
                isReceivedFromSeller === false &&
                isCanceled === false
              ) {
                return (
                  <>
                    {isReceivedFromCustomer ? (
                      <div
                        className="p-4 mx-4 my-2 w-fit flex border border-gray-400 rounded-xl "
                        key={id}
                      >
                        <div className="w-full flex flex-col justify-between items-center ">
                          <div className="w-full flex flex-row justify-start items-start">
                            <img
                              src={image}
                              alt={StoreName}
                              className="text-black h-20 w-20 rounded active:text-primary"
                            />
                            <div className="w-full flex flex-col mr-2 items-start">
                              <p className="text-lg ml-4">{title}</p>
                              <div className="w-full flex flex-row justify-between ml-4">
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
                            {!SellerDisputed &&
                              <Link
                                to={`/GrantBiz/SellerDispute/${id}`}
                                className="w-40 text-white text-center bg-red-600 p-2  rounded-xl cursor-pointer  hover:bg-red-700"
                              >
                                Dispute
                              </Link>
                            }
                          </div>
                          <div className="flex flex-col justify-start items-start">
                            {SellerDisputed &&
                              <div className=" flex-row">
                                <div className="float-left border-2 border-red-600 rounded-md p-2 my-2 text-red-600">
                                  <IoCodeWorkingOutline className="w-8 h-8" />
                                  Your Dispute Application is Under Processing, Do not Confirm Receiving Money Unless if The Issue Has Been Resolved.
                                </div>
                              </div>
                            }
                            <div className=" flex-row">
                              <div className="float-left">
                                <IoPersonOutline className="w-8 h-8" />
                                Customer Name:
                              </div>
                              <div className="float-right mt-8 ml-2 text-gray-500">
                                {userName}
                              </div>
                            </div>
                            <div className=" flex-row">
                              <div className="float-left">
                                <IoLocationOutline className="w-8 h-8" />
                                Customer Address :
                              </div>
                              <div className="float-right mt-8 ml-2 text-gray-500">
                                {address}
                              </div>
                            </div>
                            <div className=" flex-row">
                              <div className="float-left mr-1">
                                <IoChatbubblesOutline className="w-8 h-8" />
                                Customer Phone No.:
                              </div>
                              <div className="float-right mt-8 ml-2 text-gray-500">
                                {userPhoneNumber}
                              </div>
                            </div>
                            {QRPayment && (
                              <div className=" flex-row">
                                <img
                                  className="my-4"
                                  src={ProofOfImage}
                                  alt="Proof of Payment"
                                />
                              </div>
                            )}
                            <div
                              onClick={async (event) => {
                                let UserIncomeData;
                                let ProductIncomeData;
                                let currentMonth = showDate.getMonth()
                                const docUserRef = doc(db, "Users", user.email);
                                const docProductRef = doc(db, "Products", ProductId);
                                const responseUserGet = await getDoc(docUserRef
                                );
                                const responseProduct = await getDoc(
                                  docProductRef
                                );

                                if (responseUserGet.exists()) {
                                  UserIncomeData =
                                    responseUserGet.data().Income;
                                } else {
                                  console.log("Document does not exist");
                                }

                                if (responseProduct.exists()) {
                                  ProductIncomeData =
                                    responseProduct.data().productIncome;
                                } else {
                                  console.log("Document does not exist");
                                }
                                
                                console.log("price", price);
                                
                                UserIncomeData[currentMonth] += Number(price);
                                ProductIncomeData[currentMonth] += Number(price);

                                console.log("UserIncomeData", UserIncomeData, "ProductIncomeData", ProductIncomeData)

                                await updateDoc(
                                  doc(usersRef, user.email),
                                  {
                                    Income: UserIncomeData,
                                  }
                                );
                                await updateDoc(
                                  doc(productsRef, ProductId),
                                  {
                                    productIncome: ProductIncomeData,
                                  }
                                );
                                const responseOrder = await updateDoc(
                                  doc(ordersRef, id),
                                  {
                                    isReceivedFromSeller: true,
                                  }
                                );
                                await updateDoc(
                                  doc(db, "Products", idProduct),
                                  {
                                    quantity: quantity - 1,
                                  }
                                );
                                emailjs
                                  .send(
                                    "service_gyzz5nb",
                                    "template_z48cde4",
                                    ConfirmReceivingMoney,
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
                              className="w-fit text-white text-center bg-primary p-2 mt-2 rounded-xl cursor-pointer"
                            >
                              Confirm Money Receiving
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="p-4 mx-4 my-2 w-fit flex border border-gray-400 rounded-xl "
                        key={id}
                      >
                        <div className="w-full flex flex-col justify-between items-center ">
                          <div className="w-full flex flex-row justify-start items-start">
                            <img
                              src={image}
                              alt={StoreName}
                              className="text-black h-20 w-20 rounded active:text-primary"
                            />
                            <div className="w-full flex flex-col items-start mx-4">
                              <p className="text-lg ">{title}</p>
                              <div className="w-full flex flex-row justify-between ">
                                <CurrencyFormat
                                  value={price}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"RM "}
                                />
                              </div>
                              <div className="w-full flex flex-row justify-between text-sm font-medium text-gray-400">
                                Order Date: {orderDate}
                              </div>
                            </div>
                            {!SellerDisputed &&
                              <Link
                                to={`/GrantBiz/SellerDispute/${id}`}
                                className="w-40 text-white text-center bg-red-600 p-2  rounded-xl cursor-pointer  hover:bg-red-700"
                              >
                                Dispute
                              </Link>
                            }
                          </div>
                          <div className="flex flex-col justify-start items-start">
                            {SellerDisputed &&
                              <div className=" flex-row">
                                <div className="float-left border-2 border-red-600 rounded-md p-2 my-2 text-red-600">
                                  <IoCodeWorkingOutline className="w-8 h-8" />
                                  Your Dispute Application is Under Processing
                                </div>
                                {/* <div className="float-right mt-8 ml-2 text-gray-500">
                                
                              </div> */}
                              </div>
                            }
                            <div className=" flex-row">
                              <div className="float-left">
                                <IoPersonOutline className="w-8 h-8" />
                                Customer Name:
                              </div>
                              <div className="float-right mt-8 ml-2 text-gray-500">
                                {userName}
                              </div>
                            </div>
                            <div className=" flex-row">
                              <div className="float-left">
                                <IoLocationOutline className="w-8 h-8" />
                                Customer Address :
                              </div>
                              <div className="float-right mt-8 ml-2 text-gray-500">
                                {address}
                              </div>
                            </div>
                            <div className=" flex-row">
                              <div className="float-left mr-1">
                                <IoChatbubblesOutline className="w-8 h-8" />
                                Customer Phone No.:
                              </div>
                              <div className="float-right mt-8 ml-2 text-gray-500">
                                {userPhoneNumber}
                              </div>
                            </div>
                            <div className="w-fit text-center text-xl  text-orange-600 p-2 rounded-full">
                              Pending Customer Confirmation
                            </div>
                          </div>
                        </div>
                      </div>
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
                orderDate,
                userPhoneNumber,
                address,
                ProofOfImage,
                QRPayment,
                userName,
              } = product;
              if (
                isShipped === true &&
                isReceivedFromSeller === true &&
                isReceivedFromCustomer === true
              ) {
                return (
                  <>
                    {" "}
                    <div className="p-4 mx-4 my-2  w-fit flex border border-gray-400 rounded-xl ">
                      <div className="w-full flex flex-col justify-between items-center">
                        <div className="w-full flex justify-between items-center mb-4"></div>
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
                              Customer Name:
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
                              {address}
                            </div>
                          </div>
                          <div className=" flex-row">
                            <div className="float-left mr-1">
                              <IoChatbubblesOutline className="w-8 h-8" />
                              Customer Phone No.:
                            </div>
                            <div className="float-right mt-8 ml-2 text-gray-500">
                              {userPhoneNumber}
                            </div>
                          </div>
                          {QRPayment && (
                            <div className=" flex-row">
                              <div>Proof Of Online Payment:-</div>
                              <img
                                className="my-4"
                                src={ProofOfImage}
                                alt="Proof of Payment"
                              />
                            </div>
                          )}
                          <div className=" flex-row">
                            <div className="float-left mr-1 font-bold text-green-800">
                              The order has been completed
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
                isCanceled,
                orderDate,
                address,
                userPhoneNumber,
                userName,
              } = product;
              if (isCanceled === true && isShipped === true) {
                return (
                  <>
                    <div className="p-4 mx-4 my-2  w-fit  flex border border-gray-400 rounded-xl ">
                      <div className="w-full flex flex-col justify-between items-center">
                        <div className="w-full flex justify-between items-center mb-4"></div>
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
                              Customer Name:
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
                              {address}
                            </div>
                          </div>
                          <div className=" flex-row">
                            <div className="float-left mr-1">
                              <IoChatbubblesOutline className="w-8 h-8" />
                              Customer Phone No.:
                            </div>
                            <div className="float-right mt-8 ml-2 text-gray-500">
                              {userPhoneNumber}
                            </div>
                          </div>
                          <div className=" flex-row">
                            <div className="float-left mr-1 font-bold text-red-800">
                              The order has been canceled
                            </div>
                            {/* <div className="float-left mr-1 font-bold text-red-800">
                              ,Please contact the customer for further information
                            </div> */}
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

export default ReceivedOrders;
