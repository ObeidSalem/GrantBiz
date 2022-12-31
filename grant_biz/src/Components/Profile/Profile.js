import React, { useEffect, useState } from 'react'
import BottomBar from "../Navigation/BottomBar";
import NavBar from '../Navigation/NavBar';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth } from "../../context/AuthContext"
import {
  IoArrowBackOutline,
  IoExtensionPuzzleOutline,
  IoArrowForwardOutline,
  IoSettingsOutline,
  IoExitOutline,
  IoFileTrayOutline,
  IoCreateOutline,
  IoPersonOutline,
} from "react-icons/io5";


import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import Avatar from 'react-avatar-edit';
import { collection, doc, updateDoc, } from "firebase/firestore";
import db from "../../firebase";
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// import { useDispatch } from 'react-redux';
// import { setCurrentUser } from './redux/actions/index';

function Profile() {
  const { user, logOut } = useAuth()


  const currentUser = useSelector((state) => state.currentUser);
  console.log("currentUser", currentUser)
  const { email, Name,  profile_avatar, location } = currentUser

  const [customerName, setCustomerName] = useState(Name);
  const [customerLocation, setCustomerLocation] = useState(location);

  const [image, setImage] = useState(profile_avatar);
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

  const onFileChange = (event) => {
    const file = event.target.file[0];
    if (!file) {
      setImage(null);
    } else {
      setImage(file);
    }

  };

  const storage = getStorage();
  const storageRef = ref(storage, `/StoreAvatars/${Name}`);

  const saveCropImage = () => {
    console.log("image", { image })
    setProfile([...profile, { image }])

  }

  const usersRef = collection(db, "Users");
  async function handleSubmit() {
    try {
      const response = await updateDoc(doc(usersRef, email), {
        profile_avatar: image, Name: customerName, location: customerLocation,
      });
      // refreshPage()
      setImageCrop(false)
    } catch (err) {
      // refreshPage()
      console.error(err);
    }
  }

  return (
    <>
      {user ?
        <div className="px-6 bg-white pb-16 md:px-36 lg:px-96">
          <div className="my-4 flex justify-start align-center">
            <Link to={`/GrantBiz/`}>
              <IoArrowBackOutline className="text-black h-8 w-10 mr-2 active:text-primary" />
            </Link>
            <p className="text-2xl font-semibold w-full">My Profile </p>

          </div>
          <br />
          <Dialog className="absolute h-full w-full top-0 left-0 p-6 bg-gradient-to-b from-primary to-transparent from-slate-200"
            visible={imageCrop}
            onHide={() => setImageCrop(false)}
          >
            <div className="flex flex-row justify-center ">
              <div className="flex flex-col w-fit justify-center m-0 p-6 border-2 rounded-xl shadow-lg  bg-white">
                <p> Update Profile Avatar</p>
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
                <div className="mt-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 undefined"
                  >
                    Customer Name
                  </label>
                  <div className="flex flex-col items-start border-solid border-black ">
                    <input
                      type="text"
                      name="Name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
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
                    Customer Location
                  </label>
                  <div className="flex flex-col items-start">
                    <input
                      type="text"
                      name="location"
                      value={customerLocation}
                      onChange={(e) => setCustomerLocation(e.target.value)}
                      required
                      className="block w-full  p-2  mt-1 border border-gray-400 rounded-md shadow-sm "
                    />
                  </div>
                </div>
                <div className="flex flex-col align-items mt-5 w-12 ">
                  <div className="flex justify-between  content-around w-72 overflow-x">
                    <div
                      onClick={() => setImageCrop(false)}
                      className="flex justify-center items-center cursor-pointer px-4 py-2 w-20 max-w-xs text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                    >Cancel</div>
                    <div
                      onClick={saveCropImage}
                      className="flex justify-center items-center cursor-pointer px-4 py-2 w-20 max-w-xs text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                    >Upload</div>
                    <div
                      onClick={handleSubmit}
                      className="flex justify-center items-center cursor-pointer px-4 py-2 w-20 max-w-xs text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                    >Submit</div>
                  </div>
                </div>
              </div>
            </div>
          </Dialog>

          <div className=" ">
            <div className="my-0 flex justify-center ">
              {image ?
                <div className="flex flex-col" onClick={() => { setImageCrop(true) }}                                    >
                  <div className="flex flex-col justify-center items-center  h-48 w-48 active:text-primary ">
                    < img
                      src={image}
                      alt="Profile Avatar"
                      className="border-stone-400 border-2 border-black  rounded-full h-48 w-48 active:text-primary "
                    />
                    <div className="flex flex-col justify-center items-end w-60">
                      <IoCreateOutline className=" text-black h-8 w-10 active:text-primary" />
                    </div>
                  </div>
                </div>
                :
                <div className="flex flex-col  hover:cursor-pointer" onClick={() => { setImageCrop(true) }}                                    >
                  <div className="flex flex-col justify-center items-center border-2 border-black rounded-full h-48 w-48 active:text-primary">
                    <IoPersonOutline className=" h-32 w-32" />
                    <div className="flex flex-col justify-center items-end w-60">
                      <IoCreateOutline className=" text-black h-8 w-10 active:text-primary" />
                    </div>
                  </div>
                </div>
              }
            </div>
            <div className="flex justify-center my-2">
              <p className="text-2xl font-semibold ">{Name}</p>
            </div>
            <div className="flex justify-center my-2">
              <p className="text-2xl font-semibold ">{email}</p>
            </div>
            <div className="flex justify-center my-2">
              <p className="text-2xl font-semibold ">{location}</p>
            </div>
            <hr />
            <div  onClick={() => { setImageCrop(true) }} className="py-6 flex flex-row justify-between hover:cursor-pointer">
              <div className="flex flex-row justify-start">
                <IoSettingsOutline className="text-black h-8 w-10 mr-2 active:text-primary" />
                <p className="text-xl font-semibold ">Edit Profile Info</p>
              </div>
              <IoArrowForwardOutline className="text-black h-8 w-10 mr-2 active:text-primary" />
            </div>
            <Link className="py-6 flex flex-row justify-between" to={`/GrantBiz/Order`}>
              <div className="flex flex-row justify-start">
                <IoFileTrayOutline className="text-black h-8 w-10 mr-2 active:text-primary" />
                <p className="text-xl font-semibold ">Track My Orders</p>
              </div>
              <IoArrowForwardOutline className="text-black h-8 w-10 mr-2 active:text-primary" />
            </Link>
            <Link onClick={() => logOut()} to="/GrantBiz/" className="py-6 flex flex-row justify-between">
              <div className="flex flex-row justify-start">
                <IoExitOutline
                  className="text-red-600 h-8 w-10 mr-2 active:text-primary" />
                <p className="text-xl text-red-600 font-semibold ">Log Out</p>
              </div>
              <IoArrowForwardOutline className="text-red-600 h-8 w-10 mr-2 active:text-primary" />
            </Link>
          </div>

        </div>
        :
        <div className="px-6 bg-white h-screen  pb-16 md:px-36 lg:px-96">
          <div className="my-4 flex justify-start align-center">
            <Link to={`/GrantBiz/`}>
              <IoArrowBackOutline className="text-black h-8 w-10 mr-2 active:text-primary" />
            </Link>
            <p className="text-2xl font-semibold w-full">My Shop </p>
          </div>
          <div className="my-10">
            <IoExtensionPuzzleOutline className="text-black h-56 w-full active:text-primary" />
          </div>
          <div className="flex justify-center my-10">
            <p className="text-2xl font-semibold ">You are not Logged In!! </p>
          </div>
          <div className="flex justify-center my-10">
            <p className="text-xl font-semibold ">You may login or signup from here</p>
          </div>
          <div className="my-10 flex justify-center">
            <Link className='btn rounded-full py-10 px-16 mx-2 text-xl border-stone-500 border-2 ' to='/GrantBiz/SignIn'>
              <input type="button" value="SING IN"></input>
            </Link>
            <Link className='btn rounded-full py-10 px-16 mx-2 text-xl border-2 bg-gray-300' to='/GrantBiz/SignUp'>
              <input type="button" value="SING UP"></input>
            </Link>
          </div>
        </div>
      }
      <BottomBar />
    </>
  )
}

export default Profile