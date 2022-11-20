import React, { useRef, useState, useEffect } from "react";
import GrantBizLogo from "../img/GrantBiz_Logo.png";
import { useAuth } from "../context/AuthContext";
import { Alert } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setemail] = useState("");
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("been called");
    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(email);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }

    setLoading(false);
  }

  return (
    <>
      <div>
        <div className="flex flex-col items-center min-h-screen pt-6 mx-6 sm:justify-center sm:pt-0 bg-background">
          <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
            <div className="flex justify-center ">
              <Link to ="/">
                <div className=" w-56 ">
                  <img src={GrantBizLogo} alt="LOGO" />
                </div>
              </Link>
            </div>
            <div className="my-6 text-sm font-semibold">
              Enter your email address and we'll send you a link to get back
              into your account check spam folder.
            </div>
            {message && <Alert className="bg-primary rounded">{message}</Alert>}

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
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 mb-6"
                  />
                </div>
              </div>
              <div className="flex justify-between">
                {message ? (
                  <Link to="/"
                    className="inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                  >
                    Go Back
                  </Link>
                ) : (
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                  >
                    send email
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
