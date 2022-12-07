import React, {useEffect}from 'react'
import BottomBar from "./BottomBar";
import NavBar from "./NavBar";
import db from "../firebase"
import { onSnapshot, collection, doc,deleteDoc, setDoc, getDocs } from "firebase/firestore"
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/actions";
import { Link} from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { async } from '@firebase/util';







const Cart = () => {
    const { user } = useAuth()
    

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
    const { title, email, image, Type_parameters,id  } =cart_product;
    if (email === user.email)
    return (
      <div className="bg-white" key={index}>
         {/* <Link to={`/product/${id}`}>  */}
          <div className="">
            <div className="bg-white hover:bg-secondary rounded-2xl p-2 mt-2 md:flex md:justify-start ">          
                <img className="rounded-lg object-cover h-56 w-min " src={image} alt={title} />
                <div className=' ml-4'>
                <div className="font-sans text-2xl">{title}</div>
                <div className="font-sans text-sm text-gray-400">Size {Type_parameters}</div>
                <div className='mt-10 '>
                <Link
                className="bg-primary border-2 rounded-full py-2 px-10 md:px-16  text-white font-bold text-sm "
                to="/"
              >
                <input type="button" value="buy now"></input>
              </Link>
              <button 
              className='bg-primary border-2 rounded-full py-2 px-10 ml-2 md:px-16  text-white font-bold text-sm'
              onClick={async() =>{await deleteDoc(doc(db,"Cart",id))}}

              >
              delete
              </button>
              {/* <button
                className="bg-primary border-2 rounded-full py-2 px-10 ml-2 md:px-16  text-white font-bold text-sm "
                onClick={() =>deleteDoc(doc(db, "Cart", email))}
              >
                <input type="button" value="delete" ></input>
              </button> */}
              </div>
                </div>
           
           </div>
          </div>
        {/* </Link>  */}
      </div>
    );
  });





    return (
        <div className=''>
           <div> <NavBar /> </div>
           {/* main compponents */}
           <div className='md:mx-10'>
            <h1 className=' invisible w-0 h-0 md:visible md:w-fit md:h-fit uppercase text-2xl font-sans'>My cart</h1>
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