"use client";
import Navbar from "@/components/Navbar/Navbar";
import CompanyStatInfo from "@/components/Tables/CompanyStatInfo";
import { fetchBranchStats } from "@/utils/Slices/CompanyInfoStatSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const CompanyStatState = useSelector((state) => state.CompanyStatState);
  useEffect(() => {
    dispatch(fetchBranchStats());
  }, []);
  return (
    <div className="flex flex-col">
      <div className=" mt-[14vh] flex flex-col justify-center items-center">
        <div className="font-bold text-2xl w-[90%] bg-black text-white text-center py-4 rounded-tr-lg rounded-tl-lg">
          Branch Statistics
        </div>
        <div className="w-[90%]">
          {CompanyStatState.data && (
            <CompanyStatInfo CompanyInfo={CompanyStatState.data || [{}]} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
