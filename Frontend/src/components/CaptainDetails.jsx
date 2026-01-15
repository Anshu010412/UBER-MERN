import React from 'react'

const CaptainDetails = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6 p-4">
          <div className="flex items-center justify-start gap-3">
            <img
              className="h-10 w-10 object-cover rounded-full"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-qrWfAK9HPjhEmfPybrPwO8eH_zNLtxdyeg&s"
            />
            <h4 className="text-lg font-medium">Anshu Kumar</h4>
          </div>
          <div>
            <h4 className="text-xl font-semibold">₹295.20</h4>
            <p className="text-sm text-gray-600 text-center ">Earned</p>
          </div>
        </div>
        <div className="flex items-start gap-6 p-4 mt-6 justify-center bg-red-100 rounded-xl">
          <div className="text-center">
            <i className="text-3xl mb-2 font-thin ri-timer-2-line"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-500">Hours Online</p>
          </div>
          <div className="text-center">
            <i className="text-3xl mb-2 font-thin ri-speed-up-line"></i>
            <h5 className="text-lg font-medium">30 KM</h5>
            <p className="text-sm text-gray-500">Distance</p>
          </div>
          <div className="text-center ml-5">
            <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>
            <h5 className="text-lg font-medium">3 Rides</h5>
            <p className="text-sm text-gray-500">History</p>
          </div>
        </div>
    </div>
  )
}

export default CaptainDetails