import React from "react";

const LocationSearchPanel = (props) => {
  const locations = [
    "M-71A, Near Lavkush Chowk, Hello Brother Cafe",
    "18B, Near Lavkush Chowk, Pushta Cafe",
    "21A, NTPC Water Plant, Patanjali Store",
    "19D, Near Ambedkar Murti, Hari Nagar",
  ];

  return (
    <div>
      {locations.map(function (elem, idx) {
        return (
          <div
            key={idx}
            onClick={() => {
              props.setVehiclePanel(true);
              props.setPanelOpen(false);
            }}
            className="flex gap-4 border-2 border-white active:border-black p-3 rounded-xl items-center mb-2 justify-start text-lg"
          >
            <h2 className="bg-[#eee] h-8 w-12 flex items-center justify-center rounded-full">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className="font-medium">{elem}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
