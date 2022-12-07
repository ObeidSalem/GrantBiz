import React, { useRef, useState } from 'react'
import BottomBar from "../Navigation/BottomBar";
import NavBar from '../Navigation/NavBar';
import {
    IoArrowBackOutline,
    IoCreateOutline,
    IoStorefrontOutline,
} from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import Avatar from 'react-avatar-edit';
import { collection, doc, updateDoc, } from "firebase/firestore";
import db from "../../firebase";
import storage from "../../firebase";
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";


function CreateMyShop() {

    const currentUser = useSelector((state) => state.currentUser);
    const { email, store_avatar, store_name, store_location, store_type } = currentUser

    const navigate = useNavigate("");
    const [Error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [StoreName, setStoreName] = useState(store_name);
    const [StoreLocation, setStoreLocation] = useState(store_location);
    const [StoreType, setStoreType] = useState(store_type);

    const [image, setImage] = useState("");
    const [imageCrop, setImageCrop] = useState(false);
    const [src, setSrc] = useState(false);
    const [profile, setProfile] = useState([]);
    const [pView, setPView] = useState("");

    const onClose = () => {
        setPView(null)
    }

    const onCrop = (view) => {
        console.log("view", view)
        setImage(view)
    }

    const storage = getStorage();
    const storageRef = ref(storage, `/StoreAvatars/${store_name}`);

    const saveCropImage = () => {
        console.log("image", { image })
        setProfile([...profile, { image }])

        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on('state_changed', (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
            }
        },
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    // ...

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                });
            }
        );

        setImageCrop(false)
    }

    const onFileChange = (event) => {
        const file = event.target.file[0];
        if (!file) {
            setImage(null);
        } else {
            setImage(file);
        }

    };

    const usersRef = collection(db, "Users");
    async function handleSubmit(newStore) {
        try {
            setError("");
            setLoading(true);
            const response = await updateDoc(doc(usersRef, email), {
                ...newStore, own_store: true, store_avatar: image,
            });
            if (response.hasOwnProperty('message')) {
                setError(response.message);
            }
            refreshPage()
            setLoading(false);
        } catch (err) {
            navigate("/");
            refreshPage()
            console.error(err);
            console.log("newStore", newStore)
        }
    }

    function refreshPage() {
        window.location.reload(false);
    }

    return (
        <div className="w-full">
            <div className="bg-white h-screen static">
                <div className="px-6 bg-white  pb-16 md:px-36 lg:px-96">
                    <div className="my-10 flex justify-start align-center">
                        <Link to={`/`}><IoArrowBackOutline className="text-black h-8 w-10 mr-2 active:text-primary" /></Link>
                        <p className="text-2xl font-semibold w-full">Fill store information </p>
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
                                            <Avatar
                                                className="m-0"
                                                width={285}
                                                height={200}
                                                onCrop={onCrop}
                                                onClose={onClose}
                                                src={src}
                                                shadingColor={"#474649"}
                                                backgroundColor={"#474649"}
                                            />
                                            <InputText
                                                type="file"
                                                accept="/image/*"
                                                style={{ display: "none" }}
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
                                                className="border-stone-400 border-2 border-black  rounded-full h-48 w-48 active:text-primary "
                                            />                                            <div className="flex flex-col justify-center items-end w-60">
                                                <IoCreateOutline className=" text-black h-8 w-10 active:text-primary" />
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className="flex flex-col" onClick={() => { setImageCrop(true) }}                                    >
                                        <div className="flex flex-col justify-center items-center border-2 border-black rounded-full h-48 w-48 active:text-primary">
                                            <IoStorefrontOutline className=" h-32 w-32" />
                                            <div className="flex flex-col justify-center items-end w-60">
                                                <IoCreateOutline className=" text-black h-8 w-10 active:text-primary" />
                                            </div>
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
                                Store Name
                            </label>
                            <div className="flex flex-col items-start border-solid border-black ">
                                <input
                                    type="text"
                                    name="StoreName"
                                    value={StoreName}
                                    onChange={(e) => setStoreName(e.target.value)}
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
                                Store Location
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="text"
                                    name="StoreLocation"
                                    value={StoreLocation}
                                    onChange={(e) => setStoreLocation(e.target.value)}
                                    required
                                    className="block w-full  p-2  mt-1 border border-gray-400 rounded-md shadow-sm "
                                />
                            </div>
                        </div>
                        {/* <div className="mt-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Store Type
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="text"
                                    name="StoreType"
                                    value={StoreType}
                                    onChange={(e) => setStoreType(e.target.value)}
                                    required
                                    className="block w-full  p-2  mt-1 border border-gray-400 rounded-md shadow-sm "
                                />
                            </div>
                        </div> */}
                        <div className="my-10 flex justify-center">
                            <div
                                onClick={() => handleSubmit({ StoreName, StoreLocation })}
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

export default CreateMyShop