import React, {useEffect,useState}from 'react'
import BottomBar from "./Navigation/BottomBar";
import NavBar from "./Navigation/NavBar";
import db from "../firebase"
import { onSnapshot, collection, doc,deleteDoc, setDoc, getDocs } from "firebase/firestore"
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/actions";
import { Link} from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { async } from '@firebase/util';
import { Dialog } from "primereact/dialog";
import { IoArrowBackOutline } from 'react-icons/io5';








const Cart = () => {
    const { user } = useAuth()
    const [paymentOptionBtnPopUp, setpaymentOptionBtnPopUp] = useState(false);
    const currentUser = useSelector((state) => state.currentUser);
    const { phone_number,location } = currentUser;

    

    const cart_products = useSelector((state) => state.allProducts.products);
  const dispatch = useDispatch();

  const fetchCartProducts = () => {
    return onSnapshot(collection(db, "Cart"), (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data())
      dispatch(setProducts(data))
    })

  }

  useEffect(() => {

    try {
      fetchCartProducts()
    } catch (error) {
      console.log(error)
    }


  }, [])

  const renderCartProductsList = cart_products.map((cart_product, index) => {
    const { title, email, image,id  } =cart_product;
    if (email === user?.email)
    return (
      <div className="bg-white" key={index}>
         {/* <Link to={`/product/${id}`}>  */}
          <div className="">
            <div className="bg-white hover:bg-secondary rounded-2xl p-2 mt-2 md:flex md:justify-start ">          
                <img className="rounded-lg object-cover h-56 w-min " src={image} alt={title} />
                <div className=' ml-4'>
                <div className="font-sans text-2xl">{title}</div>
                {/* <div className="font-sans text-sm text-gray-400">Size {Type_parameters}</div> */}
                <div className='mt-10 '>
                <div>
                <button
                  type="button"
                  value="buy now"
                  onClick={() => setpaymentOptionBtnPopUp(true)}
                  className="bg-primary border-2 rounded-full px-4 py-2 md:px-16  text-white font-bold text-sm"
                >
                  buy now
                </button>
              </div>
              <button 
              className='bg-red-500 border-2 rounded-full px-4 py-2 md:px-3 ml-16 text-white font-bold text-sm border-red-600'
              onClick={async() =>{await deleteDoc(doc(db,"Cart",id))}}

              >
              delete
              </button>
              <Dialog
                  className="absolute h-full w-full top-0 left-0 p-6 bg-gradient-to-b from-primary to-transparent from-slate-200"
                  visible={paymentOptionBtnPopUp}
                  onHide={() => setpaymentOptionBtnPopUp(false)}
                >
                  <div className="flex flex-row justify-center ">
                    <div className="flex flex-col w-fit justify-center m-36 p-6  border-2 rounded-xl shadow-lg  bg-white ">
                      <p className="flex justify-center mb-2 font-bold" >
                        Choose a payment option
                      </p>
                      <p className=" font-bold">your location: {location}</p>
                      <p className=" font-bold mb-4">your phone number: {phone_number}</p>
                        
                      <div>
                        <button className="bg-primary border-2 rounded-full px-4 py-1 md:px-16  text-white font-bold text-sm">
                          Online Payment
                        </button>

                        <button
                          className="bg-primary border-2 rounded-full px-4 py-1 md:px-16  text-white font-bold text-sm"
                          // onClick={() => createOrder({ id: uuidv4() })}
                        >
                          Cash On Delivery
                        </button>
                      </div>

                      <div className="flex flex-col align-items mt-5 w-12">
                        <div className="flex justify-between  content-around w-72">
                          <div
                            onClick={() => setpaymentOptionBtnPopUp(false)}
                            className="bg-red-500 border-2 rounded-full px-4 py-2 md:px-3  text-white font-bold text-sm border-red-600"
                          >
                            Cancel
                          </div>
                          <div
                            // onClick={saveCropImage}
                            className="bg-white border-2 rounded-full px-4 py-2 md:px-3  text-primary font-bold text-sm border-primary"
                          >
                            Change your information
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog>

              </div>
                </div>
           
           </div>
          </div>
        {/* </Link>  */}
      </div>
    );
  });


    /////////////////////////////////////////////////////////////////////////////////////////////////////

  //         const orderref = collection(db, "Orders");
  // const navigate = useNavigate("");
  // const Status = "to be prepared";
  // async function createOrder(orderData) {
  //   try {
  //     setError("");
  //     setLoading(true);
  //      console.log("hgi",email)
  //     const response = await setDoc(doc(orderref, orderData.id), {
  //       ...orderData,
  //       price: price,
  //       image: image,
  //       title: title,
  //       id: orderData.id,
  //       Status: Status,
  //       userPhoneNumber: phone_number,
  //       storePhoneNumber: store_phone_number,
  //       email:email
  //     });
  //     alert("done");
  //     setLoading(false);
  //     navigate("/")
  //   } catch (err) {
  //     // navigate("/");
  //     console.error(err);
  //     console.log("cartdata", orderData);
  //   }
  // }



    ///////////////////////////////////////////////////////////////////////////////////////////////////////////






    return (
        <div className=''>
           <div className="py-4 flex w-full justify-start align-center ml-4">
        <Link to={`/`}>
          <IoArrowBackOutline className="text-black h-8 w-10 mr-2 active:text-primary" />
        </Link>
        <p className="text-2xl font-semibold w-full">Back</p>
      </div>
           {/* main compponents */}
           <div className='px-6 pb-20 bg-white md:px-16 lg:px-56'>
            <h1 className='  md:w-fit md:h-fit uppercase text-2xl font-sans md:px-16'>My cart</h1>
            {/* product detail */}
            <div className=' mb-28'>
                {renderCartProductsList}
            </div>
            </div>
            <div>
                <BottomBar />
            </div>
     
        </div>
    )
}

export default Cart