import React from 'react'

const ConfirmRide = (props) => {
    return (
        <div>
            <h5 onClick={() => {
                props.setVehiclePanel(false)
            }} className="p-1 w-[91%] text-center absolute top-0  "><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className="text-2xl mb-3 font-semibold">Confirm Your Ride</h3>


            <div className='flex gap-4 justify-between items-center flex-col'>
                <img className="h-20"
                    src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yOWZiYjhiMC03NWIxLTRlMmEtODUzMy0zYTM2NGU3MDQyZmEucG5n" alt="" />
                <div className='w-full'>

                    <div className='flex items-center gap-5'>
                        <i className=" text-lg ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600 '>Hari Nagar, Badarpur</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5'>
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11/A</h3>
                            <p className='text-sm -mt-1 text-gray-600 '>Hari Nagar, Badarpur</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5'>
                        <i className="text-lg ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹210.20</h3>
                            <p className='text-sm -mt-1 text-gray-600 '>Cash</p>
                        </div>
                    </div>
                </div>
                <button className='w-full bg-green-500 text-white font-semibold p-2 rounded-lg'>Confirm</button>
            </div>
        </div>
    )
}

export default ConfirmRide