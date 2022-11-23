import React, { useEffect , useState} from "react";
import BottomBar from "./BottomBar";
import Search from "./Search";
import { IoHomeOutline } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { selectedProduct, removeSelectedProduct } from "../redux/actions";
import { useDispatch, useSelector  } from "react-redux";
import {
  onSnapshot,
  collection,
  doc,
  setDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import db from "../firebase";

const ProductDetails = () => {
  const { productId } = useParams();
  const product = useSelector((state) => state.product);
  //const { image, title, price, type, description,store_name,id } = product;
  const dispatch = useDispatch();
  const docRef = doc(db, "Products", productId);
  const fetchProductDetail = async (id) => {
    const response = await getDoc(docRef);
    if (response.exists()) {
      console.log("obeid", response.data());
      dispatch(selectedProduct(response.data));
    } else {
      console.log("Document does not exist");
    }
  };

  useEffect(() => {
    if (productId && productId !== "") fetchProductDetail(productId);
    console.log("has has been")
    return () => {
      dispatch(removeSelectedProduct());
    };
  }, []);

  //     const { productId } = useParams();
  // //  \  const productId = useParams();
  // let product = useSelector((state) => state.product);

  //     console.log("productId")
  //     console.log("productId" , productId)

  //     const dispatch = useDispatch();
  //     const docRef = doc(db, "Products",productId );
  //     console.log("docref" , docRef)

  //     const fetchProductDetail = (id) => {
  //         getDoc(doc(db, "Products",productId)).then(docSnap => {
  //             if (docSnap.exists()) {
  //                 dispatch(selectedProduct(fetchProductDetail.data));
  //               console.log("Document data:", docSnap.data());
  //             } else {
  //               console.log("No such document!");
  //             }
  //           })

  //         }

  //        // return onSnapshot(doc(db, "Products",productId), (snapshot) => {
  //         // const response = getDocs(snapshot);
  //         // snapshot.doc.map(doc => doc.response())
  //         // dispatch(selectedProduct(response.data))

  //     useEffect(() => {
  //         if (productId && productId !== "") fetchProductDetail(productId);
  //         return () => {
  //           dispatch(removeSelectedProduct());
  //         };
  //       }, [productId]);

  //     const responce =product,(db, "Products",productId =>{
  //     //  product.getDoc((product ,productId) => {

  //         const { image, title, price, type, description,store_name,id } = product;

  //         return(

  //             <>
  //                 <div className="" key={productId}>
  //              <Link to={`/product/${id}`}>
  //               <div className="">
  //                 <div className="">
  //                   <div className="">
  //                     <img className="rounded-lg object-cover h-56 w-full" src={image} alt={title} />
  //                   </div>
  //                   <div className="">
  //                     <div className="">{title}</div>
  //                     <div className="">$ {price}</div>
  //                     <div className="">{description}</div>
  //                     <div className="">{store_name}</div>
  //                     <div className="">{type}</div>
  //                   </div>
  //                 </div>
  //               </div>
  //             </Link>
  //           </div>

  //             </>
  //         )

  //     }
  //     )

  //     // const renderProductsList = products.map((product, index) => {
  //     //     const { title, store_name, description, price, store_avatar, image, type, rate,id  } =product;
  //     //     console.log(product)
  //     //     // console.log('Added document with ID: ', product.id);
  //     //     return (
  //     //       <div className="" key={index}>
  //     //          <Link to={`/product/${id}`}>
  //     //           <div className="">
  //     //             <div className="">
  //     //               <div className="">
  //     //                 <img className="rounded-lg object-cover h-56 w-full" src={image} alt={title} />
  //     //               </div>
  //     //               <div className="">
  //     //                 <div className="">{title}</div>
  //     //                 <div className="">$ {price}</div>
  //     //                 <div className="">{rate}</div>
  //     //               </div>
  //     //             </div>
  //     //           </div>
  //     //         </Link>
  //     //       </div>
  //     //     );
  //     //   });

  // const renderProductsList1 = product.map((product, index) => {
  //   const {
  //     title,
  //     store_name,
  //     description,
  //     price,
  //     store_avatar,
  //     image,
  //     type,
  //     rate,
  //     id,
  //   } = product;
  //   console.log("123098", product);
  //   return (
  //     <div className="" key={index}>
  //       <Link to={`/product/${id}`}>
  //         <div className="">
  //           <div className="">
  //             <div className="">
  //               <img
  //                 className="rounded-lg object-cover h-56 w-full"
  //                 src={image}
  //                 alt={title}
  //               />
  //             </div>
  //             <div className="">
  //               <div className="">{title}</div>
  //               <div className="">$ {price}</div>
  //               <div className="">{rate}</div>
  //             </div>
  //           </div>
  //         </div>
  //       </Link>
  //     </div>
  //   );
  // });

  return (
    <div>
      <div className="bg-white">
        <Search />
        <div className="px-6 bg-white md:px-16 lg:px-56">
          <div className="my-4"></div>
          <div className="my-4">{/* {renderCategoryList1} */}</div>
          <div className="my-4 grid grid-cols-2 gap-6 xl:grid-cols-3 2xl:grid-cols-4">
            {/* {renderProductsList1} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
