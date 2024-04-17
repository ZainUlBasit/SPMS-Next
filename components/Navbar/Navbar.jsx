"use client";
import Image from "next/image";
import React, { useState } from "react";
import LogoName from "@/public/logo_name.png";
import Logo from "@/public/logo.png";
import { IoExit, IoHome, IoSettings } from "react-icons/io5";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { MdFactory } from "react-icons/md";
import { GiCrackedGlass } from "react-icons/gi";
import { FaUserCog } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { FaUserClock } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
import { MdPayments } from "react-icons/md";

import { Drawer } from "@mui/material";
import NavItem from "./NavItem";
import { NavData } from "@/utils/NavData";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  return (
    <>
      <div className="flex justify-between items-center w-full p-5 px-8">
        <div className="flex items-center gap-x-4">
          <BsFillMenuButtonWideFill
            className="text-3xl text-[#394b92] hover:text-[#0E2480] cursor-pointer"
            onClick={toggleDrawer(true)}
          />
          <Image src={LogoName} className="w-[150px] h-auto" />
        </div>
        <div className="flex gap-x-4">
          <FaUserCog className="text-3xl text-[#394b92] hover:text-[#0E2480] cursor-pointer" />
          <IoExit className="text-3xl text-[#394b92] hover:text-[#0E2480] cursor-pointer" />
        </div>
      </div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <div className="w-[300px] flex flex-col bg-[aliceblue] h-full">
          <div className="w-full flex justify-center items-center py-8">
            <Image src={Logo} className="w-[180px] h-auto" />
          </div>
          <div className="flex flex-col items-center gap-y-2">
            {NavData.map((dt) => {
              return (
                <NavItem
                  Title={dt.title}
                  Icon={dt.Icon}
                  onClick={() => {
                    router.push(dt.Link);
                  }}
                />
              );
            })}
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
