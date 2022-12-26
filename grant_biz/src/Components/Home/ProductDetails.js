import React, { useEffect, useState } from "react";
import BottomBar from "../Navigation/BottomBar";
import Search from "./Search";
import {
  IoStorefrontOutline,
  IoChatbubbleEllipsesOutline,
  IoArrowBackOutline,
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
import emailjs from "@emailjs/browser";
// import { sendEmail } from "./send-email";
import qs from "qs";
import { Linking } from "react";
import CurrencyFormat from "react-currency-format";

const cash = true;
const online_pay = true;

function ProductDetails() {
  const { productId } = useParams();

  const dispatch = useDispatch();
  const docRef = doc(db, "Products", productId);
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
    store_phone_number,
    quantity,
  } = product;
  let userEmail = email;
  // const [Title, setTitle] = useState(title);
  // const [Image, setImage]= useState(image);
  const [Error, setError] = useState("");
  const [massege, setMassege] = useState("");
  const [cartMassege, setcartMassege] = useState("");
  const [loading, setLoading] = useState(false);
  const [Type_parameters, setType_parameters] = useState(type_parameters);
  const [paymentOptionBtnPopUp, setpaymentOptionBtnPopUp] = useState(false);
  const [newOrderEmail, setNewOrderEmail] = useState({
    fullName: "GrandBiz",
    email: userEmail,
    message: "new order has been placed,please check your shop",
  });

  useEffect(() => {
    if (productId && productId !== "") fetchProductDetail(productId);
    return () => {
      dispatch(removeSelectedProduct());
    };
  }, []);

  ///////////////////////////////////////////////////////////////////////////
  const { user } = useAuth();

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

  useEffect(() => {
    if (email) fetchUser(email);
    else {
    }
  }, [email]);
  ///////////////////////////////////////////////////////////////////
  // fetch curent user data

  const fetchCurentUser = async () => {
    const docUsersRef = doc(db, "Users", user.email);
    const docSnap = await getDoc(docUsersRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      dispatch(setCurrentUser(docSnap.data()));
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
    return docSnap.data();
  };
  const currentUser = useSelector((state) => state.currentUser);
  const { phone_number, location,Name } = currentUser;

  useEffect(() => {
    try {
      if (email) fetchCurentUser(email);
    } catch (error) {
      console.log(error);
    }
  }, [email]);

  ///////////////////////////////////////////////////////////////////
  const cartref = collection(db, "Cart");
  async function handleSubmit(cartData) {
    try {
      setError("");
      setcartMassege("");
      setLoading(true);
      const response = await setDoc(doc(cartref, cartData.id), {
        ...cartData,
        image: image,
        title: title,
        userPhoneNumber: phone_number,
        email: user.email,
        id: cartData.id,
      });
      setcartMassege("has been added to cart");
      setLoading(false);
      setTimeout(() => {
        navigate("../Cart"); //this.props.navigation.navigate('')
      }, 1500);
    } catch (err) {
      // navigate("/");
      console.error(err);
    }
  }

  /////////////////////////////////////////////////////////////////
  const orderRef = collection(db, "Orders");
  const navigate = useNavigate("");
  let QRPayment = false
  const showDate = new Date();
  async function createOrder(orderData) {
    try {
      setError("");
      setMassege("");
      setLoading(true);
      emailjs
        .send(
          "service_gyzz5nb",
          "template_z48cde4",
           newOrderEmail,
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
      const response = await setDoc(
        doc(
          orderRef,
          `${showDate.getDate()}-${showDate.getMonth()+1}-${showDate.getFullYear()}-${showDate.getHours()}-${orderData.id
          }`
        ),
        {
          ...orderData,
          ProductId: id,
          price: price,
          image: image,
          title: title,
          id: `${showDate.getDate()}-${showDate.getMonth()+1}-${showDate.getFullYear()}-${showDate.getHours()}-${orderData.id}`,
          userPhoneNumber: phone_number,
          storePhoneNumber: store_phone_number,
          sellerEmail: email,
          customerEmail: user.email,
          StoreName: StoreName,
          store_avatar: store_avatar,
          address: location,
          isCanceled: false,
          isConfirmed: false,
          quantity: quantity,
          isShipped: false,
          idProduct: id,
          isReceivedFromCustomer: false,
          isReceivedFromSeller: false,
          CustomerDisputed: false,
          SellerDisputed: false,
          QRPayment: QRPayment,
          userName:Name,
          orderDate: showDate.getDate() + "/" + (showDate.getMonth()+1) + "/" + showDate.getFullYear() + " " + showDate.getHours() + ":" + showDate.getMinutes()
        }
      );
      setMassege("your order has been completed");
      setLoading(false);
      setTimeout(() => {
        navigate("/"); //this.props.navigation.navigate('Login')
      }, 1500);
      // navigate("/")
    } catch (err) {
      // navigate("/");
      console.error(err);
    }
  }
  //////////////////////////////////////////////////////////////////
  function quantityCheck() {
    if (quantity > 0)
      return (
        <>
          <button
            type="button"
            value="Purchase Now"
            onClick={() => setpaymentOptionBtnPopUp(true)}
            className="bg-primary border-2 rounded-xl px-4 py-2 md:px-16  text-white font-bold text-sm"
          >
            Purchase Now
          </button>
        </>
      );
  }
  //////////////////////////////////////////////////////////////////

  return (
    <div className=" pb-20 bg-white md:px-16 lg:px-56">
      <div className="pb-48">
        <div className="my-4 flex justify-start align-center">
          <Link to={`/`}>
            <IoArrowBackOutline className="text-black h-8 w-10 mr-2 active:text-primary" />
          </Link>
          <p className="text-2xl font-semibold w-full">{title} </p>
        </div>
        <div className="px-6  m-0 md:px-16 lg:px-56">
          {/* <div className="my-4">{renderCategoryList1}</div> */}
          <div className="flex flex-col justify-center mt-4 ">
            <div className="flex-auto">
              <img
                className="rounded-lg object-cover h-5/6 w-96 md:h-96  "
                src={image}
                alt={title}
              />
            </div>
            <div className="flex-auto">
              <h1 className="font-sans font-semibold uppercase	mb-4 text-5xl">
                {title}
              </h1>
              <h2 className=" uppercase font-semibold font-mono mb-4 text-gray-600">
                Total Price
              </h2>
              <CurrencyFormat className="font-sans	text-md" value={price} displayType={'text'} thousandSeparator={true} prefix={'RM '} />
              <div className="font-sans font-semibold uppercase	mt-4 text-2xl">
                Description
              </div>
              <div className=" w-56 text-black font-sans font-semibold">{description}</div>
              {/* <div className=" w-64 font-sans font-semibold">
                in stock: {quantity}
              </div> */}
            </div>
            <Link
              to={`/StorePage/${email}`}
              className="flex-auto border h-24 w-full rounded-xl p-3"
            >
              <div className="flex justify-start w-full ">
                <img
                  className="ml-1 w-20 h-20 rounded-full"
                  src={store_avatar}
                  alt="Rounded avatar"
                ></img>
                <div className="ml-3">
                  <div className="text-black font-semibold text-lg">
                    {StoreName}
                  </div>
                  {/* <div key={user.email}>{store_avatar}</div> */}
                  <div className="text-black font-semibold text-lg">
                    at {StoreLocation}
                  </div>
                </div>
              </div>
            </Link>

            <div className="flex justify-center mt-5">
              <div className="mx-1">
                <div
                  onClick={() => handleSubmit({ image, title, id: uuidv4() })}
                  className="bg-white border-2 rounded-xl px-4 py-2 md:px-3 cursor-pointer text-primary font-bold text-sm border-primary"
                >
                  <input className="cursor-pointer" type="button" value="Add to Cart"></input>
                </div>
              </div>
              <div className="mx-1">
                {/* desktop version */}
                {/* {if (quantity>0)} */}
                <div>{quantityCheck()}</div>
                <div>
                  <Dialog
                    className="absolute h-full w-full top-0 left-0 p-6 bg-gradient-to-b from-primary to-transparent from-slate-200"
                    visible={paymentOptionBtnPopUp}
                    onHide={() => setpaymentOptionBtnPopUp(false)}
                  >
                    <div className="flex flex-row justify-center ">
                      <div className="flex flex-col w-fit justify-center p-6  border-2 rounded-xl shadow-lg  bg-white ">
                        <p className="flex justify-center mb-2 font-bold">
                          Choose a payment option
                        </p>
                        <p className=" font-bold">Your Location: {location}</p>
                        <p className=" font-bold mb-4">
                          Your Phone No.: {phone_number}
                        </p>

                        <div className="flex justify-start w-full">
                          {QR_code &&
                            <button
                              onClick={() => {
                                QRPayment = true
                                createOrder({ id: uuidv4() })
                              }}
                              className="bg-primary border-2 w-fit rounded-md px-4 py-1 md:px-16  text-white font-bold text-sm">
                              QR Code
                            </button>
                          }

                          {COD &&
                            <button
                              className="bg-primary ml-2 border-2 w-fit rounded-md px-4 py-1 md:px-16  text-white font-bold text-sm"
                              onClick={() => createOrder({ id: uuidv4() })}
                            >
                              Cash On Delivery
                            </button>
                          }
                        </div>

                        <div className="flex flex-col align-items mt-5 w-full">
                          <div className="flex justify-between w-full">
                            <div
                              onClick={() => setpaymentOptionBtnPopUp(false)}
                              className="bg-red-500 border-2 rounded-xl px-4 py-2 md:px-3  text-white font-bold text-sm border-red-600"
                            >
                              Cancel
                            </div>
                            <div
                              // onClick={saveCropImage}
                              className="bg-white border-2 rounded-xl px-4 py-2 md:px-3  text-primary font-bold text-sm border-primary"
                            >
                              Edit Info
                            </div>
                          </div>
                          {massege && (
                            <Alert
                              className="bg-green-600 w-full px-3 mt-5 rounded-xl flex flex-row"
                              variant="gradient"
                              color="green"
                            >
                              {massege}
                            </Alert>
                          )}
                        </div>
                      </div>
                    </div>
                  </Dialog>
                </div>
              </div>
            </div>
            {cartMassege && (
              <Alert
                className="bg-green-600 w-full px-3 mt-5 rounded-2 flex flex-row"
                variant="gradient"
                color="green"
              >
                {cartMassege}
              </Alert>
            )}
          </div>
        </div>
      </div>
      <BottomBar />
    </div>
  );
}

export default ProductDetails;
