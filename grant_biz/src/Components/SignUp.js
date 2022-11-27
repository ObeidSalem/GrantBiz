import firebase from "../firebase";
// import firebase from "firebase/app"
import "firebase/auth";
import React, { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { v4 as uuidv4 } from "uuid";
import { UserAuth } from "../context/AuthContext";
import { useNavigate, Link, useParams, useLocation } from "react-router-dom";
import { GoogleButton } from "react-google-button";
import { Alert, Button } from "@material-tailwind/react";
import { collection, doc, setDoc, } from "firebase/firestore";
import db from "../firebase";
import GrantBizLogo from "../img/GrantBiz_Logo.png";

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [password, setpassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setemail] = useState("");
  const [Name, setName] = useState("");
  const [Error, setError] = useState("");
  const [isOK, setisOK] = useState(false);
  const navigate = useNavigate("");
  const { createAccount } = useAuth();

  const { googleSignIn, user } = UserAuth();

  const { signup, login, logOut } = UserAuth();
  const usersRef = collection(db, "Users");

  async function handleSubmit(newUser) {
    try {
      setError("");
      setLoading(true);
      const responseAuth = await signup(email, password)
      if (responseAuth.hasOwnProperty('message')) {
        setError(responseAuth.message);
      }
      // if (responseDB.hasOwnProperty('message')) {
      //   setError(responseDB.message);
      // }
      setLoading(false);
    } catch (err) {
      console.error(err);
      console.log("newUser", newUser)
      await setDoc(doc(usersRef, newUser.email), {
        ...newUser, own_store: false, store_avatar: "data:image/png;base64,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"
      });
      navigate("/");

    }
  }

  return (
    <>
      <div>
        <div className="flex justify-center  flex-col items-center min-h-screen pt-6 mx-6 sm:justify-center sm:pt-0 bg-background">
          <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
            <div className="flex justify-center ">
              <Link to="/">
                <div className=" w-56 ">
                  <img src={GrantBizLogo} alt="LOGO" />
                </div>
              </Link>
            </div>
            <h3 className="my-6 text-xl font-semibold">Create your Account</h3>
            <div className="flex w-full flex-col gap-2 rounded">
              {Error && (
                <Alert
                  className="bg-red-600 rounded mb-3"
                  variant="gradient"
                  color="red"
                >
                  {Error}
                </Alert>
              )}
            </div>
            <form>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Name
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    name="name"
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="block w-full p-2  mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Email
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    required
                    className="block w-full  p-2 mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Password
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    required
                    className="block w-full p-2  mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
              {/* <div className="mt-4">
                <label
                  htmlFor="password_confirmation"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Confirm Password
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="password"
                    name="password_confirmation"
                    value={passwordConfirm}
                    onChange={(e) => {
                      setPasswordConfirm(e.target.value);
                    }}
                    required
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
              </div> */}
              <div className="flex items-center justify-end mt-4">
                <Link
                  className="text-sm text-gray-600 underline hover:text-gray-900"
                  to="/SignIn"
                >
                  <input type="button" value="Already registered?"></input>
                </Link>
                <div
                  onClick={() => handleSubmit({ Name, email, })}
                  className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                >Register
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

// export default SignUp
