"use client";
import React from "react";

const NavigationsBtn = ({ Icon, Title, Width, OnClick }) => {
  return (
    <div
      className={`hover:bg-[#394b92] bg-[#0E2480] hover:rounded-lg text-white w-[90%] py-3 transition-all ease-in-out duration-500 cursor-pointer ${
        Width ? Width : ""
      }`}
      onClick={OnClick ? OnClick : () => {}}
    >
      <div className="flex items-center gap-x-2 px-5">
        <Icon className="!text-2xl" />
        <span className="text-xl font-bold whitespace-nowrap">{Title}</span>
      </div>
    </div>
  );
};

export default NavigationsBtn;
