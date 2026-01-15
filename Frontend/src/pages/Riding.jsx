import React from "react";
import { Link } from "react-router-dom";

const Riding = () => {
  return (
    <div className="h-screen">
      <Link to='/home' className=" right-2 top-2 fixed h-10 w-10 bg-white flex items-center justify-center rounded-full">
        <i className="text-lg font-bold ri-home-5-line"></i>
      </Link>
      <div className="h-1/2">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="h-1/2 p-4">
        <div className="flex items-center justify-between">
          <img
            className="h-14 ml-4"
            src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
            alt="car logo"
          />
          <div className="text-right">
            <h2 className="text-lg font-semibold ">Anshu</h2>
            <h4 className="font-semibold text-xl text-gray-800 -mt-1 -mb-1">
              DL3S EA 5889
            </h4>
            <p className="text-xs text-gray-600 -mb-1">Maruti Suzuki Swift</p>
            <p>
              <span>
                <i className="text-base ri-star-s-fill"></i>
              </span>
              4.9
            </p>
          </div>
        </div>

        <div className="flex gap-4 justify-between items-center flex-col">
          <div className="w-full mt-5">

            {/*address div */}
            <div className="flex items-center gap-5 p-2 border-b-2">
              <i className="text-lg ri-map-pin-2-fill"></i>
              <div>
                <h3 className="text-lg font-medium">562/11/A</h3>
                <p className="text-sm -mt-1 text-gray-600 ">
                  Hari Nagar, Badarpur
                </p>
              </div>
            </div>

            {/* price div */}
            <div className="flex items-center gap-5 p-2">
              <i className="text-lg ri-currency-line"></i>
              <div>
                <h3 className="text-lg font-medium">₹210.20</h3>
                <p className="text-sm -mt-1 text-gray-600 ">Cash</p>
              </div>
            </div>
          </div>
          {/* button div */}
        </div>
        <button className='w-full mt-5  bg-green-500 text-white font-semibold p-2 rounded-lg'>Make a Payment</button>
      </div>
    </div>
  );
};

export default Riding;
