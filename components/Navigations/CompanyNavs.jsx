"use client";
import React, { useState } from "react";
import NavigationsBtn from "../Buttons/NavigationsBtn";
import { IoInformationCircle } from "react-icons/io5";
import { BsBuildingAdd } from "react-icons/bs";
import { IoIosCash } from "react-icons/io";
import { TbFileReport } from "react-icons/tb";
import NavigationWrapper from "./NavigationWrapper";
import CreateCompany from "../Modals/CreateCompany";

const CompanyNavs = () => {
  const [Open, setOpen] = useState(false);

  return (
    <NavigationWrapper>
      <NavigationsBtn
        Title={"Create New"}
        Icon={BsBuildingAdd}
        Width={"!max-w-[200px]"}
        OnClick={() => setOpen(true)}
      />
      <NavigationsBtn
        Title={"Info"}
        Icon={IoInformationCircle}
        Width={"!max-w-[200px]"}
        OnClick={() => {}}
      />
      <NavigationsBtn
        Title={"Ledger"}
        Icon={TbFileReport}
        Width={"!max-w-[200px]"}
        OnClick={() => {}}
      />
      {Open && <CreateCompany open={Open} setOpen={setOpen} />}
    </NavigationWrapper>
  );
};

export default CompanyNavs;
