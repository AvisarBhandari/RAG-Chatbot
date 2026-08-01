import React from "react";
import img from "../../assets/bot.png";
import { NavLink } from "react-router-dom";
import { SquarePen } from "lucide-react";
const Sidebar = () => {
  return (
    <div className="w-72 bg-base-200 min-h-full">
      <NavLink to="/" className="">
        <img src={img} alt="Bot" className="w-20" />
      </NavLink>
        <div className="top-0 left-0 w-full h-90 flex flex-col justify-center ">
          <NavLink to="/" className="flex flex-row justify-center items-center border rounded-xl h-10">
          <SquarePen /> New Chat
          </NavLink>
        </div>
      </div>
  );
};

export default Sidebar;
