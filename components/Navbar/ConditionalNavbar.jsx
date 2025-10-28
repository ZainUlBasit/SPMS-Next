"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

const ConditionalNavbar = () => {
  const pathname = usePathname();

  // Don't show navbar on login page
  if (pathname === "/") {
    return null;
  }

  return <Navbar />;
};

export default ConditionalNavbar;
