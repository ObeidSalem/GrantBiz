import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import BottomBar from '../Navigation/BottomBar'
import db from "../../firebase"
import { onSnapshot, collection, doc, setDoc, getDocs, getDoc, query, where } from "firebase/firestore"
import { setStoreProducts } from '../../redux/actions'
import CurrencyFormat from 'react-currency-format';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import Avatar from 'react-avatar-edit';
import { UserAuth } from '../../context/AuthContext'
import { uuidv4 } from '@firebase/util'
import {
    IoArrowBackOutline,
    IoCreateOutline,
    IoStorefrontOutline,
} from 'react-icons/io5'

const AddProduct = () => {

    const { user } = UserAuth()

    const currentUser = useSelector((state) => state.currentUser);
    const { email, store_avatar, StoreName, store_location, store_type,phone_number } = currentUser

    const navigate = useNavigate("");
    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [type, setType] = useState("");
    const [typeParameters, setTypeParameters] = useState([]);
    const [description, setDescription] = useState("");

    const [imageCrop, setImageCrop] = useState(false);
    const [src, setSrc] = useState(false);
    const [profile, setProfile] = useState([]);
    const [pView, setPView] = useState("");

    const onClose = () => {
        setPView(null)
    }

    const onCrop = (view) => {
        setImage(view)
    }

    const storage = getStorage();
    // const storageRef = ref(storage, `/StoreAvatars/${store_name}`);

    const saveCropImage = () => {
        console.log("image", { image })
        // setProfile([...profile, { image }])

        // const uploadTask = uploadBytesResumable(storageRef, image);
        // uploadTask.on('state_changed', (snapshot) => {
        //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        //     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //     console.log('Upload is ' + progress + '% done');
        //     switch (snapshot.state) {
        //         case 'paused':
        //             console.log('Upload is paused');
        //             break;
        //         case 'running':
        //             console.log('Upload is running');
        //             break;
        //     }
        // },
        //     (error) => {
        //         // A full list of error codes is available at
        //         // https://firebase.google.com/docs/storage/web/handle-errors
        //         switch (error.code) {
        //             case 'storage/unauthorized':
        //                 // User doesn't have permission to access the object
        //                 break;
        //             case 'storage/canceled':
        //                 // User canceled the upload
        //                 break;

        //             // ...

        //             case 'storage/unknown':
        //                 // Unknown error occurred, inspect error.serverResponse
        //                 break;
        //         }
        //     },
        //     () => {
        //         // Upload completed successfully, now we can get the download URL
        //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        //             console.log('File available at', downloadURL);
        //             setImage(downloadURL)

        //         });
        //     }
        // );

    }

    const onFileChange = (event) => {
        const file = event.target.file[0];
        if (!file) {
            setImage(null);
        } else {
            setImage(file);
        }

    };

    const usersRef = collection(db, "Products");
    async function handleSubmit({id}) {
        try {

            const splitArrayTypeParameters = typeParameters.split(", ");

            const data = {
                id: id,
                email: user.email,
                image:"https://cdn.tasteatlas.com/images/dishes/2e908f5c52cf45f58f5801aefe99151d.jpg",
                title:title,
                price:price,
                type:type,
                type_parameters:splitArrayTypeParameters,
                description:description,
                rate:"5",
                StoreName:StoreName,
                store_avatar:store_avatar,
                store_phone_number:phone_number
            }
            console.log("data", data)
            const response = await setDoc(doc(usersRef, id), {
                ...data
            });
            // if (response.hasOwnProperty('message')) {
            //     console.log(response.message);
            // }
            // refreshPage()
            navigate("/");
        } catch (err) {
            // refreshPage()
            console.error(err);
        }
    }

    function refreshPage() {
        window.location.reload(false);
    }

    return (
        <div className="md:px-36 lg:px-96 bg-white">
            <div className="bg-white h-screen static">
                <div className="px-6 bg-white  pb-16 md:px-36 lg:px-96">
                    <div className="my-10 flex justify-start align-center">
                        <Link to={`/`}><IoArrowBackOutline className="text-black h-8 w-10 mr-2 active:text-primary" /></Link>
                        <p className="text-2xl font-semibold w-full">Add new Product</p>
                    </div>
                    <br />
                    <form onSubmit={handleSubmit}>
                        <div className="mt-4">
                            <div className="flex justify-center">
                                <Dialog className="absolute h-full w-full top-0 left-0 p-6 bg-gradient-to-b from-primary to-transparent from-slate-200"
                                    visible={imageCrop}
                                    onHide={() => setImageCrop(false)}
                                >
                                    <div className="flex flex-row justify-center ">
                                        <div className="flex flex-col w-fit justify-center m-0 p-6 border-2 rounded-xl shadow-lg  bg-white">
                                            <p> Update Store Avatar</p>
                                            {/* <Avatar
                                                className="m-0"
                                                width={285}
                                                height={200}
                                                onCrop={onCrop}
                                                onClose={onClose}
                                                src={src}
                                                shadingColor={"#474649"}
                                                backgroundColor={"#474649"}
                                            /> */}
                                            <InputText
                                                type="file"
                                                accept="/image/*"
                                                // style={{ display: "none" }}
                                                onChange={onFileChange}
                                            />
                                            <div className="flex flex-col align-items mt-5 w-12">
                                                <div className="flex justify-between  content-around w-72 overflow-x">
                                                    <div
                                                        onClick={() => setImageCrop(false)}
                                                        className="flex justify-center items-center px-4 py-2 w-20 max-w-xs text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                                                    >Cancel</div>
                                                    <div
                                                        onClick={saveCropImage}
                                                        className="flex justify-center items-center px-4 py-2 w-20 max-w-xs text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                                                    >Upload</div>
                                                    <div
                                                        onClick={() => setImageCrop(false)}
                                                        className="flex justify-center items-center px-4 py-2 w-20 max-w-xs text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                                                    >Save</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog>
                                {image ?
                                    <div className="flex flex-col" onClick={() => { setImageCrop(true) }}                                    >
                                        <div className="flex flex-col justify-center items-center  h-48 w-48 active:text-primary">
                                            < img
                                                src={image}
                                                alt="Store Avatar"
                                                className="border-stone-400 border border-black  rounded h-48 w-48 active:text-primary "
                                            />
                                            <div className="flex flex-col justify-center items-end w-60">
                                                <IoCreateOutline className=" text-black h-8 w-10 active:text-primary" />
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className="flex flex-col" onClick={() => { setImageCrop(true) }}                                    >
                                        <div className="flex flex-col justify-center items-center border-2 border-black rounded h-48 w-48 active:text-primary">
                                            <IoStorefrontOutline className=" h-32 w-32" />
                                            {/* <div className="flex flex-col justify-center items-end w-60">
                                                <IoCreateOutline className=" text-black h-8 w-10 active:text-primary" />
                                            </div> */}
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Product Name
                            </label>
                            <div className="flex flex-col items-start border-solid border-black ">
                                <input
                                    type="text"
                                    name="Product Name"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    className="block w-full  p-2  mt-1 border border-gray-400 rounded-md shadow-sm "
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Price
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="text"
                                    name="StoreLocation"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                    className="block w-full  p-2  mt-1 border border-gray-400 rounded-md shadow-sm "
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Variant name e.g Size, Color, Package or else
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="text"
                                    name="StoreType"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    required
                                    className="block w-full  p-2  mt-1 border border-gray-400 rounded-md shadow-sm "
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Variants e.g. Small, Medium, Large
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="text"
                                    name="StoreType"
                                    value={typeParameters}
                                    onChange={(e) => setTypeParameters(e.target.value)}
                                    required
                                    className="block w-full  p-2  mt-1 border border-gray-400 rounded-md shadow-sm "
                                />
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
                                    name="StoreType"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                    className="block w-full  p-2  mt-1 border border-gray-400 rounded-md shadow-sm "
                                />
                            </div>
                        </div>
                        <div className="my-10 flex justify-center">
                            <Link to={`/`}
                                className="flex justify-center items-center px-4 py-2 w-full max-w-xs text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                            >Cancel
                            </Link>
                            <div
                                onClick={() => handleSubmit({id: uuidv4()})}
                                className="flex justify-center items-center px-4 py-2 w-full max-w-xs text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                            >Continue
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <BottomBar />
        </div>
    )
}

export default AddProduct