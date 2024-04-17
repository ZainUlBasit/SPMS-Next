import { FaUserClock } from "react-icons/fa";
import { GiCrackedGlass } from "react-icons/gi";
import { IoHome } from "react-icons/io5";
import { MdFactory } from "react-icons/md";

export const NavData = [
  { title: "Home", Icon: IoHome, Link: "/home" },
  { title: "Company", Icon: MdFactory, Link: "/company" },
  { title: "Items", Icon: GiCrackedGlass, Link: "/item" },
  { title: "Customer", Icon: FaUserClock, Link: "/customer/info" },
  { title: "Statistics", Icon: FaUserClock, Link: "/statistics/info" },
  { title: "Payments", Icon: FaUserClock, Link: "/payment/info" },
];
