import React from 'react'
import { Link } from 'react-router-dom';

const FinishRide = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
          props.setFinishRidePanel(false);
        }}
        className="p-1 w-[91%] text-center absolute top-0">
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl mb-5 font-semibold">Finish The Ride</h3>
      <div className="flex items-center justify-between border-2 border-yellow-900 mt-4 p-4 bg-yellow-400 rounded-lg">
        <div className="flex items-center gap-3">
          <img
            className="h-10 w-10 object-cover rounded-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmm_cQ6ubGNgNnwiWJlAmcvrm8Au4xgQ7Kjw&s"
            alt="captain image"/>
          <h2 className="text-lg font-medium">Anurag Singh</h2>
        </div>
        <div>
          <h5 className="text-lg font-semibold overline">8.5 KM</h5>
        </div>
      </div>

      <div className="flex gap-4 justify-between items-center flex-col">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-2 border-b-2">
            <i className=" text-lg ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600 ">
                Hari Nagar, Badarpur
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-2 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">92/6/A</h3>
              <p className="text-sm -mt-1 text-gray-600 ">
                Okhla, Mohan Estate
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-2">
            <i className="text-lg ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹210.20</h3>
              <p className="text-sm -mt-1 text-gray-600 ">Cash</p>
            </div>
          </div>
        </div>

        <div className="mt-6 w-full">
            <Link to="/captain-home"
            className="mt-10 flex text-lg py-2 justify-center bg-blue-500 text-white font-semibold p-3 rounded-lg">
            Finish Ride <span><i className="ml-4 text-black text-xl ri-arrow-right-long-fill"></i></span></Link>

            <p className='mt-10 text-red-600 text-sm font-normal'>Click on Finish Ride if you are Complete the Payments.</p>
        </div>
      </div>
    </div>
  )
}

export default FinishRide