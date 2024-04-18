import React from "react";

const NavigationWrapper = ({ children }) => {
  return (
    <div className="flex justify-center items-center gap-x-3 flex-wrap gap-y-3 pt-[110px] mb-6">
      {children}
    </div>
  );
};

export default NavigationWrapper;
