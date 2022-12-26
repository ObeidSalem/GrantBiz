import { UserAuth } from "../../context/AuthContext";
import { IoArrowBackOutline } from "react-icons/io5";
import BottomBar from "../Navigation/BottomBar";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";
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
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import db from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../redux/actions/index";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoTrashBinSharp } from "react-icons/io5";
import { async } from "@firebase/util";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function SaleAnalysis() {
  const { user } = UserAuth();

  const { email } = useParams();
  const usePramsId = email;

  const currentUser = useSelector((state) => state.currentUser);
  const { saleAnalysisEmails } = currentUser;
  const [Email, setEmail] = useState("");
  const [Income, setIncome] = useState("");
  const navigate = useNavigate("");

  console.log(".Income", Income);

  const fetchUser = async () => {
    try {
      const docRef = await doc(db, "Users", email);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        setIncome(docSnap.data().Income);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
      return docSnap.data().Income;
    } catch (error) {
      // console.log(error)
    }
  };

  useEffect(() => {
    try {
      if (user) {
        fetchUser();
      }
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  const checkEmail = saleAnalysisEmails?.find((item) => item === user.email);

  const options = {
    plugins: {
      legend: false,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        min: 0,
        grid: {
          borderDash: [2],
        },
      },
    },
  };

  const tempraryData = [12, 50, 47, 26, 71, 78, 100, 110, 120, 125, 90, 136];
  const tempraryData2 = [12, 13, 37, 16, 41, 48, 60, 70, 20, 15, 90, 56];

  const TotalMonthlyIncome = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        data: Income,
        // data: tempraryData,
        borderColor: "#41BDA7",
        backgroundColor: "transparent",
        pointBorderColor: "transparent",
        tension: 0.5,
      },
    ],
  };

  const products = useSelector((state) => state.allProducts.products);

  const renderProductsList = products.map((product, index) => {
    const { title, productIncome, id, email, price } = product;

    const ProductIncome = {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          data: productIncome,
          // data: tempraryData2,
          borderColor: "#41BDA7",
          backgroundColor: "transparent",
          pointBorderColor: "transparent",
          tension: 0.5,
        },
      ],
    };

    if (usePramsId == email) {
      return (
        <div key={id}>
          <div className="my-0 w-full flex flex-col justify-center">
            <h2 className="text-xl font-semibold w-full">
              Monthly Income of {title}
            </h2>
            <Line data={ProductIncome} options={options}></Line>
          </div>
        </div>
      );
    }
  });

  const emailHandler = async (e) => {
    e.preventDefault();
    const updateRef = collection(db, "Users");
    await updateDoc(doc(updateRef, user.email), {
      saleAnalysisEmails: [...saleAnalysisEmails, Email],
    });
    console.log("done");
    refreshPage();
  };

  const unshareEmail = async (e) => {
    const updateRef = collection(db, "Users");
    await updateDoc(doc(updateRef, user.email), {
      saleAnalysisEmails: arrayRemove(e),
    });
    console.log("done");
    refreshPage();
  };

  function refreshPage() {
    window.location.reload(false);
  }

  const renderShare = saleAnalysisEmails?.map((saleAnalysisEmails) => {
    if (saleAnalysisEmails != user.email) {
      return (
        <>
          <div className="w-full flex justify-between border-b-2">
            <li className=" ml-5 font-sans list-none">{saleAnalysisEmails}</li>
            <IoTrashBinSharp
              className="mt-1 mr-7 ml-1 text-red-800"
              onClick={() => unshareEmail(saleAnalysisEmails)}
            />
          </div>
        </>
      );
    }
  });

  return (
    <>
      {checkEmail || user.email ? (
        <div className="px-6 bg-white pb-16 md:px-36 lg:px-96">
          <div className="my-4 flex justify-start align-center">
            <Link to={`/MyShop/${user.email}`}>
              <IoArrowBackOutline className="text-black h-8 w-10 mr-2 active:text-primary" />
            </Link>
            <p className="text-2xl font-semibold w-full">Sales Analysis</p>
          </div>
          <br />

          <div className="">
            <div className="my-0 w-full flex flex-col justify-center">
              <h2 className="text-xl font-semibold w-full">
                Monthly Income Analysis
              </h2>
              <Line data={TotalMonthlyIncome} options={options}></Line>
            </div>
            <>{renderProductsList}</>
          </div>
          {usePramsId === user.email ? (
            <div className="mt-10 w-full ">
              <div className="flex md:justify-center font-bold">
                Sale Analysis
              </div>
              <div className="w-full mt-2">
                <form
                  onSubmit={emailHandler}
                  className="w-full flex justify-between"
                >
                  <input
                    type="email"
                    className="p-2 mb-2 text-sm font-medium text-gray-900 dark:text-white border w-full "
                    name="analysisEmails"
                    placeholder="share new email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <button className="bg-white border-2 mb-5 rounded-md px-2 py-0 md:px-2 mt-1 text-primary font-bold text-sm border-primary ml-3">
                    Add
                  </button>
                </form>
              </div>
              <div className="font-bold flex md:justify-center">
                Shared Emails
              </div>

              <div className=" w-fit md:w-full">{renderShare}</div>
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
      <BottomBar />
    </>
  );
}

export default SaleAnalysis;
