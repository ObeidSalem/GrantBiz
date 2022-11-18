import firebase from "../firebase";
// import firebase from "firebase/app"
import "firebase/auth"
import React, { useRef, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { v4 as uuidv4 } from "uuid";
import { UserAuth } from '../context/AuthContext'
import { useNavigate, Link, useParams, useLocation } from 'react-router-dom'
import { GoogleButton } from 'react-google-button'
import { onSnapshot, collection, doc, setDoc, getDocs } from "firebase/firestore"
import db from "../firebase"
import GrantBizLogo from "../img/GrantBiz_Logo.png";

export default function Signup() {
  const [loading, setLoading] = useState(false)
  const [password, setpassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [email, setemail] = useState("")
  const [Name, setName] = useState("")
  const [Error, setError] = useState("")
  const navigate = useNavigate("")
 // const history = useHistory()

  

    const { googleSignIn, user } = UserAuth();
    // const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
            if (user) {
               navigate(`/`);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const { signup } = UserAuth()
    // const usersRef = firebase.firestore().collection("Users");
      const usersRef = collection(db ,"Users");

    function createAccount() {
        console.log("createAccount has been called")
        return new Promise(function (resolve, reject) {
            if (password.length >= 8) {
                signup(email, password).then(() => {
                    resolve()
                    console.log("account has been created")
                    navigate(`/`);
                })
            } else {
                reject("Failed to create an account")
            }
        })
    }

    async function handleSubmit(newUser) {
        try {
            setError("")
            setLoading(true)
            await createAccount()
            await setDoc(doc(usersRef, email), {
                Email: email,      });
            navigate(`/`);
        } catch (err) {
            setError("Failed to create an account")
            console.log(err)
        }
        setLoading(false)

    }
  return (
    <> 
      <div>
            <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-background">
            <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">

                <div>
                    <a href="/">
                        <div className=" w-80 h-80 ">
                            <img src={GrantBizLogo} alt="LOGO" />
                        </div>
                    </a>
                </div>
                <div className="p-10 text-sm text-gray-900" >Create your Account</div>
             
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

                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
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
                                    onChange={(e) => setPasswordConfirm(e.target.value)}
                                    required
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-end mt-4">

                        <Link className='text-sm text-gray-600 underline hover:text-gray-900' to = '/SignIn'>
                                    <input type="button" value="Already registered?"></input>
                                </Link>
                            {/* <a
                                className="text-sm text-gray-600 underline hover:text-gray-900"
                                href="/SingIn"
                            >
                                Already registered?
                            </a> */}
                            <button
                                onClick={() =>handleSubmit({ Name, email, id: uuidv4() })}
                                type="submit"
                                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      </>  

  
  )
}

// export default SignUp