"use client";
import React from "react";
import NavigationsBtn from "../Buttons/NavigationsBtn";
import { IoInformationCircle } from "react-icons/io5";
import { BsBuildingAdd } from "react-icons/bs";
import { IoIosCash } from "react-icons/io";
import { TbFileReport, TbLayoutGridAdd } from "react-icons/tb";

const ItemNavs = () => {
  return (
    <div className="flex justify-center items-center gap-x-3 flex-wrap">
      <NavigationsBtn
        Title={"Create New"}
        Icon={BsBuildingAdd}
        Width={"!max-w-[220px]"}
        OnClick={() => {}}
      />
      <NavigationsBtn
        Title={"Info"}
        Icon={IoInformationCircle}
        Width={"!max-w-[220px]"}
        OnClick={() => {}}
      />
      <NavigationsBtn
        Title={"Add Stock"}
        Icon={TbLayoutGridAdd}
        Width={"!max-w-[220px]"}
        OnClick={() => {}}
      />
      <NavigationsBtn
        Title={"Stock Statistics"}
        Icon={TbFileReport}
        Width={"!max-w-[220px]"}
        OnClick={() => {}}
      />
    </div>
  );
};

export default ItemNavs;
