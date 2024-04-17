"use client";
import React from "react";
import NavigationsBtn from "../Buttons/NavigationsBtn";
import { IoInformationCircle } from "react-icons/io5";
import { BsBuildingAdd } from "react-icons/bs";
import { IoIosCash } from "react-icons/io";
import { TbFileReport } from "react-icons/tb";

const CompanyNavs = () => {
  return (
    <div className="flex justify-center items-center gap-x-3 flex-wrap">
      <NavigationsBtn
        Title={"Create New"}
        Icon={BsBuildingAdd}
        Width={"w-[200px]"}
        OnClick={() => {}}
      />
      <NavigationsBtn
        Title={"Info"}
        Icon={IoInformationCircle}
        Width={"w-[200px]"}
        OnClick={() => {}}
      />
      <NavigationsBtn
        Title={"Ledger"}
        Icon={TbFileReport}
        Width={"w-[200px]"}
        OnClick={() => {}}
      />
    </div>
  );
};

export default CompanyNavs;
