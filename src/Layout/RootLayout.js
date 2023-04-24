import React from "react";
import Navbar from "../pages/components/Navbar";
import { Outlet } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
const RootLayout = () => {
  return (
    <div>
      {/* <p>code</p> */}
      <div className="fixed z-10">
        <Navbar />
      </div>
      <div className="pt-20">
        <Outlet />
        {/* <Analytics /> */}
        {/* <div className="  bottom-0 bg-drawer h-10 w-full  ">
          <p className="text-white">fotter</p>
        </div> */}
      </div>
    </div>
  );
};

export default RootLayout;
