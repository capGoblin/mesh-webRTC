import React from "react";
import { FaVideo } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { BsPencilFill } from "react-icons/bs";
import { PiFileTextBold } from "react-icons/pi";
import { RiCodeBoxFill } from "react-icons/ri";
// import { IoSettingsSharp } from "react-icons/io";
// import IconType from "react-icons";

const SideBar = () => {
  return (
    <div className="fixed w-20 top-1/2 left-2 rounded-2xl transform -translate-y-1/2 flex flex-col items-center bg-gray-950 text-white shadow hover:shadow-2xl">
      <SideBarIcon icon={<GoHome />} />
      <SideBarIcon icon={<BsPencilFill />} />
      <SideBarIcon icon={<FaVideo />} />
      <SideBarIcon icon={<PiFileTextBold />} />
      <SideBarIcon icon={<RiCodeBoxFill />} />
    </div>
  );
};

// @ts-ignore
const SideBarIcon = ({ icon: IconType }) => {
  return <div className="sidebar-icons">{IconType}</div>;
};

export default SideBar;
