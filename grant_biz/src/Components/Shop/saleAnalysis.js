import React, { useState, useEffect } from "react";
import {
  onSnapshot,
  collection,
  doc,
  setDoc,
  getDocs,
  getDoc,
  query,
  where,
  deleteDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import db from "../../firebase";
import { UserAuth } from "../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../redux/actions/index";
import { Link,useNavigate } from "react-router-dom";


function SaleAnalysis() {
  const currentUser = useSelector((state) => state.currentUser);
  const { saleAnalysisEmails } = currentUser;
  const [email, setEmail] = useState("");
  const navigate = useNavigate("");
  const [analysisEmails, setanalysisEmails] = useState([saleAnalysisEmails]);
  const { user } = UserAuth();
  const emailhandeler = async (e) => {
    e.preventDefault();
    const updateRef = collection(db, "Users");
    await updateDoc(doc(updateRef, user.email), {
      saleAnalysisEmails: [...saleAnalysisEmails, email],
    });
    console.log("done");
    navigate(`/MyShop/${email}`);

    refreshPage();
  };
  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <>
      <div>saleAnalysis</div>
      <div>
        <form onSubmit={emailhandeler}>
          <input
            type="text"
            className=" mb-2 text-sm font-medium text-gray-900 dark:text-white border w-fit"
            name="analysisEmails"
            placeholder="analysisEmails"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
            <button className="bg-white border-2 mb-5 rounded-md px-2 py-1 md:px-3  text-primary font-bold text-sm border-primary ml-3">
              add
            </button>
          
        </form>
      </div>

      <div className=" w-fit">
        <ul>
          {saleAnalysisEmails.map((saleAnalysisEmails) => {
            return <li className=" border">{saleAnalysisEmails}</li>;
          })}
        </ul>
      </div>

      <br></br>
    </>
  );
}

export default SaleAnalysis;
