import React from "react";
import { FaVideo } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { BsPencilFill } from "react-icons/bs";
import { PiFileTextBold } from "react-icons/pi";
import { RiCodeBoxFill } from "react-icons/ri";
// import { IoSettingsSharp } from "react-icons/io";
// import IconType from "react-icons";

interface Props {
  clickedIcon: (arg0: string) => void;
}
const SideBar = (props: Props) => {
  function handleIconClick(arg0: string) {
    props.clickedIcon(arg0);
  }

  return (
    <div className="fixed w-20 top-1/2 left-2 rounded-2xl transform -translate-y-1/2 flex flex-col items-center bg-gray-950 text-white shadow hover:shadow-2xl">
      <SideBarIcon
        icon={<GoHome />}
        onClick={() => handleIconClick("GoHome")}
      />
      <SideBarIcon
        icon={<BsPencilFill />}
        onClick={() => handleIconClick("Draw")}
      />
      <SideBarIcon
        icon={<FaVideo />}
        onClick={() => handleIconClick("Video")}
      />
      <SideBarIcon
        icon={<PiFileTextBold />}
        onClick={() => handleIconClick("FileText")}
      />
      <SideBarIcon
        icon={<RiCodeBoxFill />}
        onClick={() => handleIconClick("CodeBox")}
      />
    </div>
  );
};

// @ts-ignore
const SideBarIcon = ({ icon: IconType, onClick }) => {
  return (
    <div className="sidebar-icons" onClick={onClick}>
      {IconType}
    </div>
  );
};

export default SideBar;
