import React from 'react'
import { Link } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import { IoArrowBackOutline } from 'react-icons/io5';
import BottomBar from '../Navigation/BottomBar';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
} from 'chart.js';
import { useSelector } from 'react-redux';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
)

function SaleAnalysis() {

  const currentUser = useSelector((state) => state.currentUser);
  const { Income } = currentUser;


  console.log("Income", Income)
  const { user } = UserAuth();

  const options = {
    plugins: {
      legend: false
    },
    scales: {
      x: {
        grid: {
          display: false,
        }
      },
      y: {
        min: 0, 
        grid: {
          borderDash: [2],
        },
      }
    }
  }

  const TotalMonthlyIncome = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [{
      data: Income,
      borderColor: "#41BDA7",
      backgroundColor: "transparent",
      pointBorderColor: "transparent",
      tension: 0.5,
    }]
  }


  const products = useSelector((state) => state.allProducts.products);

  const renderProductsList = products.map((product, index) => {
    const { title, productIncome, id, email, price } = product;

    const ProductIncome = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [{
        data: productIncome,
        borderColor: "#41BDA7",
        backgroundColor: "transparent",
        pointBorderColor: "transparent",
        tension: 0.5
      }]
    }

    // let units = productIncome;
    // productIncome?.forEach((a, i) => {
    //   console.log(units[i], price, units[i] / price);
    //   units[i] = productIncome[i] / price;
    // });
    // console.log(units);

    // const UnitsSold = {
    //   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    //   datasets: [
    //     { data: productIncome, },
    //   ]
    // }
    if (email == user.email) {
      return (
        <div key={id}>
          <div className="my-0 w-full flex flex-col justify-center" >
            <h2 className="text-xl font-semibold w-full">Monthly Income of {title}</h2>
            <Line data={ProductIncome} options={options}></Line>
          </div>
        </div>
      );
    }
  });

  return (
    <>
      {user ?
        <div className="px-6 bg-white pb-16 md:px-36 lg:px-96">
          <div className="my-4 flex justify-start align-center">
            <Link to={`/`}>
              <IoArrowBackOutline className="text-black h-8 w-10 mr-2 active:text-primary" />
            </Link>
            <h1 className="text-2xl font-semibold w-full">Sales Analysis</h1>

          </div>
          <br />

          <div className="">
            <div className="my-0 w-full flex flex-col justify-center">
              <h2 className="text-xl font-semibold w-full">Monthly Income Analysis</h2>
              <Line data={TotalMonthlyIncome} options={options}></Line>
            </div>
            <>{renderProductsList}</>
          </div>
        </div>
        :
        <>
        </>
      }
      <BottomBar />
    </>
  )
}

export default SaleAnalysis