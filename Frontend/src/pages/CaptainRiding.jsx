import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import FinishRide from "../components/FinishRide";

const CaptainRiding = () => {

const [finishRidePanel, setFinishRidePanel] = useState(false)
const finishRidePanelRef = useRef(null)

   useGSAP(
    function () {
      if (finishRidePanel) {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(0)",
        }); 
      } else {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [finishRidePanel]
  );
  return (
    <div className="h-screen">
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="logo"
        />
        <Link
          to="/captain-home"
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-bold ri-logout-box-r-line"></i>
        </Link>
      </div>

      <div className="h-4/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="map gif"
        />
      </div>

      <div onClick={()=>{
        setFinishRidePanel(true)
      }}
      className="h-1/5 flex items-center relative justify-between p-6 bg-yellow-400">
      <h5 className="p-1 w-[88%] text-center absolute top-0">
        <i className="text-3xl text-black ri-arrow-up-wide-line"></i>
      </h5>
      
        <h4 className="text-xl font-semibold">4 Km away</h4>
        <button className="px-10 bg-blue-500 text-white font-semibold p-2 rounded-lg">
          Complete Ride
        </button>
      </div>

      <div ref={finishRidePanelRef}
        className="fixed w-full h-[88%] z-10 bottom-0 px-4 py-9 translate-y-full bg-white pt-12">
        <FinishRide
          setFinishRidePanel={setFinishRidePanel}/>
      </div>
    </div>
  );
};

export default CaptainRiding;
