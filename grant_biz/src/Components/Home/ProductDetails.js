import React, { useEffect, useState } from "react";
import BottomBar from "../Navigation/BottomBar";
import Search from "./Search";
import {
  IoStorefrontOutline,
  IoChatbubbleEllipsesOutline,
} from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { selectedProduct, removeSelectedProduct, setProductStore } from "../../redux/actions";
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
import { setCurrentUser } from '../../redux/actions/index';



const cash = (true);
const online_pay = (true);


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
    email,
  } = product;
  console.log("product details",product)
  // const [Title, setTitle] = useState(title);
  // const [Image, setImage]= useState(image);
  const [Error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [Type_parameters, setType_parameters]= useState(type_parameters);
  const [paymentOptionBtnPopUp, setpaymentOptionBtnPopUp] = useState(false)



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
   console.log("prodductstore",procutStore )


  useEffect(() => {
    if (email) fetchUser(email);
    else{}
  }, [email]);
  ///////////////////////////////////////////////////////////////////
  // fetch curent user data
 
  
    const fetchCurentUser = async () => {
      const docUsersRef = doc(db, "Users", user.email);
      const docSnap = await getDoc(docUsersRef);
  
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        dispatch(setCurrentUser(docSnap.data()))
  
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
      return docSnap.data()
    }
    const currentUser = useSelector((state) => state.currentUser);
    const { phone_number } = currentUser;
    

    useEffect(() => {
      try {
        if(email)fetchCurentUser(email)
      } catch (error) {
        console.log(error)
      }
    }, [email])
   
 
 
  ///////////////////////////////////////////////////////////////////
  const cartref = collection(db, "Cart");
  async function handleSubmit(cartdata) {
      try {
          setError("");
          setLoading(true);
          const response = await setDoc(doc(cartref, cartdata.id), {
           ...cartdata, image :image, title:title,userphonenumber:phone_number, Type_parameters:Type_parameters , id:cartdata.id 
          });
         alert("done")
          setLoading(false);
      } catch (err) {
          // navigate("/");
          console.error(err);
          console.log("cartdata", cartdata)
      }
  }



  /////////////////////////////////////////////////////////////////
  const orderref = collection(db, "Orders");
  const Status = "to be prepared"
  async function createOrder(orderData){

    try {
      setError("");
      setLoading(true);
      console.log("hgi",orderData,phone_number)
      const response = await setDoc(doc(orderref, orderData.id), {
        ...orderData,price:price , image:image, title:title, Type_parameters:Type_parameters,id:orderData.id, Status: Status , userPhoneNumber:phone_number
      });
     alert("done")
      setLoading(false);
  } catch (err) {
      // navigate("/");
      console.error(err);
      console.log("cartdata", Type_parameters)
  }

   }
  ////////////////////////////////////////////////////////////////

  return (
    <div>
      <div className=" bg-gray-50 pb-48">
        <div className="hidden md:block">
          <NavBar />
        </div>
        <div className=" visible md:invisible md:h-0 md:w-0">
          <Search />
        </div>
        <div className="px-6  m-0 md:px-16 lg:px-56">
          {/* <div className="my-4">{renderCategoryList1}</div> */}
          <div className="flex flex-wrap mt-4 gap-3">
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
                total price
              </h2>

              <h2 className="font-serif font-semibold uppercase	mb-4 text-2xl ">
                RM{price}
              </h2>
              <div className="font-sans font-semibold uppercase	mb-4 text-2xl">
                Description
              </div>
              <div className=" w-64">{description}</div>
            </div>
            <Link to={`/StorePage/${email}`} className="flex-auto border h-24 w-fit rounded-xl p-3">
            <div className="">
              <div className="flex justify-start ">
                <img
                  className="ml-1 w-20 h-20 rounded-full"
                  src={store_avatar}
                  alt="Rounded avatar"
                ></img>
                <div className="ml-3">
                  <div
                    
                    className="text-black font-semibold text-lg ml-2"
                  >
                    {StoreName}
                  </div>
                  {/* <div key={user.email}>{store_avatar}</div> */}
                  <div
                 
                    className="text-black font-semibold text-lg"
                  >
                   at {StoreLocation}
                  </div>
                </div>
              </div>
            </div>
            </Link>
          </div>
          <div className="m-5">
            {/* <div className="font-sans font-semibold uppercase	mb-4 text-xl">
              {type}
            </div> */}
            {/* <div className="flex justify-start md:p-1">
              {type_parameters?.map((types, index) => {
                return (
                  <>
                  
                    <div key={index} className=" mt-5  text-white font-bold text-sm">
                      <input
                        className="border-2 ml-2 rounded-full bg-primary  h-10 w-28 hover:bg-gray-800  focus:outline-none focus:ring focus:ring-gray-700"
                        type="button"
                        value={types}
                        onClick={(e) => setType_parameters(e.target.value)}
                       

                      ></input>
                    </div>
                    
                   
                  </>
                );
              })}
            </div> */}
            
          </div>
          
          <div className="flex justify-start mt-5">
            {/* <div>
              desktop version
              <Link
                className="bg-primary border-2 rounded-full px-4 py-1 mt-5 m-2 text-white font-bold text-sm pc-only"
                to="/"
              >
                <input type="button" value="store"></input>
              </Link>
            </div> */}
            <div className=" mx-5">
              {/* phone version */}
              <Link
                className=" text-black py-3 text-sm text-center w-20 "
                to="/"
              >
                <IoStorefrontOutline className="text-primary h-6 w-full " />
                store
                {/* <input type="button" value="store"></input> */}
              </Link>
            </div>
            {/* <div>
              desktop 
              <Link
                className="pc-only bg-primary border-2 rounded-full px-4 py-1 mt-5 m-2 text-white font-bold text-sm "
                to="/"
              >
                <input type="button" value="chat"></input>
              </Link>
            </div> */}
            <div className="mx-3">
              {/* phone version */}
              <Link
                className=" text-black py-3 text-sm text-center w-20 "
                to="/"
              >
                <IoChatbubbleEllipsesOutline className="text-primary h-6 w-full " />
                chat
              </Link>
            </div>
            <div className="mx-1">
              {/* desktop version */}
              <div
                onClick={() => handleSubmit({ image, title, Type_parameters , id: uuidv4() })}
                className="bg-white border-2 rounded-full px-4 py-2 md:px-3  text-primary font-bold text-sm border-primary"
              >
                <input type="button" value="add to cart"></input>
              </div>
            </div>
            <div className="mx-1">
              {/* desktop version */}
              <div
                
              >
                
                <button type="button" value="buy now" onClick={() => setpaymentOptionBtnPopUp(true) } className="bg-primary border-2 rounded-full px-4 py-2 md:px-16  text-white font-bold text-sm">buy now</button>
              </div>
              <div>

              <div>
                <div 
                //  className="bg-primary border-2 rounded-full px-4 py-1 md:px-16  text-white font-bold text-sm"
                 >
                  {paymentOptionBtnPopUp ? 
                   <div>
                <button 
                 className="bg-primary border-2 rounded-full px-4 py-1 md:px-16  text-white font-bold text-sm">
                    pay online</button>

                    <button 
                 className="bg-primary border-2 rounded-full px-4 py-1 md:px-16  text-white font-bold text-sm"
                 onClick={() =>createOrder({Type_parameters,id: uuidv4() })}
                 >
                    cash on delivry</button>
              </div>
              
               : "" }
                   </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomBar />
    </div>
  );
};

export default ProductDetails;