import React from "react";
import img from "../../assets/bot.png";
import { useNavigate } from "react-router-dom";
import { SquarePen } from "lucide-react";
const Sidebar = () => {
  const navigate = useNavigate();
  const handleRefresh = () => {
    navigate(0);
  };
  return (
    <div className="w-72 bg-base-200 min-h-full">
      <button onClick={handleRefresh} to="/" className="">
        <img src={img} alt="Bot" className="w-20" />
      </button>
      <div className="top-0 left-0 w-full h-90 flex flex-col justify-center ">
        <button
          onClick={handleRefresh}
          to="/"
          className="flex flex-row justify-center items-center border rounded-xl h-10"
        >
          <SquarePen /> New Chat
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
