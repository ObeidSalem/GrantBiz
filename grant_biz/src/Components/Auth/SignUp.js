import firebase from "../../firebase";
// import firebase from "firebase/app"
import "firebase/auth";
import React, { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { v4 as uuidv4 } from "uuid";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate, Link, useParams, useLocation } from "react-router-dom";
import { GoogleButton } from "react-google-button";
import { Alert, Button } from "@material-tailwind/react";
import { collection, doc, setDoc } from "firebase/firestore";
import db from "../../firebase";
import GrantBizLogo from "../../img/GrantBiz_Logo.png";

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [password, setpassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setemail] = useState("");
  const [Name, setName] = useState("");
  const [phone_number, setphone_number] = useState("");
  const [location, setlocation] = useState("");
  const [matric_number, setmatric_number] = useState("");
  const [eeror_matric_number, set_error_matric_number] = useState("");
  const [Error, setError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isOK, setisOK] = useState(false);
  const navigate = useNavigate("");
  const { createAccount } = useAuth();

  const { googleSignIn, user } = UserAuth();

  const { signup, login, logOut } = UserAuth();
  const usersRef = collection(db, "Users");

  async function handleSubmit(newUser) {
    try {
      setError("");
      setPhoneError("");
      setLoading(true);
      let isnum = /^\d+$/.test(phone_number);
      if (!isnum) {
        // console.log("not a number")
        setPhoneError("please put a valid for number for eg. 0115622xxxx");
      }
      // let isValidMatric = /^\d+$/.test(matric_number);
      // // console.log ("hi",matric_number.valueOf(7) = 7)
      // if (!isValidMatric && matric_number.value.length === 7) {
      //   set_error_matric_number("please put a valid matric number for eg. 1726xxx");
      // }

      if (
        Name != '' &&
        email !='' &&
        location != '' &&
        phone_number != '' &&
        matric_number != ''
      ) {
        const responseAuth = await signup(email, password);

        if (responseAuth.hasOwnProperty("message")) {
          setError(responseAuth.message);

          // refreshPage()
          setLoading(false);
        }
      }
    } catch (err) {
      console.error(err);
      console.log("newUser", newUser);

      await setDoc(doc(usersRef, newUser.email), {
        ...newUser,
        own_store: false,
        location: location,
        phone_number,
        saleAnalysisEmails:[newUser.email],
      });
       navigate("/");
    }
  }
  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <>
      <div>
        <div className="flex justify-center  flex-col items-center min-h-screen pt-6 mx-6 sm:justify-center sm:pt-0 bg-background">
          <div className="w-80 px-6 py-4 overflow-hidden bg-white border border-primary  shadow-md sm:max-w-md rounded-lg">
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
            <div className="flex w-full flex-col gap-2 rounded">
              {eeror_matric_number && (
                <Alert
                  className="bg-red-600 rounded mb-3"
                  variant="gradient"
                  color="amber"
                >
                  {eeror_matric_number}
                </Alert>
              )}
            </div>
            <div className="flex w-full flex-col gap-2 rounded">
              {phoneError && (
                <Alert
                  className="bg-red-600 rounded mb-3"
                  variant="gradient"
                  color="amber"
                >
                  {phoneError}
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
                    className="block w-full p-2  mt-1 border border-gray-400 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
                    className="block w-full  p-2 mt-1 border border-gray-400 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
                    className="block w-full p-2  mt-1 border border-gray-400 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Matric number
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    name="location"
                    value={matric_number}
                    onChange={(e) => {
                      setmatric_number(e.target.value);
                      if (e.target.value.length !== 7) {
                        set_error_matric_number(
                          "please put a valid matric number for eg. 1726xxx"
                        );
                      } else {
                        set_error_matric_number("");
                      }
                    }}
                    // setmatric_number(e.target.value)}
                    required
                    className="block w-full p-2  mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Location
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    name="location"
                    value={location}
                    onChange={(e) => setlocation(e.target.value)}
                    required
                    className="block w-full p-2  mt-1 border border-gray-400 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="phone_number"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  phone number
                </label>
                <div className="flex flex-col items-start ">
                  <input
                    type="phone"
                    name="phone_number"
                    value={phone_number}
                    onChange={(e) => setphone_number(e.target.value)}
                    required
                    className="appearance-none block w-full p-2  mt-1 border border-gray-400 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
                  onClick={() =>
                    handleSubmit({
                      Name,
                      email,
                      location,
                      phone_number,
                      matric_number,
                    })
                  }
                  className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false cursor-pointer"
                >
                  Register
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
