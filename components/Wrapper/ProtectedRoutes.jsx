"use client";
import { SetAuth, SetAuthNotFound } from "@/utils/Slices/AuthSlice";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

const ProtectedRoutes = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const hasChecked = useRef(false);

  useEffect(() => {
    if (hasChecked.current) return;

    const currentToken = localStorage.getItem("token");
    const currentUser = localStorage.getItem("user");

    if (!currentToken || !currentUser) {
      dispatch(SetAuthNotFound(null));
      if (pathname !== "/") {
        router.push("/");
      }
    } else {
      dispatch(SetAuth(JSON.parse(currentUser)));
    }

    hasChecked.current = true;
  }, [dispatch, router, pathname]);

  return <div>{children}</div>;
};

export default ProtectedRoutes;
