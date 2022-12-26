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

function SellerDispute() {
  const { orderId } = useParams();


  const [Error, setError] = useState("");


  const { user } = useAuth();

  /////////////////////////////////////////////////////////////////
  const DisputesRef = collection(db, "SellerDisputes");
  const OrdersRef = collection(db, "Orders");
  const navigate = useNavigate("");
  const showDate = new Date();
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setError("");
      const responseDispute = await setDoc(doc(DisputesRef, orderId), {
        user:user.email,
        orderId:orderId,
        disputeDescription:disputeDescription,
        disputeType: type,
        ProofOfImage: ProofOfImage,
        disputeDate1:`${showDate.getDate()}-${showDate.getMonth()}-${showDate.getFullYear()}-${showDate.getHours()}`,
      });
      const responseOrder = await updateDoc(doc(OrdersRef, orderId), {
        SellerDisputed:true,
      });
      navigate(-1);
    } catch (err) {
      navigate(-1);
      console.error(err);
    }
  }
  ////////////////////////////////////////////////////////////////

  const [type, setType] = useState('Client has not paid');
  const [disputeDescription, setDisputeDescription] = useState('');

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
            <Link to={`/`}>
              <IoArrowBackOutline className="text-black h-8 w-10 mr-2 active:text-primary" />
            </Link>
            <p className="text-2xl font-semibold w-full">File a Dispute</p>
          </div>
          <br />
          <form onSubmit={handleSubmit} className="bg-white border-2 shadow-sl  hover:shadow-md rounded-2xl p-2 m-0 ">
            <h1 className="text-lg font-semibold">File Dispute</h1>
            {Error && (
              <Alert
                className="bg-red-600 w-full px-3 my-5 rounded-md flex flex-row"
                variant=""
                color="red"
              >
                {Error}
              </Alert>
            )}

            <div className="flex flex-col mt-4 ">
              <div className="">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Type of Dispute
                </label>
                <div className="flex flex-col items-start border-solid border-black ">
                  <select value={type} onChange={(event) => { setType(event.target.value) }}
                    className="block w-full  p-2  mt-1 border border-gray-400 rounded-md shadow-sm "
                  >

                    <option value="Client has not paid">Client has not paid</option>

                    <option value="Fake online payment">Fake online payment</option>

                    <option value="Client Failed to Update Order Status">Client Failed to Update Order Status</option>

                    <option value="Other">Other</option>

                  </select>
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
                    name="StoreLocation"
                    value={disputeDescription}
                    onChange={(e) => setDisputeDescription(e.target.value)}
                    required
                    className="block w-full  p-2  mt-1 border border-gray-400 rounded-md shadow-sm "
                  />
                </div>
              </div>
              <p className="text-lg ">Upload img if any</p>
              <p className="text-lg mb-2">Less than 500KB</p>
              <input
                required
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
              <button type="submit"
                className="flex justify-center cursor-pointer items-center px-4 py-2 w-full max-w-xs text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <BottomBar />
    </div>
  );
}

export default SellerDispute;
