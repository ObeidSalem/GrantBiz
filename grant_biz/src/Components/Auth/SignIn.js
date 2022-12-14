import firebase from "../../firebase";
import "firebase/auth";
import React, { useRef, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import GrantBizLogo from "../../img/GrantBiz_Logo.png";
import { useAuth } from "../../context/AuthContext";
import { Alert } from "@material-tailwind/react";


export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [Error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      const response = await login(email, password);
      if (response.hasOwnProperty('message')) {
        // console.log(response.message);
        setError(response.message);
      }
    } catch {
      // setError("Failed to log in");
      navigate("/GrantBiz/");

    }

    setLoading(false);
  }
  return (
    <>
      <div>
        <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-background">
          <div className="w-80 px-6 py-4 mt-6 overflow-hidden bg-white border border-primary  shadow-md sm:max-w-md rounded-lg">
            <div className="flex justify-center ">
              <Link to="/GrantBiz/">
                <div className=" w-56 ">
                  <img src={GrantBizLogo} alt="LOGO" />
                </div>
              </Link>
            </div>
            <div className="my-6 text-xl font-semibold">
              Login to your Account
            </div>
            {Error && (
              <Alert
                className="bg-red-600 rounded mb-3"
                variant="gradient"
                color="red"
              >
                {Error}
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
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
                    className="block w-full  p-2  mt-1 border border-gray-400 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
                    className="block  p-2 w-full mt-1 border border-gray-400 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
              <Link
                className="text-sm text-gray-600 underline hover:text-gray-900"
                to="/GrantBiz/forgotPassword"
              >
                <input type="button" value="forgot password?"></input>
              </Link>
              <div className="flex items-center justify-end mt-4">
                <Link
                  className="text-sm text-gray-600 underline hover:text-gray-900"
                  to="/GrantBiz/SignUp"
                >
                  <input type="button" value="Create new account"></input>
                </Link>

                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
