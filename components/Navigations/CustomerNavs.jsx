"use client";
import React from "react";
import NavigationsBtn from "../Buttons/NavigationsBtn";
import { IoInformationCircle } from "react-icons/io5";
import { BsBuildingAdd } from "react-icons/bs";
import { IoIosCash } from "react-icons/io";
import { TbFileReport } from "react-icons/tb";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";
import { VscGitPullRequestCreate } from "react-icons/vsc";
import { BiSolidReport } from "react-icons/bi";

const CustomerNavs = () => {
  return (
    <div className="flex justify-center items-center gap-x-3 flex-wrap gap-y-3">
      <NavigationsBtn
        Title={"Create New"}
        Icon={FaUserPlus}
        Width={"!max-w-[200px]"}
        OnClick={() => {}}
      />
      <NavigationsBtn
        Title={"Create Bill"}
        Icon={MdOutlineCreateNewFolder}
        Width={"!max-w-[200px]"}
        OnClick={() => {}}
      />
      <NavigationsBtn
        Title={"Info"}
        Icon={IoInformationCircle}
        Width={"!max-w-[200px]"}
        OnClick={() => {}}
      />
      <NavigationsBtn
        Title={"Item Return"}
        Icon={VscGitPullRequestCreate}
        Width={"!max-w-[200px]"}
        OnClick={() => {}}
      />
      <NavigationsBtn
        Title={"Ledger"}
        Icon={BiSolidReport}
        Width={"!max-w-[200px]"}
        OnClick={() => {}}
      />
    </div>
  );
};

export default CustomerNavs;
