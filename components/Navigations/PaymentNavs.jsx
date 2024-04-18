"use client";
import React from "react";
import NavigationsBtn from "../Buttons/NavigationsBtn";
import { IoInformationCircle } from "react-icons/io5";
import { BsBuildingAdd } from "react-icons/bs";
import { IoIosCash } from "react-icons/io";
import { TbFileReport, TbLayoutGridAdd } from "react-icons/tb";
import NavigationWrapper from "./NavigationWrapper";
import { RiSecurePaymentFill } from "react-icons/ri";

const PaymentNavs = () => {
  return (
    <NavigationWrapper>
      <NavigationsBtn
        Title={"Create New"}
        Icon={RiSecurePaymentFill}
        Width={"!max-w-[220px]"}
        OnClick={() => {}}
      />
      <NavigationsBtn
        Title={"Customer Info"}
        Icon={IoInformationCircle}
        Width={"!max-w-[220px]"}
        OnClick={() => {}}
      />
      <NavigationsBtn
        Title={"Company Info"}
        Icon={IoInformationCircle}
        Width={"!max-w-[220px]"}
        OnClick={() => {}}
      />
    </NavigationWrapper>
  );
};

export default PaymentNavs;
