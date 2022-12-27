import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAuth, UserAuth } from "../../context/AuthContext";
import { Alert, Button } from "@material-tailwind/react";

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
import emailjs from "@emailjs/browser";
import { setCurrentUser } from "../../redux/actions/index";

function CartCheckout() {
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
  const { phone_number, location, Name } = currentUser;

  useEffect(() => {
    try {
      if (email) fetchCurentUser(email);
    } catch (error) {
      console.log(error);
    }
  }, [email]);

  ///////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  const orderRef = collection(db, "Orders");
  const navigate = useNavigate("");
  let QRPayment = false;
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
          `${showDate.getDate()}-${
            showDate.getMonth() + 1
          }-${showDate.getFullYear()}-${showDate.getHours()}-${orderData.id}`
        ),
        {
          ...orderData,
          ProductId: id,
          price: price,
          image: image,
          title: title,
          id: `${showDate.getDate()}-${
            showDate.getMonth() + 1
          }-${showDate.getFullYear()}-${showDate.getHours()}-${orderData.id}`,
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
          userName: Name,
          orderDate:
            showDate.getDate() +
            "/" +
            (showDate.getMonth() + 1) +
            "/" +
            showDate.getFullYear() +
            " " +
            showDate.getHours() +
            ":" +
            showDate.getMinutes(),
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
  return (
    <>
      <div
        className="absolute h-full w-full p-6  bg-gradient-to-b from-primary to-transparent from-slate-200"
        // visible={paymentOptionBtnPopUp}
        // onHide={() => setpaymentOptionBtnPopUp(false)}
      >
        <div className="flex  justify-center mt-50 ">
          <div className="flex flex-col w-fit justify-center p-6  border-2 rounded-xl shadow-lg  bg-white ">
            <p className="flex justify-center mb-2 font-bold">
              Choose a payment option
            </p>
            <p className=" font-bold">Your Location: {location}</p>
            <p className=" font-bold mb-4">Your Phone No.: {phone_number}</p>

            <div className="flex justify-start w-full">
              {QR_code && (
                <button
                  onClick={() => {
                    QRPayment = true;
                    createOrder({ id: uuidv4() });
                  }}
                  className="bg-primary border-2 w-fit rounded-md px-4 py-1 md:px-16  text-white font-bold text-sm"
                >
                  QR Code
                </button>
              )}

              {COD && (
                <button
                  className="bg-primary ml-2 border-2 w-fit rounded-md px-4 py-1 md:px-16  text-white font-bold text-sm"
                  onClick={() => createOrder({ id: uuidv4() })}
                >
                  Cash On Delivery
                </button>
              )}
            </div>

            <div className="flex flex-col align-items mt-5 w-full">
              <div className="flex justify-between w-full">
                <div
                  onClick={() => navigate("/")}
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
      </div>
    </>
  );
}

export default CartCheckout;
