import React, { useState } from "react";

const ToggleSwitch = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  console.log(isChecked);

  return (
    <div className="p-10">
      <div
        className=" w-14 h-7 cursor-pointer"
        onClick={handleToggle} // Handle click on the entire div
      >
        {/* Background of the Toggle */}
        <div
          className={`w-full h-full shadow-inner shadow-slate-950 rounded-full ${
            isChecked ? "bg-gray-200" : "bg-zinc-600"
          } transition-all duration-300 flex items-center p-[2px]`}
        >
          <div
            className={`w-[23px] h-[23px] rounded-full shadow-md 
          transition-all duration-300 
          ${isChecked ? "translate-x-7 bg-zinc-600" : " bg-white"}`}
          ></div>
        </div>

        {/* Toggle Knob */}
      </div>
    </div>
  );
};

export default ToggleSwitch;
