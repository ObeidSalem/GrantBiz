import React, { useEffect, useState } from 'react'
import { IoArrowBackOutline, IoCheckmarkCircleOutline, IoCheckmarkCircleSharp, IoDownloadOutline, IoTrashOutline } from 'react-icons/io5'
import { BsBoxSeam, BsTruck, } from "react-icons/bs";

import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BottomBar from '../Navigation/BottomBar'
import db from "../../firebase"
import { onSnapshot, collection, doc, setDoc, getDocs, getDoc, query, where, deleteDoc, updateDoc } from "firebase/firestore"
import { setStoreProducts } from '../../redux/actions'
import CurrencyFormat from 'react-currency-format';
import { UserAuth } from '../../context/AuthContext'




const ReceivedOrders = () => {

    const { user } = UserAuth()

    const [products, setProducts] = useState([]);

    // const dispatch = useDispatch();

    const currentUser = useSelector((state) => state.currentUser);
    const { email, Name, own_store, store_avatar, StoreName, store_location, store_type } = currentUser
    // const products = useSelector((state) => state.storeProducts.products);
    // console.log("products", products)

    const updateRef = collection(db, "Orders");


    const fetchOrders = async () => {

        const q = query(collection(db, "Orders"), where("sellerEmail", "==", user.email));

        const querySnapshot = await getDocs(q);
        const data = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            data.push(doc.data())
        });
        // console.log("data", data);
        setProducts(data)
        // dispatch(setStoreProducts(data))

    }


    useEffect(() => {
        try {
            if (user?.email) {
                fetchOrders()
            }
        } catch (error) {
            console.log(error)
        }
    }, [user])

    const [Category1, setCategory1] = useState(true);
    const [Category2, setCategory2] = useState(false);
    const [Category3, setCategory3] = useState(false);
    const [Category4, setCategory4] = useState(false);

    const [Primary1, setPrimary1] = useState("text-primary");
    const [Primary2, setPrimary2] = useState("");
    const [Primary3, setPrimary3] = useState("");
    const [Primary4, setPrimary4] = useState("");

    return (
        <div className="w-screen md:px-36 lg:px-96  bg-white overflow-none">
            <div className="py-4 flex w-full justify-start align-center">
                <Link to={`/`}>
                    <IoArrowBackOutline className="text-black h-8 w-10 mr-2 active:text-primary" />
                </Link>
                <p className="text-2xl font-semibold w-full">Received Orders</p>
            </div>

            <div className="h-full w-full flex justify-start align-center overflow">
                <div className=" w-full p-4 ">
                    <div className="w-full flex justify-between items-center">
                        <div className="w-full flex justify-start items-center">
                            <img src={store_avatar} alt={StoreName}
                                className="text-black h-10 w-10 rounded-full active:text-primary" />
                            <p className="text-lg ml-4">{StoreName}</p>
                        </div>

                    </div>
                    <div className="h-full w-full flex justify-center align-center ">
                        <div className="flex w-full items-center justify-between space-x-0 ">

                            <div className={`text-black py-3 text-sm text-center w-20 ${Primary1}`} to="/"
                                onClick={() => {
                                    setCategory1(true)
                                    setCategory2(false)
                                    setCategory3(false)
                                    setCategory4(false)
                                    setPrimary1("text-primary")
                                    setPrimary2("")
                                    setPrimary3("")
                                    setPrimary4("")
                                }}
                            >
                                <IoCheckmarkCircleOutline className={`text-black h-6 w-full ${Primary1}`} />
                                To Confirm
                            </div>
                            <div className={`text-black py-3 text-sm text-center w-20 ${Primary2}`} to="/Feed"
                                onClick={() => {
                                    setCategory1(false)
                                    setCategory2(true)
                                    setCategory3(false)
                                    setCategory4(false)
                                    setPrimary1("")
                                    setPrimary2("text-primary")
                                    setPrimary3("")
                                    setPrimary4("")
                                }}
                            >
                                <BsBoxSeam className={`text-black h-6 w-full ${Primary2}`} />
                                To Ship
                            </div>
                            <div className={`text-black py-3 text-sm text-center w-20 ${Primary3}`} to="/Feed"
                                onClick={() => {
                                    setCategory1(false)
                                    setCategory2(false)
                                    setCategory3(true)
                                    setCategory4(false)
                                    setPrimary1("")
                                    setPrimary2("")
                                    setPrimary3("text-primary")
                                    setPrimary4("")
                                }}
                            >
                                <BsTruck className={`text-black h-6 w-full ${Primary3}`} />
                                To Receive
                            </div>
                            <div className={`text-black py-3 text-sm text-center w-20 ${Primary4}`} to="/Feed"
                                onClick={() => {
                                    setCategory1(false)
                                    setCategory2(false)
                                    setCategory3(false)
                                    setCategory4(true)
                                    setPrimary1("")
                                    setPrimary2("")
                                    setPrimary3("")
                                    setPrimary4("text-primary")
                                }}
                            >
                                <IoCheckmarkCircleSharp className={`text-black h-6 w-full ${Primary4}`} />
                                Completed
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-full flex flex-col justify-start align-center ">
                {Category1 ?
                    <>
                        {products?.map((product) => {
                            const { StoreName, description, image, price, rate, title, type, type_parameters, id, isConfirmed } = product
                            console.log("product", product)
                            if (isConfirmed == false) {
                                return (
                                    <div className="p-4 mx-4 my-2 flex border border-gray-400 rounded-xl " key={id}>
                                        <div className="w-full flex flex-col justify-between items-center ">
                                            <div className="w-full flex flex-row justify-start items-center">
                                                <img src={image} alt={StoreName}
                                                    className="text-black h-20 w-20 rounded active:text-primary" />
                                                <div className="w-full flex flex-col">
                                                    <p className="text-lg ml-4">{title}</p>
                                                    <p className="text-md ml-4">{type} {type_parameters}</p>
                                                </div>
                                                <IoTrashOutline
                                                    onClick={async () => { await deleteDoc(doc(db, "Products", id)) }}
                                                    className="text-black h-8 w-10 mr-2 active:text-primary" />
                                            </div>
                                            <p className="text-sm w-full ">
                                                {description}
                                            </p>

                                            <div className="w-full flex flex-row justify-between">
                                                <CurrencyFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'RM '} />
                                                {/* <p className="text-md ">Available Stocks</p> */}
                                            </div>
                                            <div
                                                onClick={async () => {
                                                    const response = await updateDoc(doc(updateRef, id), {
                                                        isConfirmed: true,
                                                    });
                                                }}
                                                className="w-40 text-white text-center bg-red-600 p-2 rounded-full">
                                                Confirm Order
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        })}
                    </>
                    : ""
                }
                {Category2 ?
                    <>
                        {products?.map((product, index) => {
                            const { StoreName, description, image, price, rate, title, type, type_parameters, id, isConfirmed, isShipped } = product
                            if (isConfirmed === true && isShipped === false) {
                                return (
                                    <div className="p-4 mx-4 my-2 flex border border-gray-400 rounded-xl " key={id}>
                                        <div className="w-full flex flex-col justify-between items-center ">
                                            <div className="w-full flex flex-row justify-start items-center">
                                                <img src={image} alt={StoreName}
                                                    className="text-black h-20 w-20 rounded active:text-primary" />
                                                <div className="w-full flex flex-col">
                                                    <p className="text-lg ml-4">{title}</p>
                                                    <p className="text-md ml-4">{type} {type_parameters}</p>
                                                </div>
                                                <IoTrashOutline
                                                    onClick={async () => { await deleteDoc(doc(db, "Products", id)) }}
                                                    className="text-black h-8 w-10 mr-2 active:text-primary" />
                                            </div>
                                            <p className="text-sm w-full ">
                                                {description}
                                            </p>

                                            <div className="w-full flex flex-row justify-between">
                                                <CurrencyFormat className="font-sans	text-md" value={price} displayType={'text'} thousandSeparator={true} prefix={'RM '} />
                                                {/* <p className="text-md ">Available Stocks</p> */}
                                            </div>
                                            <div
                                                onClick={async () => {
                                                    const response = await updateDoc(doc(updateRef, id), {
                                                        isShipped: true,
                                                    });
                                                }}
                                                className="w-40 text-white text-center bg-red-600 p-2 rounded-full active:bg-primary">
                                                Confirm Shipments
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        })}
                    </>
                    : ""
                }
                {Category3 ?
                    <>
                        {products?.map((product, index) => {
                            const { StoreName, description, image, price, rate, title, type, type_parameters, id, isShipped, isReceivedFromSeller, isReceivedFromCustomer } = product
                            if (isShipped === true && isReceivedFromSeller === false) {
                                return (
                                    <>
                                        {isReceivedFromCustomer ?
                                            <div className="p-4 mx-4 my-2 flex border border-gray-400 rounded-xl " key={id}>
                                                <div className="w-full flex flex-col justify-between items-center ">
                                                    <div className="w-full flex flex-row justify-start items-center">
                                                        <img src={image} alt={StoreName}
                                                            className="text-black h-20 w-20 rounded active:text-primary" />
                                                        <div className="w-full flex flex-col">
                                                            <p className="text-lg ml-4">{title}</p>
                                                            <p className="text-md ml-4">{type} {type_parameters}</p>
                                                        </div>
                                                        <IoTrashOutline
                                                            onClick={async () => { await deleteDoc(doc(db, "Products", id)) }}
                                                            className="text-black h-8 w-10 mr-2 active:text-primary" />
                                                    </div>
                                                    <p className="text-sm w-full ">
                                                        {description}
                                                    </p>

                                                    <div className="w-full flex flex-row justify-between">
                                                        <CurrencyFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'RM '} />
                                                        {/* <p className="text-md ">Available Stocks</p> */}
                                                    </div>
                                                    <div
                                                        onClick={async () => {
                                                            const response = await updateDoc(doc(updateRef, id), {
                                                                isReceivedFromSeller: true,
                                                            });
                                                        }}
                                                        className="w-40 text-white text-center bg-red-600 p-2 rounded-full">
                                                        Confirm Receiving the Money
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            <div className="p-4 mx-4 my-2 flex border border-gray-400 rounded-xl " key={id}>
                                                <div className="w-full flex flex-col justify-between items-center ">
                                                    <div className="w-full flex flex-row justify-start items-center">
                                                        <img src={image} alt={StoreName}
                                                            className="text-black h-20 w-20 rounded active:text-primary" />
                                                        <div className="w-full flex flex-col">
                                                            <p className="text-lg ml-4">{title}</p>
                                                            <p className="text-md ml-4">{type} {type_parameters}</p>
                                                        </div>
                                                        <IoTrashOutline
                                                            onClick={async () => { await deleteDoc(doc(db, "Products", id)) }}
                                                            className="text-black h-8 w-10 mr-2 active:text-primary" />
                                                    </div>
                                                    <p className="text-sm w-full ">
                                                        {description}
                                                    </p>

                                                    <div className="w-full flex flex-row justify-between">
                                                        <CurrencyFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'RM '} />
                                                        {/* <p className="text-md ">Available Stocks</p> */}
                                                    </div>
                                                    <div className="w-40 text-white text-center bg-red-600 p-2 rounded-full">
                                                        Pending Customer Confirmation of Receiving
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </>
                                )
                            }
                        })}
                    </>
                    : ""
                }
                {Category4 ?
                    <>
                        {products?.map((product, index) => {
                            const { StoreName, description, image, price, rate, title, type, type_parameters, id, isShipped, isReceivedFromSeller, isReceivedFromCustomer } = product
                            if (isShipped === true && isReceivedFromSeller === true && isReceivedFromCustomer === true) {
                                return (
                                    <div className="p-4 mx-4 my-2 flex border border-gray-400 rounded-xl " key={id}>
                                        <div className="w-full flex flex-col justify-between items-center ">
                                            <div className="w-full flex flex-row justify-start items-center">
                                                <img src={image} alt={StoreName}
                                                    className="text-black h-20 w-20 rounded active:text-primary" />
                                                <div className="w-full flex flex-col">
                                                    <p className="text-lg ml-4">{title}</p>
                                                    <p className="text-md ml-4">{type} {type_parameters}</p>
                                                </div>
                                                <IoTrashOutline
                                                    onClick={async () => { await deleteDoc(doc(db, "Products", id)) }}
                                                    className="text-black h-8 w-10 mr-2 active:text-primary" />
                                            </div>
                                            <p className="text-sm w-full ">
                                                {description}
                                            </p>

                                            <div className="w-full flex flex-row justify-between">
                                                <CurrencyFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'RM '} />
                                                {/* <p className="text-md ">Available Stocks</p> */}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        })}
                    </>
                    : ""
                }
            </div>

            <BottomBar />
        </div>
    )
}

export default ReceivedOrders