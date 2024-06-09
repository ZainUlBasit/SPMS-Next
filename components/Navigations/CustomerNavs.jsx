"use client";
import React, { useState } from "react";
import NavigationsBtn from "../Buttons/NavigationsBtn";
import { IoInformationCircle } from "react-icons/io5";
import { BsBuildingAdd } from "react-icons/bs";
import { IoIosCash } from "react-icons/io";
import { TbFileReport } from "react-icons/tb";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";
import { VscGitPullRequestCreate } from "react-icons/vsc";
import { BiSolidReport } from "react-icons/bi";
import NavigationWrapper from "./NavigationWrapper";
import CreateCustomerModal from "../Modals/CreateCustomer";

const CustomerNavs = () => {
  const [OpenCreateModal, setOpenCreateModal] = useState(false);
  return (
    <NavigationWrapper>
      <NavigationsBtn
        Title={"Create New"}
        Icon={FaUserPlus}
        Width={"!max-w-[200px]"}
        OnClick={() => setOpenCreateModal(true)}
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
      {OpenCreateModal && (
        <CreateCustomerModal
          OpenModal={OpenCreateModal}
          setOpenModal={setOpenCreateModal}
        />
      )}
    </NavigationWrapper>
  );
};

export default CustomerNavs;
