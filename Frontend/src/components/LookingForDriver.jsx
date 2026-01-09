import React from 'react'

const LookingForDriver = (props) => {
    return (
        <div>
            <h5 onClick={() => {
                props.setVehicleFound(false)
            }} className="p-1 w-[91%] text-center absolute top-0  "><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className="text-2xl mb-3 font-semibold">Looking For Driver</h3>


            <div className='flex gap-4 justify-between items-center flex-col'>
                <img className="h-20"
                    src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
                <div className='w-full mt-5'>

                    <div className='flex items-center gap-5 p-2 border-b-2'>
                        <i className=" text-lg ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600 '>Hari Nagar, Badarpur</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 p-2 border-b-2'>
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11/A</h3>
                            <p className='text-sm -mt-1 text-gray-600 '>Hari Nagar, Badarpur</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 p-2'>
                        <i className="text-lg ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹210.20</h3>
                            <p className='text-sm -mt-1 text-gray-600 '>Cash</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default LookingForDriver