"use client";
import React, { useState } from "react";
import NavigationsBtn from "../Buttons/NavigationsBtn";
import { IoInformationCircle } from "react-icons/io5";
import { BsBuildingAdd } from "react-icons/bs";
import { IoIosCash } from "react-icons/io";
import { TbFileReport, TbLayoutGridAdd } from "react-icons/tb";
import NavigationWrapper from "./NavigationWrapper";
import CreateItem from "../Modals/CreateItem";

const ItemNavs = () => {
  const [open, setOpen] = useState(false);
  return (
    <NavigationWrapper>
      <NavigationsBtn
        Title={"Create New"}
        Icon={BsBuildingAdd}
        Width={"!max-w-[220px]"}
        OnClick={() => setOpen(true)}
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
      {open && <CreateItem open={open} setOpen={setOpen} />}
    </NavigationWrapper>
  );
};

export default ItemNavs;
